const demoProducts = [
  {
    name: "Modular Desk Dock",
    category: "Home",
    material: "PETG",
    price: 24.9,
    description: "Cable management, phone stand, and parts tray for modern workstations.",
  },
  {
    name: "Miniature Terrain Set",
    category: "Gaming",
    material: "Resin",
    price: 38,
    description: "High-detail tabletop terrain kit for creators and specialty stores.",
  },
  {
    name: "RC Chassis Kit",
    category: "Workshop",
    material: "Nylon CF",
    price: 159,
    description: "Structural lightweight component set for custom RC builds and niche resellers.",
  },
  {
    name: "Logo Display Sign",
    category: "Business",
    material: "PLA",
    price: 58,
    description: "Layered brand signage for desks, booths, and showroom displays.",
  },
  {
    name: "Jig Fixture Block",
    category: "Workshop",
    material: "ASA",
    price: 94,
    description: "Low-volume manufacturing aid for repetitive tasks and alignment setups.",
  },
  {
    name: "Custom STL Review",
    category: "Custom",
    material: "Service",
    price: 29,
    description: "Paid preflight review for customer files before production and optimization.",
  },
];

function formatEUR(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function renderProducts() {
  const grid = document.querySelector("#product-grid");
  grid.innerHTML = "";

  demoProducts.forEach((product) => {
    const article = document.createElement("article");
    article.className = "product-card";
    article.innerHTML = `
      <div class="product-visual"></div>
      <div class="product-content">
        <div class="product-meta">
          <span class="chip">${product.category}</span>
          <span class="chip">${product.material}</span>
        </div>
        <h3>${product.name}</h3>
        <p class="muted">${product.description}</p>
        <div class="price-row">
          <strong>${formatEUR(product.price)}</strong>
          <button class="button button-secondary" type="button">Preview</button>
        </div>
      </div>
    `;
    grid.append(article);
  });
}

async function loadHealth() {
  const status = document.querySelector("#health-status");
  const message = document.querySelector("#health-message");

  try {
    const response = await fetch("/api/health");
    const data = await response.json();
    status.textContent = data.ok ? "Backend available" : "Backend unavailable";
    message.textContent = data.message || "";
  } catch (error) {
    status.textContent = "Backend unavailable";
    message.textContent = "The preview UI loaded, but the API server is not responding yet.";
  }
}

async function handleConfig(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const result = document.querySelector("#pricing-result");
  const payload = Object.fromEntries(form.entries());

  const response = await fetch("/api/configure", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  result.innerHTML = `
    <strong>${formatEUR(data.pricing.total)}</strong>
    <p class="muted">Base ${formatEUR(data.pricing.basePrice)} + finish ${formatEUR(data.pricing.finishDelta)} + lead time ${formatEUR(data.pricing.leadDelta)}</p>
    <p class="muted">${data.note}</p>
  `;
}

async function handleQuote(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const result = document.querySelector("#quote-result");
  const payload = Object.fromEntries(form.entries());

  const response = await fetch("/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  result.textContent = `Quote captured locally for ${data.quoteRequest.name}. Next step: connect this flow to Shopify, email, Airtable, or your CRM.`;
}

renderProducts();
loadHealth();
document.querySelector("#config-form").addEventListener("submit", handleConfig);
document.querySelector("#quote-form").addEventListener("submit", handleQuote);
