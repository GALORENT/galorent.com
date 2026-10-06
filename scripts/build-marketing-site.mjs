import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const image = (src, alt, width, height, loading = "lazy", className = "") =>
  `<img${className ? ` class="${className}"` : ""} src="${src}" alt="${alt}" width="${width}" height="${height}" loading="${loading}" decoding="async">`;

const brandIcon = () => image("/assets/images/brand/galorent-g-icon-32.png", "GALORENT G emblem", 32, 32, "eager", "brand-icon");

const navFor = (active) => [
  ["SPD", "/spd/"], ["Hardware", "/hardware/"], ["Scenes", "/spd/scenes/"],
  ["Company", "/company/"], ["Support", "/support/"]
].map(([label, href]) => `<li><a href="${href}"${active === label ? ' aria-current="page"' : ""}>${label}</a></li>`).join("");

function shell({ route, title, description, active = "", body, bodyClass = "" }) {
  const canonical = `https://galorent.com${route}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#07090c">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="GALORENT">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://galorent.com/assets/images/brand/galorent-social-preview.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/assets/images/brand/galorent-g-icon-32.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="/assets/images/brand/galorent-g-icon-180.png" sizes="180x180">
  <link rel="stylesheet" href="/assets/site.css">
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>
<a class="skip" href="#main">Skip to content</a>
<div class="notice">GALORENT · TUCSON, ARIZONA · PRODUCTS IN DEVELOPMENT</div>
<header class="header"><div class="bar">
  <a class="brand" href="/" aria-label="GALORENT home">${brandIcon()}<span>GALORENT</span><b>.</b></a>
  <button class="navbtn" data-navbtn aria-expanded="false" aria-controls="nav">Menu</button>
  <nav id="nav" data-nav aria-label="Primary"><ul>${navFor(active)}</ul></nav>
</div></header>
<main id="main">${body}</main>
<footer><div class="foot">
  <div><a class="brand" href="/">${brandIcon()}<span>GALORENT</span><b>.</b></a><p class="meta">Hardware insight, in plain sight.<br>Built in Tucson, Arizona.</p></div>
  <div class="footlinks"><a href="/spd/">SPD</a><a href="/spd/scenes/">Scenes</a><a href="/spd/editions/">Editions</a><a href="/hardware/">Hardware</a><a href="/company/">Company</a><a href="/company/#contact">Contact</a></div>
  <p class="legal">© <span data-year>2026</span> GALORENT. Product names and marks are used to identify work in development.</p>
</div></footer>
<script src="/assets/site.js" defer></script>
</body></html>`;
}

const productShot = (file, alt, title, copy, tag = "WORKING BUILD") => `
<article class="product-shot">
  <figure>${image(`/assets/images/product/${file}`, alt, 720, 464)}</figure>
  <div><span class="microtag">${tag}</span><h3>${title}</h3><p>${copy}</p></div>
</article>`;

const sceneNames = [
  ["galorent-minimal.webp", "GALORENT Minimal", "A clean, restrained view built around the readings that matter."],
  ["phosphor-performance.webp", "Phosphor Performance", "Bright instrumentation for machines built to move."],
  ["reactor.webp", "Reactor", "Thermals, power, and load with an industrial pulse."],
  ["apex.webp", "Apex", "Competition-inspired precision without the visual noise."],
  ["mainframe.webp", "Mainframe", "Dense information shaped by classic terminal systems."],
  ["foundry.webp", "Foundry", "Heavy machinery, heat, and power translated into a Scene."],
  ["datastream.webp", "Datastream", "Machine activity expressed as motion and information."],
  ["orbital.webp", "Orbital", "A spacecraft-inspired command view of the system."],
  ["lab-instrument.webp", "Lab Instrument", "Traces and readouts for technical observation."],
  ["command.webp", "Command", "At-a-glance machine state with operations-room clarity."],
  ["neural.webp", "Neural", "A living visual network driven by machine behavior."]
];

const sceneCards = () => sceneNames.map(([file, name, copy], index) => `<article class="scene-card">
  <figure>${image(`/assets/images/scenes/${file}`, `${name} SPD Scene concept`, file === "apex.webp" ? 480 : 700, file === "apex.webp" ? 407 : 305)}</figure>
  <div><span class="scene-index">${String(index + 1).padStart(2, "0")}</span><span class="microtag">Concept Direction</span><h3>${name}</h3><p>${copy}</p></div>
</article>`).join("");

const pages = new Map();

pages.set("/", shell({
  route: "/", title: "GALORENT — Know Your Machine", description: "GALORENT is building SPD hardware-intelligence software and Display Systems that make PC behavior visible, testable, and understandable.",
  body: `
<section class="home-hero"><div class="grid-field" aria-hidden="true"></div><div class="wrap home-hero-inner">
  <div class="home-copy">
    <span class="kicker">HARDWARE INTELLIGENCE</span>
    <h1>Know your machine.</h1>
    <p class="hero-lede">GALORENT is building software and hardware that turn PC behavior into something you can see, test, and trust.</p>
    <div class="actions"><a class="btn primary" href="/spd/">Meet GALORENT SPD</a><a class="btn ghost" href="/hardware/">Explore Display Systems</a></div>
    <p class="availability">SPD and Display Systems are in active development. No purchase or download is being offered yet.</p>
  </div>
  <figure class="hero-machine">${image("/assets/images/hardware/display-systems-prototype.webp", "GALORENT Display Systems prototype showing live MIDNA telemetry", 720, 900, "eager")}<figcaption><b>DISPLAY SYSTEMS</b><span>Working prototype</span></figcaption></figure>
  <img class="hero-g" src="/assets/images/brand/galorent-master-dark.webp" alt="GALORENT metallic G emblem" width="1400" height="1056" loading="eager" decoding="async">
</div></section>
<section class="statement"><div class="wrap statement-inner"><span>THE IDEA</span><h2>A PC should be able to explain itself.</h2><p>Temperatures, clocks, power, cooling, history, and test results should tell one coherent story—not disappear into separate utilities and disconnected numbers.</p></div></section>
<section class="product-stage"><div class="wrap">
  <div class="section-intro"><span class="kicker">GALORENT SPD™</span><h2>From live readings to real understanding.</h2><p>SPD is being built to show what the machine is doing, remember how it behaved, and test how it responds.</p><a class="text-link" href="/spd/">Explore the software →</a></div>
  <div class="triple-promise"><article><b>01</b><h3>See it now.</h3><p>One readable view of the machine and the signals that define its current state.</p></article><article><b>02</b><h3>Know what changed.</h3><p>History turns a fleeting reading into behavior you can compare across time.</p></article><article><b>03</b><h3>Test the response.</h3><p>Controlled tests capture the machine before, during, and after load.</p></article></div>
  <div class="screen-stage">${image("/assets/images/product/spd-this-machine.webp", "GALORENT SPD This Machine screen", 720, 464)}${image("/assets/images/product/spd-history.webp", "GALORENT SPD History screen", 720, 464)}${image("/assets/images/product/spd-processor-load-response.webp", "GALORENT SPD Processor Load Response test", 720, 464)}</div>
</div></section>
<section class="scene-tease"><div class="wrap scene-tease-inner"><div><span class="kicker">SPD SCENES</span><h2>Make the machine unmistakably yours.</h2><p>Scenes turn live telemetry into a designed experience for the desktop or a dedicated in-case display.</p><a class="btn ghost" href="/spd/scenes/">Explore Scene concepts</a></div><div class="scene-triptych">${image("/assets/images/scenes/galorent-minimal.webp", "GALORENT Minimal Scene concept", 723, 428)}${image("/assets/images/scenes/reactor.webp", "Reactor Scene concept", 543, 407)}${image("/assets/images/scenes/neural.webp", "Neural Scene concept", 699, 287)}</div></div></section>
<section class="closing"><div class="wrap"><span class="kicker">BUILT IN TUCSON</span><h2>Software that understands the machine. Hardware that gives it a presence.</h2><div class="actions"><a class="btn primary" href="/company/">Meet GALORENT</a><a class="btn ghost" href="/company/#contact">Start a conversation</a></div></div></section>`
}));

pages.set("/spd/", shell({
  route: "/spd/", active: "SPD", bodyClass: "spd-page", title: "GALORENT SPD — Your PC, Made Understandable", description: "GALORENT SPD is PC hardware-intelligence software built to observe live behavior, preserve history, run controlled tests, and present the result clearly.",
  body: `
<section class="spd-hero-new"><div class="grid-field" aria-hidden="true"></div><div class="wrap spd-hero-new-inner"><div>
  ${image("/assets/images/spd/spd-instrument-aperture-free-pro.png", "GALORENT SPD Instrument Aperture identity", 1600, 533, "eager", "spd-lockup")}
  <h1>Your PC is always talking.<br>SPD makes it readable.</h1>
  <p class="hero-lede">Live behavior. Persistent history. Controlled tests. One clear view of what the machine is doing and how it responds.</p>
  <div class="actions"><a class="btn primary" href="#inside">See SPD</a><a class="btn ghost" href="/spd/how-it-works/">How it works</a></div>
  <p class="availability">Working Windows development build. Public release timing has not been announced.</p>
</div><div class="ui-stack">${image("/assets/images/product/spd-this-machine.webp", "GALORENT SPD This Machine development screen", 720, 464, "eager")} ${image("/assets/images/product/spd-processor-load-response.webp", "GALORENT SPD controlled test result", 720, 464, "eager")}</div></div></section>
<section class="statement dark"><div class="wrap statement-inner"><span>THE DIFFERENCE</span><h2>Numbers are easy. Context is hard.</h2><p>SPD is designed to connect the reading you see now with the machine it came from, what happened before it, and what changed after it.</p></div></section>
<section class="product-evidence" id="inside"><div class="wrap"><div class="section-intro"><span class="kicker">INSIDE SPD</span><h2>Built around questions people actually ask.</h2></div><div class="product-shot-grid">
${productShot("spd-this-machine.webp", "SPD This Machine view", "This Machine", "What hardware is here, and what is it doing right now?")}
${productShot("spd-history.webp", "SPD History view", "History", "Is this new, or has the machine been behaving this way for days?")}
${productShot("spd-processor-load-response.webp", "SPD Processor Load Response test", "Tests", "What happens under load—and does the system recover cleanly?")}
${productShot("spd-scenes-management.webp", "SPD Scenes management", "Scenes", "How should live machine intelligence look on your display?", "DEVELOPMENT BUILD")}
</div></div></section>
<section class="benefit-band"><div class="wrap benefit-grid"><article><span>LIVE</span><h3>Observe without decoding a wall of sensors.</h3></article><article><span>HISTORY</span><h3>Keep the moments that would otherwise disappear.</h3></article><article><span>TEST</span><h3>Change the question from “is it fast?” to “how did it respond?”</h3></article></div></section>
<section class="edition-promo"><div class="wrap edition-promo-inner"><div><span class="kicker">ONE SPD PLATFORM</span><h2>Start simple. Go as deep as the work demands.</h2><p>Free, Pro, Service, Corporate, and Laboratory / Engineering are different working contexts for the same platform.</p><a class="btn ghost" href="/spd/editions/">Explore editions</a></div>${image("/assets/images/spd/spd-edition-family.png", "GALORENT SPD edition identity family", 1600, 900)}</div></section>
<section class="closing"><div class="wrap"><span class="kicker">THE ROAD AHEAD</span><h2>Diagnostics and performance guidance are being built on the evidence SPD already captures.</h2><p>No invented scores. No unsupported promises. The product grows as the proof grows.</p><div class="actions"><a class="btn primary" href="/company/updates/">Follow development</a><a class="btn ghost" href="/spd/compatibility/">Compatibility direction</a></div></div></section>`
}));

pages.set("/spd/scenes/", shell({
  route: "/spd/scenes/", active: "Scenes", bodyClass: "scenes-page", title: "SPD Scenes — Make the Machine Yours | GALORENT", description: "Explore GALORENT SPD Scene concepts that turn live PC telemetry into distinctive display experiences.",
  body: `
<section class="scenes-hero"><div class="wrap scenes-hero-inner"><div><span class="kicker">GALORENT SPD SCENES</span><h1>Your machine shouldn’t look like everyone else’s.</h1><p class="hero-lede">Scenes turn live telemetry into a designed experience—minimal, industrial, cinematic, technical, or entirely personal.</p><p class="availability">The artwork below represents concept and development directions, not released downloads.</p></div><figure>${image("/assets/images/product/spd-scenes-management.webp", "GALORENT SPD Scenes management screen", 720, 464, "eager")}</figure></div></section>
<section class="scene-gallery"><div class="wrap"><div class="section-intro"><span class="kicker">THE COLLECTION IN DEVELOPMENT</span><h2>One machine. Many ways to see it.</h2><p>Every Scene is designed to respond to real SPD telemetry while keeping its own visual character.</p></div><div class="scene-grid">${sceneCards()}</div></div></section>
<section class="scene-product"><div class="wrap scene-product-inner"><figure>${image("/assets/images/product/spd-scenes-management.webp", "SPD Scenes management screen", 720, 464)}</figure><div><span class="kicker">MANAGED IN SPD</span><h2>Choose the experience. Keep the readings honest.</h2><p>Scenes are selected and managed inside SPD. They change the display—not the measurements underneath it.</p><a class="btn primary" href="/store/">See the Store direction</a></div></div></section>`
}));

pages.set("/spd/how-it-works/", shell({
  route: "/spd/how-it-works/", active: "SPD", title: "How GALORENT SPD Works", description: "See how GALORENT SPD moves from live PC readings to history, controlled testing, and understandable results.",
  body: `
<section class="simple-hero"><div class="wrap narrow"><span class="kicker">HOW SPD WORKS</span><h1>See. Remember. Test. Understand.</h1><p class="hero-lede">SPD is being built around a simple idea: a useful answer needs more than a live number.</p></div></section>
<section class="number-story"><div class="wrap"><article><b>01</b><div><h2>See the machine.</h2><p>SPD discovers the system and presents live behavior in a readable context.</p></div></article><article><b>02</b><div><h2>Remember what happened.</h2><p>History preserves change across sessions so a problem does not vanish with the window.</p></div></article><article><b>03</b><div><h2>Test a question.</h2><p>Controlled tests observe the machine before, during, and after a defined workload.</p></div></article><article><b>04</b><div><h2>Build an answer.</h2><p>Diagnostics and performance guidance will use that shared evidence instead of inventing a separate truth.</p></div></article></div></section>
<section class="closing"><div class="wrap"><h2>One machine. One record of what it actually did.</h2><div class="actions"><a class="btn primary" href="/spd/">Explore SPD</a><a class="btn ghost" href="/spd/editions/">Explore editions</a></div></div></section>`
}));

pages.set("/spd/compatibility/", shell({
  route: "/spd/compatibility/", active: "SPD", title: "SPD Compatibility | GALORENT", description: "GALORENT SPD compatibility is expanded through hardware validation, truthful availability, and provider-based support.",
  body: `
<section class="simple-hero"><div class="wrap narrow">${image("/assets/images/spd/spd-instrument-aperture-free-pro.png", "GALORENT SPD identity", 1600, 533, "eager", "mini-lockup")}<span class="kicker">COMPATIBILITY</span><h1>Built for Windows PCs. Expanded through proof.</h1><p class="hero-lede">SPD will identify what it can read, what it cannot, and where support depends on hardware, firmware, or privileged access.</p></div></section>
<section class="plain-section"><div class="wrap card-grid"><article><span class="microtag">FOUNDATION</span><h2>Windows 11</h2><p>The current development platform targets modern Windows systems.</p></article><article><span class="microtag">HARDWARE</span><h2>PC components</h2><p>Processor, graphics, memory, storage, cooling, and platform support grows through validation.</p></article><article><span class="microtag">TRUTHFUL STATE</span><h2>Unavailable means unavailable.</h2><p>SPD is designed to say when a reading cannot be obtained rather than manufacture a value.</p></article></div></section>
<section class="closing"><div class="wrap"><h2>Broad support matters. Honest support matters more.</h2><p>A detailed validated-hardware list will arrive with release readiness.</p></div></section>`
}));

const editionData = [
  ["/spd/free/", "Free", "Start with a clearer view of your PC.", "The entry point to SPD for people who want useful hardware visibility without learning to read a sensor dump.", "/assets/images/spd/spd-mark-free-pro.png", 960, 960, "amber"],
  ["/spd/pro/", "Pro", "Go deeper into the machine you built.", "For enthusiasts who want more history, testing, interpretation, and control over how machine intelligence is presented.", "/assets/images/spd/spd-mark-free-pro.png", 960, 960, "amber"],
  ["/spd/service/", "Service", "Turn machine evidence into a better service conversation.", "A professional workflow direction for technicians who need repeatable tests, clear findings, and evidence they can explain.", "/assets/images/spd/spd-mark-service.png", 418, 355, "cyan"],
  ["/spd/corporate/", "Corporate", "Understand more machines without losing the individual one.", "An organizational direction for consistent visibility, evidence, and fleet-aware hardware intelligence.", "/assets/images/spd/spd-mark-corporate.png", 418, 355, "green"],
  ["/spd/laboratory/", "Laboratory / Engineering", "Measure the experiment, not just the computer.", "The deepest SPD direction for advanced instrumentation, prototype hardware, controlled trials, and engineering evidence.", "/assets/images/spd/spd-mark-laboratory.png", 418, 355, "violet"]
];

pages.set("/spd/editions/", shell({
  route: "/spd/editions/", active: "SPD", title: "GALORENT SPD Editions", description: "Explore SPD Free, Pro, Service, Corporate, and Laboratory / Engineering—five working contexts for one hardware-intelligence platform.",
  body: `
<section class="edition-overview"><div class="wrap"><span class="kicker">SPD EDITIONS</span><h1>Start free. Go as deep as the work demands.</h1><p class="hero-lede">Five ways to work. One clear view of the machine.</p>${image("/assets/images/spd/spd-edition-family.png", "SPD Free and Pro, Service, Corporate, and Laboratory edition identities", 1600, 900, "eager")}</div></section>
<section class="edition-list"><div class="wrap">${editionData.map(([route, name, headline, copy, mark, width, height, color], i) => `<a class="edition-row ${color}" href="${route}"><span>${String(i + 1).padStart(2, "0")}</span>${image(mark, `SPD ${name} identity`, width, height)}<div><h2>${name}</h2><h3>${headline}</h3><p>${copy}</p></div><b>Explore →</b></a>`).join("")}</div></section>
<section class="closing"><div class="wrap"><h2>Edition details are still being finalized.</h2><p>No pricing, feature limits, or release dates have been announced.</p></div></section>`
}));

for (const [route, name, headline, copy, mark, width, height, color] of editionData) {
  pages.set(route, shell({
    route, active: "SPD", bodyClass: `edition-page ${color}`, title: `SPD ${name} | GALORENT`, description: `GALORENT SPD ${name}: ${copy}`,
    body: `<section class="edition-hero-new"><div class="wrap edition-hero-new-inner"><div><span class="kicker">GALORENT SPD</span><h1>${headline}</h1><p class="hero-lede">${copy}</p><p class="availability">Product scope, availability, and pricing are still in development.</p><div class="actions"><a class="btn primary" href="/spd/">Explore SPD</a><a class="btn ghost" href="/spd/editions/">All editions</a></div></div><figure>${image(mark, `SPD ${name} identity`, width, height, "eager")}<figcaption>${name}</figcaption></figure></div></section>
<section class="plain-section"><div class="wrap value-points"><article><b>01</b><h2>One trusted foundation.</h2><p>Every edition reads the same machine. Deeper tools do not change the facts underneath them.</p></article><article><b>02</b><h2>Built for the work.</h2><p>${name} shapes SPD around the person using it and the questions they need to answer.</p></article><article><b>03</b><h2>Published when proven.</h2><p>Final capabilities will be announced only after they are implemented and validated.</p></article></div></section>`
  }));
}

pages.set("/hardware/", shell({
  route: "/hardware/", active: "Hardware", title: "GALORENT Display Systems", description: "GALORENT Display Systems are being developed to give live SPD Scenes a deliberate physical home inside the PC.",
  body: `
<section class="hardware-hero-new"><div class="grid-field" aria-hidden="true"></div><div class="wrap hardware-hero-new-inner"><div><span class="kicker">GALORENT DISPLAY SYSTEMS</span><h1>Turn the machine into the display.</h1><p class="hero-lede">A dedicated home for SPD Scenes and live hardware intelligence—built into the PC instead of floating on another monitor.</p><div class="actions"><a class="btn primary" href="/spd/scenes/">See Scenes</a><a class="btn ghost" href="/company/#contact">Discuss the project</a></div><p class="availability">Working prototype. Final hardware, compatibility, pricing, and release timing have not been announced.</p></div><figure>${image("/assets/images/hardware/display-systems-prototype.webp", "GALORENT Display Systems working prototype", 720, 900, "eager")}<figcaption>WORKING PROTOTYPE · LIVE SPD TELEMETRY</figcaption></figure></div></section>
<section class="statement"><div class="wrap statement-inner"><span>WHY IT EXISTS</span><h2>The PC is already a visual object. Its intelligence should belong there too.</h2><p>Display Systems is being developed to make machine state visible without turning the experience into a desk full of utility windows.</p></div></section>
<section class="plain-section"><div class="wrap triple-promise"><article><b>01</b><h3>Purpose-built</h3><p>Designed around SPD Scenes rather than adapted from a generic secondary monitor.</p></article><article><b>02</b><h3>Always relevant</h3><p>Live telemetry has a persistent place inside the machine environment.</p></article><article><b>03</b><h3>Visually personal</h3><p>The same hardware can carry minimal, technical, cinematic, or creator-led Scene directions.</p></article></div></section>
<section class="scene-tease"><div class="wrap scene-tease-inner"><div><span class="kicker">POWERED BY SPD SCENES</span><h2>The display changes with the machine—and with the person who built it.</h2><a class="btn ghost" href="/spd/scenes/">Explore the visual directions</a></div><div class="scene-triptych">${image("/assets/images/scenes/apex.webp", "Apex Scene concept", 480, 407)}${image("/assets/images/scenes/orbital.webp", "Orbital Scene concept", 698, 267)}${image("/assets/images/scenes/command.webp", "Command Scene concept", 698, 287)}</div></div></section>`
}));

pages.set("/store/", shell({
  route: "/store/", active: "Scenes", title: "GALORENT Scene Store — Development Direction", description: "Preview the planned GALORENT Scene ecosystem. No purchases, downloads, or subscriptions are currently available.",
  body: `
<section class="simple-hero"><div class="wrap narrow"><span class="kicker">SCENE STORE</span><h1>A future home for how your machine looks.</h1><p class="hero-lede">The Store is planned as the place to discover GALORENT, creator, partner, seasonal, and specialty Scenes.</p><p class="availability">No purchases, downloads, subscriptions, or accounts are available today.</p></div></section>
<section class="store-art"><div class="wrap"><div class="store-mosaic">${sceneNames.slice(0, 6).map(([file, name]) => `<figure>${image(`/assets/images/scenes/${file}`, `${name} Scene concept`, 700, 305)}<figcaption>${name}<span>Concept Direction</span></figcaption></figure>`).join("")}</div></div></section>
<section class="closing"><div class="wrap"><h2>Scenes should expand expression—not lock the platform behind decoration.</h2><p>Final ownership, licensing, and commerce details remain in development.</p></div></section>`
}));

pages.set("/company/", shell({
  route: "/company/", active: "Company", title: "About GALORENT — Built in Tucson", description: "GALORENT is a Tucson technology company in development, building PC hardware-intelligence software and integrated display systems.",
  body: `
<section class="company-hero"><div class="wrap company-hero-inner"><div><span class="kicker">TUCSON, ARIZONA</span><h1>Building a clearer relationship between people and their machines.</h1><p class="hero-lede">GALORENT is developing software and hardware for people who want to understand the systems they build, use, repair, and push further.</p></div>${image("/assets/images/brand/galorent-master-dark.webp", "GALORENT G emblem", 1400, 1056, "eager")}</div></section>
<section class="statement"><div class="wrap statement-inner"><span>OUR FOCUS</span><h2>Make complex hardware behavior useful without making it shallow.</h2><p>The goal is not another dashboard full of numbers. It is a platform that can grow from everyday PC understanding to professional service and engineering work without losing the evidence underneath.</p></div></section>
<section class="plain-section"><div class="wrap company-focus"><article><span class="microtag">SOFTWARE</span><h2>GALORENT SPD</h2><p>Hardware intelligence for observation, history, controlled testing, diagnostics, performance, and visual Scenes.</p><a class="text-link" href="/spd/">Explore SPD →</a></article><article><span class="microtag">HARDWARE</span><h2>Display Systems</h2><p>Purpose-built physical surfaces for SPD Scenes and live machine intelligence.</p><a class="text-link" href="/hardware/">Explore Hardware →</a></article></div></section>
<section class="contact-section" id="contact"><div class="wrap contact-inner"><div><span class="kicker">CONTACT</span><h2>Funding, manufacturing, testing, and strategic conversations are welcome.</h2><p>GALORENT is still in development. If this site was shared with you directly, continue through that conversation while the public contact channel is established.</p></div><a class="btn primary" href="https://github.com/GALORENT">GALORENT on GitHub</a></div></section>`
}));

pages.set("/company/updates/", shell({
  route: "/company/updates/", active: "Company", title: "GALORENT Development Updates", description: "Follow verified progress across GALORENT SPD software, Scene design, and Display Systems development.",
  body: `<section class="simple-hero"><div class="wrap narrow"><span class="kicker">DEVELOPMENT UPDATES</span><h1>Progress, shown honestly.</h1><p class="hero-lede">This page tracks visible product progress without turning plans into promises.</p></div></section><section class="update-list"><div class="wrap"><article><span>SPD</span><h2>A working Windows product is taking shape.</h2><p>Machine discovery, live telemetry, persistent History, the first controlled test workflow, and Scene management have working product evidence.</p></article><article><span>DISPLAY SYSTEMS</span><h2>The physical concept is operating with live telemetry.</h2><p>The current prototype demonstrates SPD Scenes inside the PC environment while final hardware design remains open.</p></article><article><span>SCENES</span><h2>The visual language is expanding.</h2><p>Eleven concept families are defining the range from minimal instrumentation to expressive, artwork-driven displays.</p></article></div></section>`
}));

pages.set("/support/", shell({
  route: "/support/", active: "Support", title: "GALORENT Support", description: "GALORENT products are still in development. Find current project, compatibility, and contact information here.",
  body: `<section class="simple-hero"><div class="wrap narrow"><span class="kicker">SUPPORT</span><h1>Support will launch with the product.</h1><p class="hero-lede">SPD and Display Systems are not publicly released, so there is no customer installation, license, or account support to request yet.</p></div></section><section class="plain-section"><div class="wrap support-links"><a href="/spd/"><span>PRODUCT</span><h2>Explore SPD</h2><p>See the working software and current direction.</p></a><a href="/spd/compatibility/"><span>COMPATIBILITY</span><h2>Support direction</h2><p>Understand how hardware support will be validated.</p></a><a href="/company/updates/"><span>PROGRESS</span><h2>Development updates</h2><p>Follow what is real today.</p></a><a href="/company/#contact"><span>CONTACT</span><h2>Reach GALORENT</h2><p>For funding, testing, manufacturing, and partnership conversations.</p></a></div></section>`
}));

pages.set("/account/", shell({
  route: "/account/", title: "GALORENT Account — Coming With Release", description: "GALORENT account services are not yet available. No login, subscription, or account creation is currently offered.",
  body: `<section class="simple-hero"><div class="wrap narrow"><span class="kicker">GALORENT ACCOUNT</span><h1>No fake login. No empty portal.</h1><p class="hero-lede">Account services will appear when there is a released product and a real reason to use them.</p><p class="availability">There is currently no account creation, subscription, purchase, or download flow.</p><div class="actions"><a class="btn primary" href="/company/updates/">Follow development</a><a class="btn ghost" href="/spd/">Explore SPD</a></div></div></section>`
}));

pages.set("/404.html", shell({
  route: "/404.html", title: "Page Not Found | GALORENT", description: "The requested GALORENT page could not be found.",
  body: `<section class="simple-hero error-page"><div class="wrap narrow"><span class="kicker">404</span><h1>This signal went nowhere.</h1><p class="hero-lede">The page may have moved, or the address may be incorrect.</p><div class="actions"><a class="btn primary" href="/">Return home</a><a class="btn ghost" href="/spd/">Explore SPD</a></div></div></section>`
}));

for (const [route, html] of pages) {
  const relative = route === "/" ? "index.html" : route.endsWith("/") ? `${route.slice(1)}index.html` : route.slice(1);
  const filename = path.join(root, relative);
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(filename, `${html}\n`, "utf8");
}

console.log(`Built ${pages.size} marketing pages.`);
