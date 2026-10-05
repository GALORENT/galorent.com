# WEB-002 Sitewide Visual Production and QA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a top-tier, visually coherent GALORENT public site that creates confidence and curiosity through approved real assets, disciplined technical presentation, and verified responsive quality.

**Architecture:** Preserve the existing static GitHub Pages site and its information architecture. Normalize approved artwork into a traceable asset library, upgrade the shared CSS/JavaScript shell, apply the system page by page, and enforce the finished result with a dependency-free site validator plus browser-based visual QA.

**Tech Stack:** Semantic HTML5, CSS custom properties and responsive layout, minimal vanilla JavaScript, Node.js standard-library validation tooling, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-05-web-002-visual-production-qa-design.md`

## Global Constraints

- Work only in public repository `GALORENT/galorent.com`; never modify private repository `GALORENT/GALORENT`.
- Preserve product architecture, naming, edition doctrine, Scene ownership, pricing, compatibility, status, and commercialization decisions.
- Preserve static GitHub Pages deployment, `CNAME`, `.nojekyll`, DNS strategy, and current route structure.
- Do not add a framework, package manager dependency, backend, commerce, authentication, account, download, or subscription behavior.
- Use only supplied/approved GALORENT, Instrument Aperture, Scene, SPD UI, and hardware evidence; do not redraw, regenerate, or fabricate it.
- Free and Pro remain separate amber editions; Service is cyan, Corporate green, and Laboratory / Engineering violet.
- Treat all Scene artwork as Concept Direction or Development Direction, never as released/downloadable product.
- Never upscale a product screenshot beyond its verified native dimensions.
- Preserve exact text distinctions: Current Product Evidence, Development Build, In Development, Future Direction, Concept Direction, and Development Direction.
- A technically valid result is insufficient: final visual review must show confidence, intrigue, memorable technical credibility, and consistent premium execution.
- Commit only reviewable, verified checkpoints; push only after the complete final regression and diff review are green.

## Review Focus

- **Missing or unverified native product evidence:** retain the approved 720 x 464 derivative at or below native size and report the source gap; never substitute or upscale a similar capture. Covered by Tasks 2, 6, and 9.
- **Legacy `Consumer` text inside real captures:** preserve screenshot pixels and flag the replacement decision; never retouch product UI. Covered by Tasks 2, 6, and 9.
- **Scene-to-name mismatch during cropping:** require source/crop provenance and a visual eleven-name audit. Covered by Tasks 3 and 5.
- **Root-relative assets under GitHub Pages/custom domain:** validate every referenced file and every sitemap route through the local server and live domain. Covered by Tasks 1, 8, and 9.
- **Mobile navigation or artwork causing keyboard/viewport failure:** test 360/390/768 widths, Escape behavior, focus visibility, and zero horizontal overflow. Covered by Tasks 4 and 8.

---

## File structure

### New production assets and records

- `assets/images/ASSET_PROVENANCE.md` — source-to-derivative mapping, crop boundaries, transformations, status, and site use.
- `assets/images/brand/*` — approved GALORENT master-mark, icon, and social-preview derivatives.
- `assets/images/spd/*` — approved Instrument Aperture lockup, family strip, and edition-mark derivatives.
- `assets/images/scenes/*` — eleven individual crops from the two supplied Scene concept sheets.
- `assets/images/product/*` — reusable approved SPD This Machine, History, Tests, and Scenes captures.
- `assets/images/hardware/*` — reusable approved cleaned Display Systems prototype image.
- `scripts/validate-site.mjs` — dependency-free structural, route, metadata, accessibility-presence, and asset checks.
- `scripts/serve-site.mjs` — dependency-free local static server for root-relative GitHub Pages testing.

### Existing shared files

- `assets/site.css` — formatted and normalized Technical Grid tokens, components, page layouts, edition accents, and responsive rules.
- `assets/site.js` — mobile navigation state, Escape/selection close behavior, and dynamic copyright year only.
- `README.md` — local preview and validation commands.

### Existing pages

- `index.html`, `404.html`
- `spd/index.html`, `spd/how-it-works/index.html`, `spd/scenes/index.html`, `spd/compatibility/index.html`, `spd/editions/index.html`
- `spd/free/index.html`, `spd/pro/index.html`, `spd/service/index.html`, `spd/corporate/index.html`, `spd/laboratory/index.html`
- `hardware/index.html`, `store/index.html`, `company/index.html`, `company/updates/index.html`, `support/index.html`, `account/index.html`
- `sitemap.xml`, `robots.txt`, `CNAME`, `.nojekyll`

## Task 1: Establish deterministic site validation and preview

**Files:**
- Create: `scripts/validate-site.mjs`
- Create: `scripts/serve-site.mjs`
- Modify: `README.md`

**Interfaces:**
- Produces: `node scripts/validate-site.mjs` returning exit code 0 only when baseline structure is valid.
- Produces: `node scripts/serve-site.mjs --port 4173` serving the repository root with directory-index and 404 behavior.

- [ ] **Step 1: Add baseline validation assertions**

  Implement checks for the exact sitemap route set, matching canonical URLs, unique non-empty titles/descriptions, one `h1` per page, duplicate IDs, existing internal routes/fragments, existing local CSS/JS/image references, `CNAME` equal to `galorent.com`, and unchanged GitHub Pages root files.

- [ ] **Step 2: Run the baseline validator**

  Run: `node scripts/validate-site.mjs`
  Expected: PASS with route, metadata, link, fragment, and deployment-file counts; no repository write.

- [ ] **Step 3: Add the local static server**

  Support `--port <number>`, root-relative asset paths, `/route/` to `route/index.html`, correct common content types, path traversal rejection, and `404.html` fallback.

- [ ] **Step 4: Verify local serving**

  Run: `node scripts/serve-site.mjs --port 4173`
  Check: `/`, `/spd/`, `/spd/scenes/`, `/assets/site.css`, and an unknown route return the expected 200/404 responses.

- [ ] **Step 5: Document preview and validation**

  Add concise README commands without adding npm, pnpm, or framework requirements.

- [ ] **Step 6: Commit the tooling checkpoint**

  Commit: `build: add deterministic website validation`

## Task 2: Build the approved reusable asset foundation

**Files:**
- Create: `assets/images/ASSET_PROVENANCE.md`
- Create: `assets/images/brand/galorent-master-dark.webp`
- Create: `assets/images/brand/galorent-g-icon-32.png`
- Create: `assets/images/brand/galorent-g-icon-180.png`
- Create: `assets/images/brand/galorent-social-preview.jpg`
- Create: `assets/images/spd/spd-instrument-aperture-free-pro.png`
- Create: `assets/images/spd/spd-edition-family.png`
- Create: `assets/images/spd/spd-mark-free-pro.png`
- Create: `assets/images/spd/spd-mark-service.png`
- Create: `assets/images/spd/spd-mark-corporate.png`
- Create: `assets/images/spd/spd-mark-laboratory.png`
- Create: `assets/images/product/spd-this-machine.webp`
- Create: `assets/images/product/spd-history.webp`
- Create: `assets/images/product/spd-processor-load-response.webp`
- Create: `assets/images/product/spd-scenes-management.webp`
- Create: `assets/images/hardware/display-systems-prototype.webp`
- Modify: `index.html`, `company/index.html`, `hardware/index.html`, `spd/index.html`, `spd/scenes/index.html`
- Modify: `scripts/validate-site.mjs`

**Interfaces:**
- Consumes: approved source files named in the design specification and the six unique embedded baseline images.
- Produces: stable `/assets/images/...` URLs, intrinsic dimensions, and provenance that later page tasks reuse.

- [ ] **Step 1: Add production-asset validation and observe the expected failure**

  Add assertions for zero `data:image` HTML sources, non-empty `alt`, positive `width`/`height`, and valid local image paths.
  Run: `node scripts/validate-site.mjs`
  Expected: FAIL listing the current embedded images and missing dimensions.

- [ ] **Step 2: Create exact brand and SPD derivatives**

  Use the approved master G, `spd-logo-free-pro.png`, and approved four-color edition-family source. Preserve geometry; crop only; resize only downward; preserve transparency where present.

- [ ] **Step 3: Extract approved evidence images without recomposition**

  Decode each unique baseline SPD/hardware data image once into the named reusable file. Do not sharpen, retouch, or upscale the four 720 x 464 product captures.

- [ ] **Step 4: Write provenance**

  Record source filename, output filename, native dimensions, crop/resize/encoding operation, intended pages, and whether the asset is Approved Evidence, Approved Identity, or Concept Direction.

- [ ] **Step 5: Replace embedded sources**

  Update all five affected pages to reference the reusable files. Add accurate `alt`, intrinsic `width`/`height`, and appropriate eager/lazy loading. Constrain CSS display widths so product captures never exceed 720 CSS pixels.

- [ ] **Step 6: Verify the asset foundation**

  Run: `node scripts/validate-site.mjs`
  Expected: PASS with zero embedded data images and all local assets present.

- [ ] **Step 7: Commit the asset checkpoint**

  Commit: `perf: normalize approved website assets`

## Task 3: Produce the eleven exact Scene artwork derivatives

**Files:**
- Create: `assets/images/scenes/galorent-minimal.webp`
- Create: `assets/images/scenes/phosphor-performance.webp`
- Create: `assets/images/scenes/reactor.webp`
- Create: `assets/images/scenes/apex.webp`
- Create: `assets/images/scenes/mainframe.webp`
- Create: `assets/images/scenes/foundry.webp`
- Create: `assets/images/scenes/datastream.webp`
- Create: `assets/images/scenes/orbital.webp`
- Create: `assets/images/scenes/lab-instrument.webp`
- Create: `assets/images/scenes/command.webp`
- Create: `assets/images/scenes/neural.webp`
- Modify: `assets/images/ASSET_PROVENANCE.md`
- Modify: `scripts/validate-site.mjs`

**Interfaces:**
- Consumes: `Scene_Mockup.png` for concepts 01-05 and `scene_mockup2.png` for concepts 06-11.
- Produces: one artwork-only, high-quality WebP per exact concept name for Tasks 5 and 7.

- [ ] **Step 1: Add the exact Scene manifest assertion**

  Require all eleven filenames exactly once in the provenance record and verify each file decodes to positive dimensions.
  Run: `node scripts/validate-site.mjs`
  Expected: FAIL listing eleven missing Scene files.

- [ ] **Step 2: Crop concepts 01-05**

  Crop only the framed artwork areas for GALORENT Minimal, Phosphor Performance, Reactor, Apex, and Mainframe from `Scene_Mockup.png`; exclude the source sheet's surrounding captions and neighboring panels.

- [ ] **Step 3: Crop concepts 06-11**

  Crop only the framed artwork areas for Foundry, Datastream, Orbital, Lab Instrument, Command, and Neural from `scene_mockup2.png`; exclude captions and neighboring panels.

- [ ] **Step 4: Encode and record derivatives**

  Preserve native crop size, sRGB output, and crisp UI/text detail. Record each crop rectangle and output dimensions in provenance.

- [ ] **Step 5: Perform the eleven-name visual audit**

  Inspect every output beside its source sheet and confirm exact name-to-image mapping, no clipped frame edges, no source captions, and no generated/repainted content.

- [ ] **Step 6: Verify and commit**

  Run: `node scripts/validate-site.mjs`
  Expected: PASS for the exact Scene asset manifest.
  Commit: `assets: add approved Scene concept artwork`

## Task 4: Normalize the shared Technical Grid system and global shell

**Files:**
- Modify: `assets/site.css`
- Modify: `assets/site.js`
- Modify: all 18 HTML files listed under **Existing pages**
- Modify: `scripts/validate-site.mjs`

**Interfaces:**
- Consumes: stable asset URLs from Tasks 2-3.
- Produces: shared tokens/components, consistent header/footer/status semantics, and accessible mobile navigation for every page.

- [ ] **Step 1: Add global-shell assertions**

  Validate skip link, one primary navigation landmark, one footer, exactly one correct `aria-current="page"` item where applicable, shared stylesheet/script references, and no inline style or script blocks.
  Run: `node scripts/validate-site.mjs`
  Expected: FAIL only for pages that do not yet satisfy the normalized shell contract.

- [ ] **Step 2: Format and organize the stylesheet**

  Preserve one CSS file but organize it into tokens, base, shell, components, page systems, responsive rules, and reduced-motion rules. Remove obsolete repeated Scene-placeholder selectors only after Task 5 replaces their markup.

- [ ] **Step 3: Lock the shared visual tokens**

  Define the near-black/graphite/silver/amber Technical Grid system, edition accents, spacing scale, readable measure, responsive type scale, border/elevation hierarchy, status colors, and visible focus treatment.

- [ ] **Step 4: Normalize headers and footers**

  Apply consistent header height, brand treatment, active navigation, mobile tap targets, footer layout, and status notice across every route without changing navigation destinations.

- [ ] **Step 5: Harden the mobile menu**

  Preserve `aria-expanded`, close on Escape, close after selecting a navigation link, restore focus to the Menu button after Escape, and perform no other site behavior.

- [ ] **Step 6: Verify shared behavior**

  Run: `node scripts/validate-site.mjs` and inspect `/`, `/spd/`, and `/account/` at desktop and 390-pixel mobile widths.
  Expected: PASS; keyboard focus remains visible and no horizontal overflow occurs.

- [ ] **Step 7: Commit the shared-system checkpoint**

  Commit: `style: unify GALORENT technical grid system`

## Task 5: Replace Scene placeholders and upgrade the Store direction

**Files:**
- Modify: `spd/scenes/index.html`
- Modify: `store/index.html`
- Modify: `assets/site.css`
- Modify: `scripts/validate-site.mjs`

**Interfaces:**
- Consumes: eleven `/assets/images/scenes/*.webp` files.
- Produces: real artwork cards on `/spd/scenes/` and honest concept-led visual groupings on `/store/`.

- [ ] **Step 1: Add Scene-page assertions**

  Require all eleven exact image paths and names on `/spd/scenes/`, forbid the old synthetic classes/background selectors, and require Concept/Development Direction text for every artwork card.
  Run: `node scripts/validate-site.mjs`
  Expected: FAIL against the repeated CSS placeholders.

- [ ] **Step 2: Rebuild the Scene concept cards**

  Use semantic article/figure markup with a consistent artwork frame, exact existing name, preserved description, and explicit direction label. Keep `More to come` as the only restrained no-artwork card.

- [ ] **Step 3: Set responsive Scene hierarchy**

  Use three columns on wide desktop, two at tablet/narrow desktop, and one on mobile. Preserve artwork aspect ratio and ensure names/descriptions are readable without overlaying critical artwork.

- [ ] **Step 4: Upgrade Store concept presentation**

  Reuse the same Scene files in the existing groupings without adding prices, purchase controls, download claims, availability, or new ownership doctrine.

- [ ] **Step 5: Visually verify all eleven concepts**

  Inspect `/spd/scenes/` and `/store/` at 1440, 768, 390, and 360 widths. Confirm no repeated placeholder treatment, clipped artwork, mismatched names, or released-product implication.

- [ ] **Step 6: Verify and commit**

  Run: `node scripts/validate-site.mjs`
  Expected: PASS for Scene manifest and status rules.
  Commit: `feat: present approved SPD Scene concepts`

## Task 6: Integrate the approved SPD and edition identities

**Files:**
- Modify: `spd/index.html`
- Modify: `spd/editions/index.html`
- Modify: `spd/free/index.html`
- Modify: `spd/pro/index.html`
- Modify: `spd/service/index.html`
- Modify: `spd/corporate/index.html`
- Modify: `spd/laboratory/index.html`
- Modify: `spd/how-it-works/index.html`
- Modify: `spd/compatibility/index.html`
- Modify: `assets/site.css`
- Modify: `scripts/validate-site.mjs`

**Interfaces:**
- Consumes: exact Instrument Aperture lockup, family strip, edition marks, and approved product evidence.
- Produces: one coherent SPD product presentation with five separate editions over one shared platform.

- [ ] **Step 1: Add identity-doctrine assertions**

  Require separate Free and Pro links/pages, the correct edition asset on each page, shared amber identity for Free/Pro, cyan Service, green Corporate, violet Laboratory, and no `Consumer edition` product copy.
  Run: `node scripts/validate-site.mjs`
  Expected: FAIL for the current generic/text-only presentation.

- [ ] **Step 2: Upgrade the main SPD hero and evidence gallery**

  Replace the CSS/text product mark with the approved Instrument Aperture identity. Preserve the existing headline, product narrative, status progression, and real evidence. Keep each 720 x 464 capture at or below 720 CSS pixels.

- [ ] **Step 3: Upgrade edition overview presentation**

  Use the supplied family identity and five separate edition cards. Preserve existing public status and audience wording; add no feature quota, comparison promise, pricing, or availability.

- [ ] **Step 4: Upgrade all five edition pages**

  Use the correct exact mark and accent for each page, a consistent edition-detail structure, and current approved copy. Free and Pro must remain visibly distinct pages despite sharing amber.

- [ ] **Step 5: Align supporting SPD pages**

  Apply the normalized product hierarchy to How It Works and Compatibility while preserving architecture doctrine and support claims exactly.

- [ ] **Step 6: Record the screenshot limitation visibly in QA, not marketing copy**

  Do not retouch legacy `Consumer` pixels. Confirm the site does not enlarge them and record the replacement-source gap for the final report.

- [ ] **Step 7: Verify and commit**

  Run: `node scripts/validate-site.mjs` and visually inspect all nine SPD routes at desktop/tablet/mobile widths.
  Expected: PASS with correct edition mapping and unchanged claim boundaries.
  Commit: `feat: apply approved SPD edition identity`

## Task 7: Complete sitewide page production polish

**Files:**
- Modify: `index.html`
- Modify: `hardware/index.html`
- Modify: `company/index.html`
- Modify: `company/updates/index.html`
- Modify: `support/index.html`
- Modify: `account/index.html`
- Modify: `404.html`
- Modify: `assets/site.css`
- Modify: all indexed HTML files for normalized social metadata
- Modify: `scripts/validate-site.mjs`

**Interfaces:**
- Consumes: shared components and approved assets from Tasks 2-6.
- Produces: consistent funding/customer-facing hierarchy across the complete public site.

- [ ] **Step 1: Add metadata and image-delivery assertions**

  Require consistent Open Graph title/description/image/URL, valid favicon/apple-touch references, lazy loading below the fold, justified eager hero assets, and unique route metadata.
  Run: `node scripts/validate-site.mjs`
  Expected: FAIL listing metadata and loading gaps.

- [ ] **Step 2: Refine the homepage**

  Correct hero balance and first-viewport density; preserve funding story, SPD progression, real evidence, hardware evidence, and inquiry CTAs. Make the approved master identity and real product evidence the primary interest drivers.

- [ ] **Step 3: Refine Hardware and Company**

  Preserve Display Systems proof, Thermal Systems boundary, company stage, funding/partner/tester language, and current contact route. Normalize evidence framing and section transitions.

- [ ] **Step 4: Refine Updates, Support, Account, and 404**

  Give these restrained pages the same typography, spacing, status hierarchy, and shell quality without adding forms, tickets, login, authentication, or fake controls.

- [ ] **Step 5: Normalize social/document metadata**

  Add approved shared preview identity and exact route-specific titles/descriptions/canonicals. Do not change sitemap routes or claim language.

- [ ] **Step 6: Verify and commit**

  Run: `node scripts/validate-site.mjs` and visually inspect all routes at desktop and mobile widths.
  Expected: PASS for metadata, images, links, and route structure.
  Commit: `style: complete sitewide visual production pass`

## Task 8: Execute responsive, accessibility, and performance QA

**Files:**
- Modify as defects require: `assets/site.css`, `assets/site.js`, affected HTML files
- Modify: `scripts/validate-site.mjs`

**Interfaces:**
- Consumes: complete production candidate from Tasks 1-7.
- Produces: a regression-clean candidate with recorded desktop/tablet/mobile evidence.

- [ ] **Step 1: Add final invariants**

  Assert no data-image blobs, obsolete Scene placeholders, missing alt/dimensions, broken local assets, duplicate IDs, invalid fragments, unexpected route drift, or sitemap/canonical disagreement.

- [ ] **Step 2: Run structural regression**

  Run: `node scripts/validate-site.mjs`
  Expected: PASS with zero warnings designated as release-blocking.

- [ ] **Step 3: Run desktop visual QA**

  At 1440 x 1000 and a narrower laptop viewport, inspect every route. Check hierarchy, line length, image sharpness, card balance, section rhythm, focus styles, and zero console errors.

- [ ] **Step 4: Run tablet visual QA**

  At 768 x 1024, inspect every route for deliberate grid collapse, navigation behavior, artwork sizing, and no clipped copy.

- [ ] **Step 5: Run mobile visual QA**

  At 390 x 844 and 360-pixel width, inspect every route. Test menu open/close, Escape/focus return, link selection, tap targets, one-column reading order, and zero horizontal overflow.

- [ ] **Step 6: Run keyboard and reduced-motion QA**

  Navigate header, CTAs, cards/links, and footer without a pointer; confirm focus is always visible. Emulate reduced motion and confirm no required information depends on animation.

- [ ] **Step 7: Measure before/after delivery**

  Record total repository/page HTML size, data-image count, duplicate image bytes, image file sizes, and key route transfer behavior. Confirm improvement without sacrificing approved visual quality.

- [ ] **Step 8: Fix defects and rerun all gates**

  Make only bounded QA fixes, then repeat Steps 2-7 until green.

- [ ] **Step 9: Commit the QA checkpoint**

  Commit: `fix: close WEB-002 responsive and accessibility gaps`

## Task 9: Final review, evidence capture, push, and deployment verification

**Files:**
- Modify only if final verification exposes a defect.
- Create outside the published site: final-report desktop/mobile screenshot deliverables.

**Interfaces:**
- Consumes: regression-clean candidate.
- Produces: verified commit history, final SHA, live deployment evidence, and complete user report.

- [ ] **Step 1: Capture key desktop screenshots**

  Capture `/`, `/spd/`, `/spd/scenes/`, `/spd/editions/`, and `/hardware/` at 1440 x 1000 using the verified local server.

- [ ] **Step 2: Capture key mobile screenshots**

  Capture the same five routes at 390 x 844 and verify they match the inspected final state.

- [ ] **Step 3: Run the complete local verification**

  Run: `node scripts/validate-site.mjs`
  Expected: PASS. Also confirm no browser console errors across the key routes.

- [ ] **Step 4: Review the complete change history**

  Run: `git diff --check`, `git status --short`, `git log --oneline origin/main..HEAD`, and review `git diff --stat origin/main...HEAD` plus the complete diff.
  Expected: no whitespace errors, no untracked production files, no private-repository path/content, and only authorized WEB-002 changes.

- [ ] **Step 5: Confirm protected infrastructure files**

  Verify `CNAME` still contains only `galorent.com`, `.nojekyll` remains present, sitemap routes are unchanged except required metadata consistency, and no DNS/deployment strategy file was introduced.

- [ ] **Step 6: Create a final fix commit only if needed**

  If Step 3-5 required changes, rerun the complete gate and commit: `fix: finalize WEB-002 production QA`.

- [ ] **Step 7: Push the verified checkpoint**

  Push the completed `main` history to `origin/main` only after all local gates pass.

- [ ] **Step 8: Verify GitHub Pages**

  Confirm the Pages deployment succeeds. Check every sitemap URL returns the expected live page, asset requests succeed, canonical URLs remain on `https://galorent.com`, and `CNAME` behavior is unchanged. Do not change DNS or Pages configuration to obtain a pass.

- [ ] **Step 9: Deliver the final report**

  Include exact changed files, before/after summary, desktop/mobile screenshots, supplied-asset mapping, unresolved approval/source items, structural/responsive/accessibility/performance/deployment results, final commit SHA, commits created, and clean/dirty state.
