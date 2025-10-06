export default async function handler(req, res) {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Missing query" });

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "OMDB fetch failed" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
