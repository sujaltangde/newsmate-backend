const axios = require('axios');


const JINA_API_ENDPOINT = process.env.JINA_API_ENDPOINT;
const JINA_API_KEY = process.env.JINA_API_KEY;

async function getEmbedding(text) {
  try {
    const response = await axios.post(
      JINA_API_ENDPOINT,
      {
        input: [text],
        model: 'jina-embeddings-v2-base-en',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JINA_API_KEY}`,
        },
      }
    );
    
    const embedding = response.data.data[0].embedding;
    
    return embedding;
  } catch (err) {
    console.error('Error generating embedding:', err.response?.data || err.message);
    throw err;
  }
}

module.exports = { getEmbedding };
