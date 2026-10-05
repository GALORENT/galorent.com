# GALORENT Website Asset Provenance

This register records the source and transformation of every production visual introduced during WEB-002. No listed identity, product, hardware, or Scene artwork was regenerated or repainted for the website.

## Brand and SPD identity

| Output | Source | Source size | Operation | Output size | Status / use |
|---|---|---:|---|---:|---|
| `brand/galorent-master-dark.webp` | `GALORENT-SPD-Consumer-Brand-Package-v1.0-FINAL/01_Master_Emblem/galorent-g-master-dark-4096.png` | 4096×4096 | Proportional downscale; high-quality WebP | 1400×1400 | Approved Identity; master-brand presentation |
| `brand/galorent-g-icon-32.png` | same master | 4096×4096 | Proportional downscale; PNG | 32×32 | Approved Identity; favicon-sized use |
| `brand/galorent-g-icon-180.png` | same master | 4096×4096 | Proportional downscale; PNG | 180×180 | Approved Identity; touch icon |
| `brand/galorent-social-preview.jpg` | same master | 4096×4096 | Proportional downscale centered on unchanged near-black field | 1200×630 | Approved Identity; social metadata |
| `spd/spd-instrument-aperture-free-pro.png` | `Images/spd-logo-free-pro.png` | 2172×724 | Proportional downscale; PNG | 1600×533 | Approved Identity; SPD Free + Pro lockup |
| `spd/spd-edition-family.png` | `Images/ChatGPT Image Sep 30, 2026, 09_48_41 PM.png` | 2172×724 | Proportional downscale; PNG | 1600×533 | Approved Identity; full edition family |
| `spd/spd-mark-free-pro.png` | `Images/ChatGPT Image Sep 30, 2026, 09_48_24 PM.png` | 1254×1254 | Proportional downscale; PNG | 960×960 | Approved Identity; amber Instrument Aperture |
| `spd/spd-mark-service.png` | approved edition-family source | 2172×724 | Crop `(618,100)–(1036,455)`; PNG | 418×355 | Approved Identity; cyan Instrument Aperture |
| `spd/spd-mark-corporate.png` | approved edition-family source | 2172×724 | Crop `(1161,100)–(1579,455)`; PNG | 418×355 | Approved Identity; green Instrument Aperture |
| `spd/spd-mark-laboratory.png` | approved edition-family source | 2172×724 | Crop `(1704,100)–(2122,455)`; PNG | 418×355 | Approved Identity; violet Instrument Aperture |

The SPD mark remains a product identifier. The GALORENT G remains the application, taskbar, and system-tray master icon.

## Product and hardware evidence

| Output | Source | Operation | Output size | Status / use |
|---|---|---|---:|---|
| `product/spd-this-machine.webp` | WEB-001 embedded approved capture | Byte-exact extraction; no retouching or upscaling | 720×464 | Current Product Evidence; This Machine |
| `product/spd-history.webp` | WEB-001 embedded approved capture | Byte-exact extraction; no retouching or upscaling | 720×464 | Current Product Evidence; History |
| `product/spd-processor-load-response.webp` | WEB-001 embedded approved capture | Byte-exact extraction; no retouching or upscaling | 720×464 | Current Product Evidence; Tests |
| `product/spd-scenes-management.webp` | WEB-001 embedded approved capture | Byte-exact extraction; no retouching or upscaling | 720×464 | Development Build; Scenes management |
| `hardware/display-systems-prototype.webp` | WEB-001 embedded cleaned prototype evidence | Byte-exact extraction; no retouching or upscaling | 720×900 | Current Product Evidence; Display Systems prototype |

The four SPD captures contain truthful pixels from the approved development build, including legacy terminology present in that build. They are deliberately displayed at no more than 720 CSS pixels. Native recording sources were not located during WEB-002, so these approved derivatives remain the highest verified sources and that replacement opportunity remains open.

## Scene concept artwork

All Scene derivatives are artwork-only crops from the supplied concept sheets. They are Concept Direction or Development Direction—not released, downloadable, or promised product.

| Output | Source | Crop rectangle | Output size | Status |
|---|---|---:|---:|---|
| `scenes/galorent-minimal.webp` | `Images/Scene_Mockup.png` (1536×1024) | `(16,17)–(739,445)` | 723×428 | Concept Direction |
| `scenes/phosphor-performance.webp` | same | `(772,14)–(1516,452)` | 744×438 | Concept Direction |
| `scenes/reactor.webp` | same | `(16,532)–(559,939)` | 543×407 | Concept Direction |
| `scenes/apex.webp` | same | `(570,532)–(1050,939)` | 480×407 | Concept Direction |
| `scenes/mainframe.webp` | same | `(1063,532)–(1521,939)` | 458×407 | Concept Direction |
| `scenes/foundry.webp` | `Images/scene_mockup2.png` (1448×1086) | `(16,8)–(714,313)` | 698×305 | Development Direction |
| `scenes/datastream.webp` | same | `(734,8)–(1434,313)` | 700×305 | Development Direction |
| `scenes/orbital.webp` | same | `(16,383)–(714,650)` | 698×267 | Development Direction |
| `scenes/lab-instrument.webp` | same | `(735,383)–(1434,650)` | 699×267 | Development Direction |
| `scenes/command.webp` | same | `(16,723)–(714,1010)` | 698×287 | Development Direction |
| `scenes/neural.webp` | same | `(735,723)–(1434,1010)` | 699×287 | Development Direction |

WEB-002 visually checked all eleven outputs against their labeled source panels. Crops retain the artwork frame, exclude the source captions and neighboring panels, and contain no generated or repainted content.
