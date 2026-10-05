# galorent.com

Official public website for GALORENT, Inc. and GALORENT SPD.

## WEB-001

Static GALORENT Development Preview served through GitHub Pages.

- Semantic HTML
- Shared responsive CSS
- Minimal JavaScript
- No backend assumptions or secrets
- Explicit product-status labeling

Custom domain: `galorent.com`

GitHub Pages source: `main` → repository root.

## Local preview

Node.js is the only requirement. No package installation is needed.

```powershell
node scripts/validate-site.mjs
node scripts/serve-site.mjs --port 4173
```

Open `http://127.0.0.1:4173/` and stop the preview with `Ctrl+C`.
