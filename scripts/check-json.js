const fs = require("fs");
const path = require("path");

const root = process.cwd();
const targets = [
  "templates/index.json",
  "templates/product.json",
  "templates/page.custom-quote.json",
  "templates/collection.json",
  "sections/header-group.json",
  "sections/footer-group.json",
  "config/settings_schema.json",
  "config/settings_data.json",
  "package.json",
];

let failed = false;

for (const relativePath of targets) {
  const fullPath = path.join(root, relativePath);
  try {
    JSON.parse(fs.readFileSync(fullPath, "utf8"));
    console.log(`ok ${relativePath}`);
  } catch (error) {
    failed = true;
    console.error(`invalid ${relativePath}: ${error.message}`);
  }
}

if (failed) {
  process.exit(1);
}
