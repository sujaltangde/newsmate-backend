const { getEmbedding } = require("../services/embeddingService");
const {
  insertDocument,
  createCollection,
} = require("../services/qdrantService");
const newsData = require("../utils/dummyNews.json");

async function ingestNews(req, res) {
  try {
    await createCollection();

    for (let i = 0; i < newsData.length; i++) {
      const news = newsData[i];
      
      const embedding = await getEmbedding(news.content);      

      await insertDocument(i + 1, embedding, news);
    }

    res.json({ message: "News ingested successfully!" });
  } catch (error) {
    console.error("Error ingesting news:", error);
    res
      .status(500)
      .json({ message: "Failed to ingest news", error: error.message });
  }
}

module.exports = { ingestNews };
