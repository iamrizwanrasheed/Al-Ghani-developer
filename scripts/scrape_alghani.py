from __future__ import annotations

import json
import re
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup, NavigableString, Tag

BASE_URL = "https://alghani.com.pk/"
PROJECT_ROOT = Path("/home/user/alghani-premium")
PUBLIC_DIR = PROJECT_ROOT / "public"
MEDIA_DIR = PUBLIC_DIR / "media"
DATA_DIR = PROJECT_ROOT / "src" / "constants"
DOCS_DIR = PROJECT_ROOT / "docs"
PAGES_SITEMAP = urljoin(BASE_URL, "wp-sitemap-posts-page-1.xml")
POSTS_SITEMAP = urljoin(BASE_URL, "wp-sitemap-posts-post-1.xml")
SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
    }
)

ALLOWED_TAGS = {
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "a",
    "img",
    "strong",
    "em",
    "b",
    "i",
    "br",
    "blockquote",
    "hr",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "figure",
    "figcaption",
    "iframe",
    "span",
}
DROP_TAGS = {"script", "style", "noscript", "svg", "form", "input", "button", "textarea", "select"}
PROJECT_SLUGS = {
    "al-ghani-phase-i",
    "al-ghani-phase-ii",
    "al-ghani-phase-iii",
    "al-ghani-phase-iii-ext",
    "kings-lane",
    "azmat-heights",
    "square-avenue",
    "alghani",
    "haider-block",
    "maskan-block",
    "awami-block",
    "zavia-block",
    "the-east-block",
    "al-ghani-garden-phase-7",
}
PRIMARY_NAV = [
    ("Home", "/"),
    ("About Us", "/about-us"),
    ("Projects", "/projects"),
    ("Programs", "/programs"),
    ("Green Living Initiative", "/green-living-initiative"),
    ("Careers", "/career"),
    ("Contact Us", "/contact-us"),
    ("Blogs", "/blogs"),
    ("Balloting Result", "/balloting-result"),
]


@dataclass
class PageRecord:
    slug: str
    url: str
    pathname: str
    pageTitle: str
    seoTitle: str
    description: str
    contentHtml: str
    excerpt: str
    firstImage: str | None
    imageUrls: list[str]
    headings: list[str]
    type: str
    lastModified: str



def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)



def fetch_text(url: str) -> str:
    response = SESSION.get(url, timeout=60)
    response.raise_for_status()
    return response.text



def parse_sitemap(url: str) -> list[dict[str, str]]:
    xml = fetch_text(url)
    matches = re.findall(r"<loc>(.*?)</loc>.*?<lastmod>(.*?)</lastmod>", xml, flags=re.S)
    return [{"url": loc, "lastmod": lastmod} for loc, lastmod in matches]



def normalize_pathname(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path.rstrip("/") or "/"
    return path



def slug_from_url(url: str) -> str:
    pathname = normalize_pathname(url)
    return "home" if pathname == "/" else pathname.strip("/")



def clean_title(raw: str) -> str:
    return re.sub(r"\s+–\s+Al-Ghani$", "", raw).strip()



def extract_meta_description(soup: BeautifulSoup) -> str:
    for attrs in ({"name": "description"}, {"property": "og:description"}):
        tag = soup.find("meta", attrs=attrs)
        if tag and tag.get("content"):
            return tag["content"].strip()
    return ""



def get_main_content(soup: BeautifulSoup) -> Tag:
    selectors = [
        "article.entry-content",
        "main article",
        "main",
        "article",
        ".site-content",
        ".elementor",
        "body",
    ]
    for selector in selectors:
        node = soup.select_one(selector)
        if node:
            return node
    return soup.body or soup



def local_media_path(remote_url: str) -> str:
    parsed = urlparse(remote_url)
    path = parsed.path.lstrip("/")
    if not path:
        path = f"misc/{abs(hash(remote_url))}.bin"
    return f"/media/{path}"



def download_asset(remote_url: str) -> str:
    parsed = urlparse(remote_url)
    path = parsed.path.lstrip("/")
    if not path:
        path = f"misc/{abs(hash(remote_url))}.bin"
    destination = MEDIA_DIR / path
    ensure_dir(destination.parent)
    if not destination.exists():
        response = SESSION.get(remote_url, timeout=120)
        response.raise_for_status()
        destination.write_bytes(response.content)
    return f"/media/{path}"



def normalize_internal_link(href: str) -> str:
    if href.startswith("tel:") or href.startswith("mailto:") or href.startswith("#"):
        return href
    if href.startswith(BASE_URL):
        pathname = normalize_pathname(href)
        return pathname if pathname != "/" else "/"
    return href



def unwrap(tag: Tag) -> None:
    if tag.parent is not None:
        tag.unwrap()



def sanitize_content(node: Tag) -> tuple[str, list[str], list[str]]:
    clone = BeautifulSoup(str(node), "html.parser")
    root = clone
    image_urls: list[str] = []
    headings: list[str] = []

    for tag in list(root.find_all(True)):
        name = tag.name.lower()
        if name in DROP_TAGS:
            tag.decompose()
            continue
        if name not in ALLOWED_TAGS:
            unwrap(tag)
            continue

        if name in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            text = tag.get_text(" ", strip=True)
            if text:
                headings.append(text)

        attrs_to_keep: dict[str, str] = {}
        if name == "a":
            href = tag.get("href", "").strip()
            if href:
                attrs_to_keep["href"] = normalize_internal_link(href)
                if attrs_to_keep["href"].startswith("http"):
                    attrs_to_keep["target"] = "_blank"
                    attrs_to_keep["rel"] = "noreferrer"
        elif name == "img":
            src = tag.get("src") or tag.get("data-lazy-src") or tag.get("data-src")
            if src:
                src = urljoin(BASE_URL, src)
                local_src = download_asset(src)
                attrs_to_keep["src"] = local_src
                attrs_to_keep["alt"] = tag.get("alt", "")
                attrs_to_keep["loading"] = "lazy"
                image_urls.append(local_src)
            else:
                tag.decompose()
                continue
        elif name == "iframe":
            src = tag.get("src", "")
            if src:
                attrs_to_keep["src"] = src
                attrs_to_keep["loading"] = "lazy"
                attrs_to_keep["allowfullscreen"] = "true"
                attrs_to_keep["referrerpolicy"] = "no-referrer-when-downgrade"
        elif name in {"table", "th", "td"}:
            if tag.get("colspan"):
                attrs_to_keep["colspan"] = tag["colspan"]
            if tag.get("rowspan"):
                attrs_to_keep["rowspan"] = tag["rowspan"]
        elif name == "span":
            pass

        tag.attrs = attrs_to_keep

    html = str(root)
    html = re.sub(r"\s+", " ", html)
    html = re.sub(r">\s+<", "><", html)
    return html.strip(), image_urls, headings



def extract_excerpt(soup: BeautifulSoup) -> str:
    for selector in ["p", "h2", "h3"]:
        for node in soup.select(selector):
            text = node.get_text(" ", strip=True)
            if len(text) > 70:
                return text[:220].strip()
    return ""



def classify_page(slug: str, is_post: bool) -> str:
    if is_post:
        return "blog-post"
    if slug in PROJECT_SLUGS:
        return "project"
    if slug == "blogs":
        return "blog-index"
    return "page"



def build_record(url: str, lastmod: str, is_post: bool) -> PageRecord:
    html = fetch_text(url)
    soup = BeautifulSoup(html, "html.parser")
    title = clean_title(soup.title.get_text(" ", strip=True) if soup.title else slug_from_url(url))
    main = get_main_content(soup)
    content_html, image_urls, headings = sanitize_content(main)
    description = extract_meta_description(soup)
    excerpt = description or extract_excerpt(main)
    pathname = normalize_pathname(url)
    slug = slug_from_url(url)

    return PageRecord(
        slug=slug,
        url=url,
        pathname=pathname,
        pageTitle=title,
        seoTitle=title,
        description=description,
        contentHtml=content_html,
        excerpt=excerpt,
        firstImage=image_urls[0] if image_urls else None,
        imageUrls=image_urls,
        headings=headings,
        type=classify_page(slug, is_post),
        lastModified=lastmod,
    )



def group_pages(records: Iterable[PageRecord]) -> dict[str, list[dict[str, str]]]:
    groups: dict[str, list[dict[str, str]]] = {"primary": [], "projects": [], "blogs": [], "utility": []}
    for record in records:
        item = {"title": record.pageTitle, "pathname": record.pathname}
        if record.type == "project":
            groups["projects"].append(item)
        elif record.type == "blog-post":
            groups["blogs"].append(item)
        elif record.slug in {"privacy-policy", "my-account", "home-new-page", "extra-material"}:
            groups["utility"].append(item)
        else:
            groups["primary"].append(item)
    return groups



def infer_reusable_sections(records: Iterable[PageRecord]) -> list[str]:
    buckets = []
    joined = "\n".join("\n".join(record.headings) for record in records)
    checks = {
        "Sticky header with multi-level project navigation": ["About Us", "Projectsnew", "Contact Us"],
        "Hero banners with project-led brand messaging": ["AL GHANI DEVELOPERS", "Al Ghani Garden Phase 7"],
        "Project showcase card grids": ["Our Projects", "VIEW PROJECT"],
        "Amenities icon grids": ["AMENITIES", "Masjid", "Park", "School"],
        "Payment-plan media sections": ["PAYMENT PLAN", "Payment Plan"],
        "Location/map sections": ["Location", "Office Location"],
        "Trust/contact CTA blocks": ["Contact Us", "Today's Client, Tomorrow's Neighbour"],
        "Blog listing cards": ["Al Ghani Developers Blogs", "Continue reading"],
        "Policy-rich prose content pages": ["Who we are", "Terms and Conditions"],
        "Programs / initiatives with supporting imagery": ["Our Programs", "Green Living"],
    }
    for label, keywords in checks.items():
        if any(keyword in joined for keyword in keywords):
            buckets.append(label)
    return buckets



def write_json(path: Path, data: object) -> None:
    ensure_dir(path.parent)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")



def write_discovery(records: list[PageRecord]) -> None:
    ensure_dir(DOCS_DIR)
    grouped = group_pages(records)
    reusable = infer_reusable_sections(records)
    lines = [
        "# Al-Ghani Discovery",
        "",
        "## Brand palette extracted from the current website",
        "",
        "- Emerald green: `#0d4230`",
        "- Deep forest: `#0f170d`",
        "- Muted gold: `#9c8f6c`",
        "- Warm ivory: `#f5f5f5`",
        "",
        "## Sitemap",
        "",
    ]
    for group_name, items in grouped.items():
        lines.append(f"### {group_name.title()}")
        lines.append("")
        for item in items:
            lines.append(f"- {item['title']} — `{item['pathname']}`")
        lines.append("")

    lines.extend(["## Reusable sections", ""])
    for item in reusable:
        lines.append(f"- {item}")
    lines.append("")
    lines.extend(
        [
            "## Component architecture",
            "",
            "- `components/layout/*`: sticky header, mega menu, footer, shell, breadcrumbs",
            "- `components/sections/*`: hero, stat band, showcase grid, content section renderer, CTA, office cards",
            "- `components/shared/*`: motion wrappers, rich text, schema, counters, empty states",
            "- `components/ui/*`: button, card, badge, input, textarea, separator",
            "- `services/*`: content loader, sitemap helper, schema helper",
            "- `constants/*`: site settings, navigation, generated content dataset",
            "- `hooks/*`: reduced motion, active section, scroll state",
            "",
            "## Notes",
            "",
            "- The project rebuild preserves original text and media while modernizing layout, motion, spacing, typography, and SEO foundations.",
            "- All downloaded images are stored locally under `public/media/...` for self-hosted production deployment.",
        ]
    )
    (DOCS_DIR / "discovery.md").write_text("\n".join(lines), encoding="utf-8")



def main() -> None:
    ensure_dir(MEDIA_DIR)
    pages = parse_sitemap(PAGES_SITEMAP)
    posts = parse_sitemap(POSTS_SITEMAP)
    records: list[PageRecord] = []

    for entry in pages:
        records.append(build_record(entry["url"], entry["lastmod"], is_post=False))

    for entry in posts:
        records.append(build_record(entry["url"], entry["lastmod"], is_post=True))

    serialized = [asdict(record) for record in records]
    write_json(DATA_DIR / "site-content.json", serialized)
    write_json(
        DATA_DIR / "site-map.json",
        {
            "baseUrl": BASE_URL.rstrip("/"),
            "primaryNav": [{"label": label, "href": href} for label, href in PRIMARY_NAV],
            "records": [{"title": r.pageTitle, "pathname": r.pathname, "type": r.type, "lastModified": r.lastModified} for r in records],
        },
    )
    write_discovery(records)
    print(f"Generated {len(records)} records and downloaded assets into {MEDIA_DIR}")


if __name__ == "__main__":
    main()
