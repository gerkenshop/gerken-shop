const fs = require("fs");
const path = require("path");
const http = require("http");

const port = Number(process.env.PORT || 8787);
const previewRoot = path.join(__dirname, "..", "preview");

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".html") return "text/html; charset=utf-8";
  if (extension === ".css") return "text/css; charset=utf-8";
  if (extension === ".js") return "application/javascript; charset=utf-8";
  if (extension === ".json") return "application/json; charset=utf-8";
  if (extension === ".svg") return "image/svg+xml";
  return "text/plain; charset=utf-8";
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload, null, 2));
}

function sendFile(res, filePath) {
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      "Content-Type": getContentType(filePath),
    });
    res.end(data);
  } catch (error) {
    sendJson(res, 404, {
      ok: false,
      error: "Preview file not found",
    });
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if ((req.url === "/" || req.url === "/preview") && req.method === "GET") {
    sendFile(res, path.join(previewRoot, "index.html"));
    return;
  }

  if (req.url.startsWith("/preview/") && req.method === "GET") {
    const relativePath = req.url.replace("/preview/", "");
    const filePath = path.normalize(path.join(previewRoot, relativePath));

    if (!filePath.startsWith(previewRoot)) {
      sendJson(res, 403, { ok: false, error: "Forbidden" });
      return;
    }

    sendFile(res, filePath);
    return;
  }

  if (req.url === "/api/health" && req.method === "GET") {
    sendJson(res, 200, {
      ok: true,
      app: "layerforge-shopify-stack",
      message: "Backend scaffold is running. Connect this to Shopify OAuth, app proxy, or your CRM next.",
    });
    return;
  }

  if (req.url === "/api/quote" && req.method === "POST") {
    try {
      const raw = await readBody(req);
      const payload = raw ? JSON.parse(raw) : {};

      sendJson(res, 200, {
        ok: true,
        receivedAt: new Date().toISOString(),
        nextStep: "Persist this request to email, Airtable, HubSpot, or your database.",
        quoteRequest: {
          name: payload.name || "",
          email: payload.email || "",
          projectType: payload.projectType || "",
          material: payload.material || "",
          quantity: payload.quantity || "",
          notes: payload.notes || "",
        },
      });
    } catch (error) {
      sendJson(res, 400, {
        ok: false,
        error: error.message,
      });
    }
    return;
  }

  if (req.url === "/api/configure" && req.method === "POST") {
    try {
      const raw = await readBody(req);
      const payload = raw ? JSON.parse(raw) : {};
      const basePrice = Number(payload.basePrice || 0);

      const finishDelta =
        payload.finish === "Premium showroom finish"
          ? 25
          : payload.finish === "Paint-ready"
            ? 12
            : payload.finish === "Fine sanding"
              ? 7
              : 0;

      const leadDelta =
        payload.leadTime === "Rush 72h"
          ? 18
          : payload.leadTime === "Priority 24h quote"
            ? 30
            : 0;

      sendJson(res, 200, {
        ok: true,
        pricing: {
          basePrice,
          finishDelta,
          leadDelta,
          total: basePrice + finishDelta + leadDelta,
        },
        note: "This is a local pricing preview. Implement Shopify Functions or a cart transform app for production pricing logic.",
      });
    } catch (error) {
      sendJson(res, 400, {
        ok: false,
        error: error.message,
      });
    }
    return;
  }

  sendJson(res, 404, {
    ok: false,
    error: "Not found",
  });
});

server.listen(port, () => {
  console.log(`LayerForge backend scaffold listening on http://localhost:${port}`);
});
