export default async function handler(req, res) {
  const { query } = req.query;
  console.log(query);
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error occurred");
    json.status(400).json({ error });
  }
}
