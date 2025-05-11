const { QdrantClient } = require('@qdrant/js-client-rest');

const qdrantClient = new QdrantClient({
  url: process.env.QDRANT_DB_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

(async () => {
  try {
    await qdrantClient.getCollections();
    console.log('✅ Qdrant connected successfully!');
  } catch (error) {
    console.error('❌ Failed to connect to Qdrant:', error.response?.data || error.message);
  }
})();

module.exports = qdrantClient;
