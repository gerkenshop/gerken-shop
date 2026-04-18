# LayerForge Shopify Theme

This folder contains a Shopify Online Store 2.0 theme tailored to a 3D printing and fabrication business, plus a lightweight Node backend scaffold for quote capture and pricing-preview logic.

## What is implemented

- custom home page with bold hero and category strip
- featured collection merchandising
- custom product page with:
  - variant chips
  - finish selector
  - lead-time selector
  - line-item note field
  - trust blocks for material guidance and turnaround
- custom quote page using Shopify contact form handling
- collection page with native Shopify sort support
- cohesive brand styling tuned for a 3D business

## Theme structure

- `layout/theme.liquid`
- `templates/index.json`
- `templates/product.json`
- `templates/collection.json`
- `templates/page.custom-quote.json`
- `sections/*.liquid`
- `assets/base.css`
- `assets/theme.js`
- `config/settings_schema.json`
- `app/server.js`
- `.env.example`
- `package.json`
- `shopify.theme.toml.example`
- `.github/workflows/*.yml`

## Recommended Shopify setup

1. Create collections such as `home-organization`, `gaming`, `workshop`, and `business`.
2. Add product metafields:
   - `custom.material_guide`
   - `custom.lead_time`
3. Create a page with the template `page.custom-quote`.
4. Upload this theme with Shopify CLI when available.

You can also prepare per-environment CLI settings by copying `shopify.theme.toml.example` to `shopify.theme.toml`.

## Local backend scaffold

You can run the lightweight backend with:

```powershell
cd C:\Users\henri\Documents\Codex\2026-04-18-doctype-html-html-lang-de-head
node app/server.js
```

Or use:

- `start-preview.cmd`
- `start-preview.ps1`

Endpoints:

- `GET /api/health`
- `POST /api/quote`
- `POST /api/configure`

Open the local UI preview at:

- `http://localhost:8787/`
- `http://localhost:8787/preview`

Preview files:

- `preview/index.html`
- `preview/preview.css`
- `preview/preview.js`
- `scripts/init-repo.ps1`
- `scripts/deploy-theme.ps1`

## Shopify CLI commands

After configuring `shopify.theme.toml`, you can use:

```powershell
npm run theme:package
npm run theme:push:dev
npm run theme:push:staging
npm run theme:push:prod
```

Publishing guidance is in `PUBLISHING.md`.

Helper scripts:

- `powershell -ExecutionPolicy Bypass -File .\scripts\init-repo.ps1 -RemoteUrl https://github.com/YOUR_ACCOUNT/YOUR_REPO.git`
- `powershell -ExecutionPolicy Bypass -File .\scripts\deploy-theme.ps1 -Environment staging`

GitHub Actions now use a safer flow:

- `Theme Quality` runs automatically on pushes and pull requests
- `Deploy Shopify Theme` runs only when triggered manually and required Shopify secrets exist

This is not a full embedded Shopify app yet. It is the local scaffold you can extend into:

- a Shopify app proxy endpoint
- a quote management backend
- dynamic pricing logic via Shopify Functions or cart transforms

## Next steps for a fuller app

- add file upload for STL/STEP requests through an app proxy or external storage flow
- use Shopify Functions or an app to apply dynamic surcharges for finish and rush production
- wire quotes into email, HubSpot, Airtable, or a CRM
- add customer account workflows for repeat B2B buyers
