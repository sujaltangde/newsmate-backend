const redisClient = require('../config/redisClient');

async function getChatHistory(sessionId) {
  const data = await redisClient.get(sessionId);
  return data ? JSON.parse(data) : [];
}

async function saveChatHistory(sessionId, messages) {
  await redisClient.set(sessionId, JSON.stringify(messages), {EX: 86400});
}

async function clearChatHistory(sessionId) {
  await redisClient.del(sessionId);
}

module.exports = { getChatHistory, saveChatHistory, clearChatHistory };
