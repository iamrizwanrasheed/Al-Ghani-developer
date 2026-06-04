from __future__ import annotations

import json
import os
import re
import hashlib
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Dict, List, Optional
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup, Tag

BASE_URL = "https://alghani.com.pk/"
ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"
ASSET_DIR = PUBLIC_DIR / "site-assets"
DATA_DIR = ROOT / "src" / "content"

SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
    }
)

PAGE_SITEMAP = urljoin(BASE_URL, "wp-sitemap-posts-page-1.xml")
POST_SITEMAP = urljoin(BASE_URL, "wp-sitemap-posts-post-1.xml")

KEEP_ATTRS = {
    "a": {"href", "title", "target", "rel"},
    "img": {"src", "alt", "title", "width", "height", "loading"},
    "iframe": {"src", "width", "height", "loading", "allowfullscreen", "referrerpolicy", "style"},
    "source": {"src", "srcset", "type", "media"},
}

DROP_TAGS = {
    "script",
    "style",
    "noscript",
    "svg",
    "path",
    "form",
    "input",
    "textarea",
    "select",
    "option",
    "button",
    "meta",
    "link",
}

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

GENERAL_PAGE_SLUGS = {
    "about-us",
    "projects",
    "programs",
    "contact-us",
    "career",
    "home-new-page",
    "extra-material",
    "green-living-initiative",
    "balloting-result",
    "privacy-policy",
    "my-account",
    "blogs",
}


@dataclass
class PageRecord:
    url: str
    slug: str
    title: str
    seo_title: str
    page_type: str
    excerpt: str
    content_html: str
    hero_image: Optional[str]
    image_paths: List[str]
    headings: List[str]
    links: List[Dict[str, str]]
    last_modified: Optional[str]



def ensure_dirs() -> None:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    DATA_DIR.mkdir(parents=True, exist_ok=True)



def fetch(url: str) -> requests.Response:
    response = SESSION.get(url, timeout=60)
    response.raise_for_status()
    return response



def get_sitemap_urls(sitemap_url: str) -> List[str]:
    text = fetch(sitemap_url).text
    return re.findall(r"<loc>(.*?)</loc>", text)



def get_lastmod_map(sitemap_url: str) -> Dict[str, str]:
    text = fetch(sitemap_url).text
    entries = re.findall(r"<url>\s*<loc>(.*?)</loc>\s*<lastmod>(.*?)</lastmod>\s*</url>", text, re.S)
    return {loc: lastmod for loc, lastmod in entries}



def get_slug(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path.strip("/")
    return path or "home"



def classify_slug(slug: str, is_post: bool) -> str:
    if slug == "home":
        return "home"
    if slug in PROJECT_SLUGS:
        return "project"
    if slug == "blogs":
        return "blog-index"
    if is_post:
        return "post"
    if slug in GENERAL_PAGE_SLUGS:
        return "page"
    return "page"



def normalize_url(url: str) -> str:
    if url.startswith("//"):
        return "https:" + url
    return urljoin(BASE_URL, url)



def safe_filename_from_url(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path
    ext = os.path.splitext(path)[1].lower()
    if not ext or len(ext) > 6:
        ext = ".bin"
    name = os.path.basename(path) or "asset"
    stem = re.sub(r"[^a-zA-Z0-9._-]+", "-", os.path.splitext(name)[0]).strip("-") or "asset"
    digest = hashlib.sha1(url.encode()).hexdigest()[:10]
    return f"{stem}-{digest}{ext}"



def download_asset(url: str, download_cache: Dict[str, str]) -> str:
    url = normalize_url(url)
    if url in download_cache:
        return download_cache[url]

    filename = safe_filename_from_url(url)
    target = ASSET_DIR / filename
    if not target.exists():
        response = fetch(url)
        target.write_bytes(response.content)
    public_path = f"/site-assets/{filename}"
    download_cache[url] = public_path
    return public_path



def clean_text(text: str) -> str:
    text = re.sub(r"\s+", " ", text or "").strip()
    return text



def element_visible_text(el: Tag) -> str:
    return clean_text(el.get_text(" ", strip=True))



def find_main_content(soup: BeautifulSoup) -> Optional[Tag]:
    selectors = [
        "article.entry-content",
        "article",
        "main article",
        "main",
        ".elementor-location-single",
        ".site-content",
    ]
    for selector in selectors:
        node = soup.select_one(selector)
        if node:
            return node
    return None



def gather_inline_style_assets(tag: Tag) -> List[str]:
    if not isinstance(tag, Tag) or tag.attrs is None:
        return []
    style = tag.get("style", "")
    return re.findall(r"url\((?:'|\")?(.*?)(?:'|\")?\)", style)



def sanitize_html(node: Tag, download_cache: Dict[str, str]) -> str:
    for tag in list(node.find_all(True)):
        if tag.name in DROP_TAGS:
            tag.decompose()
            continue
        if tag.name == "a":
            href = tag.get("href")
            if href:
                tag["href"] = normalize_url(href) if not href.startswith(("#", "mailto:", "tel:")) else href
        if tag.name == "img":
            src = tag.get("src") or tag.get("data-src") or tag.get("data-lazy-src")
            if src:
                try:
                    tag["src"] = download_asset(src, download_cache)
                except Exception:
                    tag["src"] = normalize_url(src)
            srcset = tag.get("srcset") or tag.get("data-srcset")
            if srcset:
                first_src = srcset.split(",")[0].strip().split(" ")[0]
                try:
                    tag["src"] = download_asset(first_src, download_cache)
                except Exception:
                    pass
            tag.attrs = {k: v for k, v in tag.attrs.items() if k in KEEP_ATTRS["img"]}
            tag["loading"] = "lazy"
            continue
        if tag.name == "iframe":
            tag.attrs = {k: v for k, v in tag.attrs.items() if k in KEEP_ATTRS["iframe"]}
            tag["loading"] = "lazy"
            continue
        for bg_url in gather_inline_style_assets(tag):
            try:
                download_asset(bg_url, download_cache)
            except Exception:
                pass
        if tag.name in KEEP_ATTRS:
            tag.attrs = {k: v for k, v in tag.attrs.items() if k in KEEP_ATTRS[tag.name]}
        else:
            tag.attrs = {}

    html = str(node)
    html = re.sub(r"\s+class=\".*?\"", "", html)
    html = re.sub(r"\s+id=\".*?\"", "", html)
    return html



def extract_links(node: Tag) -> List[Dict[str, str]]:
    links: List[Dict[str, str]] = []
    seen = set()
    for a in node.find_all("a", href=True):
        href = normalize_url(a["href"]) if not a["href"].startswith(("#", "mailto:", "tel:")) else a["href"]
        text = clean_text(a.get_text(" ", strip=True)) or href
        key = (text, href)
        if key not in seen:
            links.append({"label": text, "href": href})
            seen.add(key)
    return links[:40]



def extract_images(node: Tag, download_cache: Dict[str, str]) -> List[str]:
    images: List[str] = []
    seen = set()
    for img in node.find_all("img"):
        src = img.get("src") or img.get("data-src") or img.get("data-lazy-src")
        if not src:
            continue
        try:
            local = download_asset(src, download_cache)
        except Exception:
            local = normalize_url(src)
        if local not in seen:
            images.append(local)
            seen.add(local)
    for tag in node.find_all(True):
        for bg_url in gather_inline_style_assets(tag):
            try:
                local = download_asset(bg_url, download_cache)
            except Exception:
                local = normalize_url(bg_url)
            if local not in seen:
                images.append(local)
                seen.add(local)
    return images



def extract_excerpt(node: Tag) -> str:
    paragraphs: List[str] = []
    for p in node.find_all(["p", "li"], limit=8):
        text = element_visible_text(p)
        if len(text) > 30:
            paragraphs.append(text)
        if len(" ".join(paragraphs)) > 300:
            break
    excerpt = clean_text(" ".join(paragraphs))
    return excerpt[:300].rsplit(" ", 1)[0] if len(excerpt) > 300 else excerpt



def extract_headings(node: Tag) -> List[str]:
    headings = []
    seen = set()
    for tag in node.find_all(["h1", "h2", "h3", "h4"]):
        text = element_visible_text(tag)
        if text and text not in seen:
            headings.append(text)
            seen.add(text)
    return headings[:30]



def extract_title(soup: BeautifulSoup, fallback: str) -> str:
    h1 = soup.find("h1")
    if h1:
        text = element_visible_text(h1)
        if text:
            return text
    if soup.title:
        title = clean_text(soup.title.get_text(" ", strip=True))
        title = title.replace(" – Al-Ghani", "").replace(" - Al-Ghani", "")
        if title:
            return title
    return fallback



def scrape_url(url: str, lastmod: Optional[str], is_post: bool, download_cache: Dict[str, str]) -> PageRecord:
    response = fetch(url)
    soup = BeautifulSoup(response.text, "html.parser")
    slug = get_slug(url)
    content_root = find_main_content(soup) or soup
    content_copy = BeautifulSoup(str(content_root), "html.parser")
    content_node = content_copy.find(True) or content_copy

    images = extract_images(content_root, download_cache)
    sanitized_html = sanitize_html(content_node, download_cache)
    title = extract_title(soup, slug.replace("-", " ").title())
    seo_title = clean_text(soup.title.get_text(" ", strip=True)) if soup.title else title
    excerpt = extract_excerpt(content_root)
    headings = extract_headings(content_root)
    links = extract_links(content_root)

    return PageRecord(
        url=url,
        slug=slug,
        title=title,
        seo_title=seo_title,
        page_type=classify_slug(slug, is_post),
        excerpt=excerpt,
        content_html=sanitized_html,
        hero_image=images[0] if images else None,
        image_paths=images,
        headings=headings,
        links=links,
        last_modified=lastmod,
    )



def main() -> None:
    ensure_dirs()
    page_lastmods = get_lastmod_map(PAGE_SITEMAP)
    post_lastmods = get_lastmod_map(POST_SITEMAP)
    page_urls = get_sitemap_urls(PAGE_SITEMAP)
    post_urls = get_sitemap_urls(POST_SITEMAP)

    download_cache: Dict[str, str] = {}
    pages: List[PageRecord] = []

    for url in page_urls:
        print(f"Scraping page: {url}")
        pages.append(scrape_url(url, page_lastmods.get(url), False, download_cache))

    for url in post_urls:
        print(f"Scraping post: {url}")
        pages.append(scrape_url(url, post_lastmods.get(url), True, download_cache))

    pages.sort(key=lambda item: (item.page_type, item.slug))

    payload = {
        "site": {
            "name": "Al Ghani Developers",
            "url": BASE_URL,
            "phone": "042 111 116 117",
            "email": "Info@alghani.com.pk",
            "headOffice": "2KM Quaid-e-Azam Interchange, Lahore Ring Road, Lahore, Punjab",
            "corporateOffice": "157B DHA Phase 8 Broadway Commercial, Broadway, Commercial Lahore, 54810, Pakistan",
        },
        "pages": [asdict(page) for page in pages],
    }

    out_file = DATA_DIR / "site-data.json"
    out_file.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Saved {len(pages)} entries to {out_file}")
    print(f"Downloaded {len(download_cache)} assets to {ASSET_DIR}")


if __name__ == "__main__":
    main()
