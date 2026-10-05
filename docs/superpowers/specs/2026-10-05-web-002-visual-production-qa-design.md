# WEB-002 Sitewide Visual Production and QA Design

**Status:** Approved approach; implementation specification
**Repository:** `GALORENT/galorent.com`
**Date:** 2026-10-05

## 1. Purpose

WEB-002 will turn the existing GALORENT development site into a coherent, production-quality public presentation for funding, partner, lender, tester, and customer review. The work is a visual-production and quality pass over the current static site, not a product redesign.

The finished site must feel precise, engineered, modern, and distinctive while preserving the GALORENT Technical Grid language. It must create confidence, curiosity, and memorable technical credibility so serious reviewers want to learn more, without relying on generic marketing spectacle or overstating product readiness. It must communicate the difference between current evidence, development work, and future direction without implying releases, downloads, purchases, account functions, compatibility, pricing, or availability that do not exist.

## 2. Governing boundaries

The following remain authoritative and outside WEB-002:

- product architecture, naming, and edition doctrine;
- Scene ownership rules and commercialization decisions;
- pricing, availability, compatibility, and feature-status claims;
- DNS, nameservers, MX records, and CNAME strategy;
- the private `GALORENT/GALORENT` product repository;
- application UI, application behavior, and product screenshots themselves.

WEB-002 will not introduce a new site framework, build system, backend, account system, commerce system, or product functionality. The existing static HTML/CSS/JavaScript and GitHub Pages deployment model will remain.

## 3. Current-state findings

The audited baseline at commit `a70d4dae286b46d20966a1dcdb079d809a3ec7af` has:

- 17 indexed public routes plus the 404 page;
- intact internal links, fragment targets, canonical URLs, robots policy, and sitemap coverage;
- disciplined product-status wording;
- 18 embedded data-image instances representing only six unique images;
- approximately 214 KB of duplicated embedded image data;
- four SPD product captures at 720 x 464 pixels, some rendered wider than their natural width;
- eleven Scene concept cards represented by five repeated CSS-generated treatments;
- text-only or generic edition presentation despite approved Instrument Aperture identity assets being available;
- responsive behavior that is functional but uneven in density, spacing, and image hierarchy.

The current information architecture and public product claims are substantially correct and will be preserved.

## 4. Selected production approach

WEB-002 will use an **asset-first normalization pass** followed by shared visual-system refinement and page-level responsive QA.

This approach is selected because it removes the largest production defects without introducing a new site architecture:

1. establish a traceable web-asset library from supplied and currently approved material;
2. replace placeholders and embedded blobs with those assets;
3. refine shared layout, typography, cards, transitions, and responsive rules;
4. apply the shared system consistently across every route;
5. validate the complete static site and GitHub Pages deployment.

The rejected alternatives are:

- independent page-by-page restyling, which would preserve duplication and increase visual drift;
- adding a generator or frontend framework, which would add deployment and maintenance complexity without serving the approved objective.

## 5. Asset system

### 5.1 Repository organization

Production assets will be organized under:

```text
assets/
  images/
    brand/
    spd/
    scenes/
    product/
    hardware/
```

An asset provenance note will identify each source file, the derivative created from it, the transformation applied, and its intended site use. Transformations are limited to cropping, resizing downward, color-profile normalization, and suitable web encoding. Artwork geometry and product UI may not be redrawn, retouched, recomposed, or regenerated.

### 5.2 GALORENT master identity

The supplied approved GALORENT G/master identity will replace repeated embedded copies where currently used. Web derivatives will preserve the metallic silver and amber identity and the dark-primary presentation. The G remains the small-format/fav-icon identity.

Outdated product lockups containing the retired `Consumer` edition terminology will not be introduced as new identity assets.

### 5.3 SPD Instrument Aperture and editions

The supplied Instrument Aperture artwork is the product identifier. The website will use the actual supplied geometry rather than recreating it with CSS.

Edition presentation will preserve:

- SPD Free — amber/gold;
- SPD Pro — amber/gold, presented as a separate edition;
- SPD Service — blue/cyan;
- SPD Corporate — green;
- SPD Laboratory / Engineering — violet/purple.

The symbol geometry remains identical. Edition identity changes only through the supplied controlled internal color element. The master GALORENT G remains the application/taskbar identity; WEB-002 does not alter that rule.

The approved family strip may be used as a whole. Individual edition web assets may be cropped from that supplied strip when a page requires one edition, provided the crop does not redraw or alter the source artwork.

### 5.4 Scene concept artwork

The two supplied Scene concept sheets are the approved visual source for:

1. GALORENT Minimal
2. Phosphor Performance
3. Reactor
4. Apex
5. Mainframe
6. Foundry
7. Datastream
8. Orbital
9. Lab Instrument
10. Command
11. Neural

Each artwork panel will be cropped directly from the corresponding supplied sheet and encoded as an individual high-quality web image. The cards on `/spd/scenes/` will display these real panels. Store-direction groupings may reuse the same files rather than generating alternate placeholders.

Every concept remains labeled `Concept Direction` or `Development Direction`. No card may imply download, release, purchase, included entitlement, animation, or availability.

### 5.5 SPD product evidence

Existing approved UI must remain real SPD UI. WEB-002 will not fabricate, retype, redraw, sharpen with generative tools, or cosmetically change application screenshots.

The current four embedded captures are 720 x 464 derivatives. They will be extracted into reusable files and will never be rendered above their native useful width. A higher-resolution replacement may be used only when it can be verified as the same approved screen/state or is explicitly approved by Jonathan.

The accessible project folders do not currently contain the referenced original screen recordings. Higher-resolution development screenshots exist for some surfaces, but they are not automatically equivalent to the approved frames. Therefore:

- no recording frame will be claimed as re-extracted unless the recording is actually available;
- no unrelated or merely similar screenshot will silently replace an approved frame;
- missing native sources will remain an explicit final-report limitation;
- an Overview frame will not be added solely because an unverified development screenshot exists.

The current screenshot headers also contain legacy `Consumer` wording. WEB-002 will not edit that wording inside a real product capture. Whether those captures remain acceptable public evidence or require replacement is an approval item, not a website-design decision.

### 5.6 Hardware evidence

The current cleaned Display Systems prototype presentation is preserved as real development evidence. WEB-002 may extract its embedded derivative into the asset library and optimize delivery without altering the represented hardware, Scene, status, or caption.

Additional production photographs will not be substituted merely because they are available. A new photograph requires a clear existing approved use or Jonathan approval.

## 6. Shared visual system

### 6.1 Technical Grid continuity

The existing near-black, graphite, silver/white, restrained amber, thin-grid, and engineered-panel language remains the site foundation. Refinement will improve consistency rather than introduce a new art direction.

Shared rules will cover:

- page and section spacing;
- content widths and readable line lengths;
- headline and supporting-text scale;
- eyebrow, badge, status, caption, and metadata treatment;
- panel borders, radii, shadows, and elevation;
- image frames and aspect-ratio behavior;
- primary, secondary, and text-link CTA hierarchy;
- grid density and section transitions;
- edition accent variables;
- hover, active, and keyboard-focus states;
- reduced-motion behavior.

Decorative gradients and glow will remain restrained. They may support hierarchy but may not replace approved artwork or make the site resemble a gaming-RGB template.

### 6.2 Navigation and footer

The global navigation structure remains unchanged. The pass will normalize active states, mobile-menu behavior, focus order, tap targets, spacing, and footer presentation across routes. No Login, Buy, Download, Subscribe, or account action will be made functional.

### 6.3 Status language

The site will continue to use explicit, visually consistent states:

- Current Product Evidence
- Development Build
- In Development
- Future Direction
- Concept Direction
- Development Direction

Visual color is supplementary; status must remain understandable from text alone.

## 7. Page treatment

### Homepage

Preserve the current funding-oriented story, master GALORENT identity, SPD progression, real software evidence, Display Systems evidence, and inquiry paths. Improve hero balance, image sizing, section rhythm, screenshot sharpness limits, and mobile composition.

### `/spd/`

Replace the text/CSS SPD wordmark treatment with approved Instrument Aperture identity artwork where the product identity is being presented. Preserve the existing machine-truth narrative and status progression. Normalize the product-evidence gallery so captures remain crisp at or below native size. Replace generic edition cards with approved edition identity assets.

### `/spd/how-it-works/`

Retain the existing explanatory sequence and shared-architecture doctrine. Improve step hierarchy, responsive reading order, and visual connection to the main SPD page without inventing technical capability.

### `/spd/scenes/`

Replace all repeated CSS-generated concept backgrounds with the eleven supplied Scene panels. Preserve the current concept descriptions and honesty language. Cards will use a consistent media area, status line, and readable description. The `More to come` card remains a restrained non-artwork ecosystem-direction card.

### `/spd/compatibility/`

Preserve its validation-first doctrine and current claims. Improve hierarchy and scanning without expanding hardware support claims or adding a compatibility matrix that is not established.

### `/spd/editions/` and edition pages

Use the supplied family artwork on the overview and the appropriate supplied edition identity on each detail page. Free and Pro remain separate pages sharing amber. Each page retains its current status and workflow wording; WEB-002 does not create feature comparison claims, quotas, pricing, or availability.

### `/hardware/`

Preserve real prototype evidence and the separation between Display Systems development and Thermal Systems future direction. Normalize image framing, evidence captions, and mobile order.

### `/store/`

Use supplied Scene artwork to make the future catalog direction visually credible while preserving the explicit pre-commerce boundary. No purchase controls, prices, subscriptions, ownership implementation, or release claims will be added.

### `/company/`

Preserve the ecosystem, company-stage, funding, partner, tester, and contact narratives. Improve identity presentation and section hierarchy without inventing corporate milestones or contact methods.

### `/support/`, `/account/`, updates, and 404

Keep these pages truthful and deliberately nonfunctional where their future service does not yet exist. Bring their spacing, status treatment, navigation, footer, and responsive presentation into the same visual system without adding forms, authentication, ticketing, or fake account controls.

## 8. Responsive behavior

The production pass will validate at minimum:

- desktop: 1440 x 1000 and a narrower desktop/laptop width;
- tablet: 768 x 1024;
- mobile: 390 x 844 and a narrow 360-pixel width.

Required behavior:

- no horizontal overflow;
- no text clipped by cards, badges, artwork, or navigation;
- meaningful media remains visible without dominating the first viewport;
- typography and spacing scale smoothly rather than switching abruptly;
- grids collapse in a deliberate reading order;
- touch targets remain usable;
- mobile menu state and `aria-expanded` remain synchronized;
- full-page artwork is not downloaded at wasteful dimensions when a smaller derivative is sufficient.

## 9. Accessibility and document quality

Every route will retain one clear `h1`, logical heading order, a functional skip link, semantic navigation, and descriptive link text.

Images will receive:

- accurate alt text based on purpose;
- empty alt text only when truly decorative;
- explicit intrinsic width and height where practical to reduce layout shift;
- lazy loading below the fold;
- eager/high-priority loading only for justified hero imagery.

Keyboard focus must remain visible. Color contrast, status communication, mobile-menu operation, reduced-motion support, and browser-console errors will be checked. Decorative backgrounds will remain excluded from the accessibility tree.

## 10. Metadata and deployment

Each indexed route will retain a unique title, description, canonical URL, and theme color. The pass will normalize appropriate social-preview metadata and approved identity imagery without making product claims beyond page content.

`robots.txt`, `sitemap.xml`, `CNAME`, and `.nojekyll` will remain consistent with the existing GitHub Pages model. No DNS or GitHub Pages source strategy will be changed.

After verified commits are pushed, deployment validation will include:

- GitHub Pages build/deployment status;
- successful live responses for all sitemap routes;
- correct custom-domain canonical behavior;
- asset loading without mixed-content or missing-file failures;
- confirmation that `CNAME` remains unchanged.

## 11. Validation gates

Implementation is complete only when all of the following pass:

1. clean repository and expected diff review;
2. no data-image blobs remain where practical web files replace them;
3. no repeated Scene placeholder backgrounds remain;
4. supplied Scene and edition artwork maps to the correct names/colors;
5. no product screenshot exceeds its verified source dimensions;
6. all internal links and fragments resolve;
7. sitemap and canonical routes agree;
8. titles, descriptions, headings, alt text, dimensions, and loading behavior are audited;
9. desktop, tablet, and mobile layouts are visually checked across all routes;
10. keyboard focus and mobile navigation are verified;
11. browser console reports no site errors;
12. page-weight and duplicate-asset results are recorded before and after;
13. key desktop and mobile screenshots are captured for the final report;
14. the live GitHub Pages deployment is checked after push.

## 12. Required final report

The final WEB-002 report will include:

- exact files changed;
- before/after production summary;
- key desktop and mobile page screenshots;
- asset inventory and source-to-use mapping;
- unresolved items requiring Jonathan approval;
- validation and deployment results;
- final commit SHA and clean/dirty repository state.

## 13. Known unresolved inputs

The following are preserved as approval/source gaps rather than silently decided:

1. The original recordings for native-resolution This Machine, History, Tests, Overview, and Scenes frame extraction were not found in accessible project, OneDrive, or Downloads locations.
2. Higher-resolution development screenshots exist but may represent different UI states and are not automatically approved replacements.
3. Existing real SPD captures visibly contain legacy `Consumer` terminology. The website will not alter a real screenshot to remove it.
4. No new hardware photograph will be selected solely on aesthetic preference without an established approved use.

These gaps do not block the Scene-art replacement, edition-identity correction, shared visual cleanup, responsive QA, accessibility work, or conversion of existing embedded images into normal reusable web files.
