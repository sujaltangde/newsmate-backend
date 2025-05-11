const { getEmbedding } = require("../services/embeddingService");
const { searchSimilar } = require("../services/qdrantService");
const {
  getChatHistory,
  saveChatHistory,
  clearChatHistory,
} = require("../services/redisService");
const axios = require("axios");

const GEMINI_API_KEY=process.env.GEMINI_API_KEY
const GEMINI_API_ENDPOINT=process.env.GEMINI_API_ENDPOINT


async function chat(req, res) {
  const { prompt, sessionId } = req.body;
  try {
    const history = await getChatHistory(sessionId);

    const embedding = await getEmbedding(prompt);
    const similarArticles = await searchSimilar(embedding, 3);

    const context = similarArticles
      .map(
        (item) => item.payload.title + " - " + item.payload.content + " - " + item.payload.category + " - " + item.payload.tags
      )
      .join("\n\n");

    const finalPrompt = `Based on the following context, please generate a helpful and detailed response to the user's query:\n\nContext: ${context}\n\nUser's Query: ${prompt}, and don't add in the respone "based on the context you provided"`;

    const response = await axios.post(
      GEMINI_API_ENDPOINT + GEMINI_API_KEY,
      {
        contents: [{
          parts: [{ text: finalPrompt }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );


    const candidate = response.data.candidates[0];
    const contentText = candidate.content.parts[0].text;

    history.push({ role: "user", message: prompt });
    history.push({ role: "assistant", message: contentText });

    await saveChatHistory(sessionId, history);
    
    res.json({ message: "Response generated successfully!" });
  } catch (error) {
    console.error("Error in chat:", error);
    res
      .status(500)
      .json({ message: "Failed to procced prompt", error: error.message });
  }
}

async function getChat(req, res) {
  const { sessionId } = req.params;
  try {
    const history = await getChatHistory(sessionId);
    res.json({ history });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ message: "Failed to fetch chat history", error: error.message });
  }
}

async function resetSession(req, res) {
  const { sessionId } = req.params;
  await clearChatHistory(sessionId);
  res.json({ message: "Session reset successfully!" });
}

module.exports = { chat, getChat, resetSession };