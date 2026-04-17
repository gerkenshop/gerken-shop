document.addEventListener("DOMContentLoaded", () => {
  const sortSelect = document.querySelector("[data-sort-by]");

  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      const url = new URL(window.location.href);
      url.searchParams.set("sort_by", event.target.value);
      window.location.assign(url.toString());
    });
  }

  const configuratorRoots = document.querySelectorAll("[data-product-configurator]");
  configuratorRoots.forEach((root) => {
    const leadTime = root.querySelector("#lead-time-select");
    const finish = root.querySelector("#finish-select");

    if (!leadTime || !finish) return;

    const note = document.createElement("p");
    note.className = "configurator-note";
    root.append(note);

    const syncMessage = () => {
      const leadText = leadTime.value;
      const finishText = finish.value;
      note.textContent = `Selected: ${finishText} finish with ${leadText}. Connect this block to Shopify line-item price adjustments via an app or Shopify Functions next.`;
    };

    leadTime.addEventListener("change", syncMessage);
    finish.addEventListener("change", syncMessage);
    syncMessage();
  });
});
