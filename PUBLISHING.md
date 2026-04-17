# Publishing LayerForge

This project is prepared for two publishing paths:

- direct Shopify CLI deployment from your machine
- GitHub-based deployment with GitHub Actions and optional Shopify GitHub theme integration

## 1. Local prerequisites

Install or confirm:

- Git
- a GitHub account and repository
- Shopify store access
- Shopify Theme Access password or Admin API token

Official references:

- Shopify CLI install: https://shopify.dev/docs/api/shopify-cli
- Theme environments: https://shopify.dev/docs/storefronts/themes/tools/cli/environments
- Theme push: https://shopify.dev/docs/api/shopify-cli/theme/theme-push
- Theme Access: https://shopify.dev/docs/storefronts/themes/tools/theme-access
- Shopify GitHub theme integration: https://shopify.dev/storefronts/themes/tools/github

## 2. Configure local Shopify environments

1. Copy `shopify.theme.toml.example` to `shopify.theme.toml`
2. Replace the store, password, and theme IDs
3. Use the npm scripts in `package.json`

Examples:

```powershell
npm run theme:package
npm run theme:push:dev
npm run theme:push:staging
npm run theme:push:prod
```

## 3. Create the GitHub repo

Once Git is installed:

```powershell
git init
git add .
git commit -m "Initial LayerForge Shopify theme and local app scaffold"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/layerforge-shopify-stack.git
git push -u origin main
```

## 4. GitHub repository secrets

Add these repository secrets:

- `SHOPIFY_STORE`
- `SHOPIFY_CLI_THEME_TOKEN`

Optional if you use a fixed remote theme:

- `SHOPIFY_THEME_ID`

## 5. GitHub Actions behavior

- pushes to `main` can deploy the theme
- manual workflow dispatch can push or publish based on inputs
- pull requests can still run packaging and validation checks

## 6. Shopify admin connection

If you prefer Shopify's GitHub integration for themes:

1. Upload the repository to GitHub
2. In Shopify admin go to `Online Store > Themes`
3. Click `Add theme > Connect from GitHub`
4. Select the repo and branch
5. Test by editing a theme setting and confirming the sync

This is a good fit when you want branch-based theme syncing directly from Shopify admin.
