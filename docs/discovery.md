# Al-Ghani Discovery

## Brand palette extracted from the current website

- Emerald green: `#0d4230`
- Deep forest: `#0f170d`
- Muted gold: `#9c8f6c`
- Warm ivory: `#f5f5f5`

## Sitemap

### Primary

- Al-Ghani – Perfect Lifestyle With Affordability In Lahore — `/`
- About Us — `/about-us`
- Projects — `/projects`
- Programs — `/programs`
- Blogs — `/blogs`
- Contact Us — `/contact-us`
- CAREERS — `/career`
- Green Living Initiative — `/green-living-initiative`
- Balloting Result — `/balloting-result`

### Projects

- Al Ghani Phase I — `/al-ghani-phase-i`
- Al Ghani Phase II — `/al-ghani-phase-ii`
- Al Ghani Phase III — `/al-ghani-phase-iii`
- Al Ghani Phase III (EXT) — `/al-ghani-phase-iii-ext`
- Kings Lane — `/kings-lane`
- Azmat Heights — `/azmat-heights`
- Square Avenue — `/square-avenue`
- Al Ghani Phase 7 — `/alghani`
- Haider Block — `/haider-block`
- Maskan Block — `/maskan-block`
- AlGhani — `/al-ghani-garden-phase-7`
- Awami Block — `/awami-block`
- Zavia Block — `/zavia-block`
- The East Block — `/the-east-block`

### Blogs

- 5 Marla Plot in Lahore GT Road — `/5-marla-plot-in-lahore-gt-road`
- Why is Al-Ghani the best housing community in Lahore? — `/why-is-al-ghani-the-best-housing-community-in-lahore`
- Plots on Easy Installments in Lahore — `/plots-on-easy-installments-in-lahore`
- How to buy a plot in Lahore — `/how-to-buy-a-plot-in-lahore`
- How to buy property in the prime location of Lahore? — `/how-to-buy-property-in-the-prime-location-of-lahore`
- How to Pick the best & Right Housing Scheme — `/how-to-pick-the-right-housing-scheme`
- Plot on Installment in Lahore 2021 — `/plot-on-installment-in-lahore-2021`
- Real Estate in Lahore — `/real-estate-in-lahore`
- How to Buy a Plot in Lahore? — `/how-to-buy-a-plot-in-lahore-2`

### Utility

- Privacy Policy — `/privacy-policy`
- My account — `/my-account`
- Home New Page — `/home-new-page`
- Extra material — `/extra-material`

## Reusable sections

- Sticky header with multi-level project navigation
- Hero banners with project-led brand messaging
- Project showcase card grids
- Amenities icon grids
- Payment-plan media sections
- Location/map sections
- Trust/contact CTA blocks
- Blog listing cards
- Policy-rich prose content pages
- Programs / initiatives with supporting imagery

## Component architecture

- `components/layout/*`: sticky header, mega menu, footer, shell, breadcrumbs
- `components/sections/*`: hero, stat band, showcase grid, content section renderer, CTA, office cards
- `components/shared/*`: motion wrappers, rich text, schema, counters, empty states
- `components/ui/*`: button, card, badge, input, textarea, separator
- `services/*`: content loader, sitemap helper, schema helper
- `constants/*`: site settings, navigation, generated content dataset
- `hooks/*`: reduced motion, active section, scroll state

## Notes

- The project rebuild preserves original text and media while modernizing layout, motion, spacing, typography, and SEO foundations.
- All downloaded images are stored locally under `public/media/...` for self-hosted production deployment.