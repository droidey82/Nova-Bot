app.get("/api/fresh-funded", async (req, res) => {
  try {
    const response = await fetch("https://onchain-0cdba6d4ed17.herokuapp.com/api-v1/fresh-funded");
    const text = await response.text();

    try {
      const json = JSON.parse(text);
      res.json(json);
    } catch (e) {
      console.error("Upstream returned non-JSON:", text.slice(0, 200));
      res.status(502).json({ error: "Upstream API returned non-JSON response", raw: text });
    }
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to fetch from source" });
  }
});
