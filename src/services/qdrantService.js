const qdrantClient = require('../config/qdrantClient');

const COLLECTION_NAME = 'news_articles';

async function createCollection() {
  const collections = await qdrantClient.getCollections();
  const exists = collections.collections.some(
    (col) => col.name === 'news_articles'
  );

  if (exists) {
    console.log('Collection already exists');
    return;
  }

  await qdrantClient.createCollection('news_articles', {
    vectors: {
      size: 768,
      distance: 'Cosine',
    },
  });

}

async function insertDocument(id, embedding, payload) {

  await qdrantClient.upsert(COLLECTION_NAME, {
    points: [
      {
        id,
        vector: embedding,
        payload,
      },
    ],
  });
}

async function searchSimilar(vector, topK = 3) {
  const result = await qdrantClient.search(COLLECTION_NAME, {
    vector,
    limit: topK,
    with_payload: true,
  });
  return result;
}

module.exports = { createCollection, insertDocument, searchSimilar };
