# 📰 NewsMate Backend

This is the **Node.js + Express** backend for the **RAG-Powered News Chatbot**. It powers an AI chatbot capable of answering user queries based on a collection of news articles using a Retrieval-Augmented Generation (RAG) pipeline.

---

## 📌 Features

- Ingests and embeds a collection of scraped news articles using `Jina Embeddings`.
- Stores vector embeddings in `Qdrant` vector database.
- Retrieves top relevant passages for each user query.
- Uses `Google Gemini API` to generate final answers.
- Chat sessions managed via unique session identifiers.
- Stores session-specific chat history in `Redis`.
- RESTful API endpoints for:
  - Sending user queries and receiving AI responses.
  - Fetching session chat history.
  - Clearing/resetting chat sessions.

---

## ⚙️ Tech Stack

- **Backend Framework:** Node.js (Express)
- **Embeddings:** Jina Embeddings (Free tier)
- **Vector Database:** Qdrant
- **LLM API:** Google Gemini API (Free trial)
- **Session Management & Cache:** Redis

---

## 📦 Installation

```bash
git clone https://github.com/sujaltangde/newsmate-backend.git
cd newsmate-backend
npm install
npm run dev
```



## 📑 Environment Variables

Create a `.env` file in the root directory:

```env
# Port on which the backend server will run
PORT=5000

# Jina API endpoint for generating embeddings from text
JINA_API_ENDPOINT=https://api.jina.ai/v1/embeddings

# API Key for authenticating requests to Jina API
JINA_API_KEY=your_jina_api_key_here

# Qdrant API key for authenticating requests to the Qdrant vector database
QDRANT_API_KEY=your_qdrant_api_key_here

# URL for connecting to the Qdrant vector database
QDRANT_DB_URL=https://your_qdrant_url_here

# Redis connection details for storing session data and caching
REDIS_HOST=your_redis_host_here
REDIS_PORT=your_redis_port_here
REDIS_USERNAME=your_redis_username_here
REDIS_PASSWORD=your_redis_password_here

# Gemini API endpoint for generating AI content from Google Gemini
GEMINI_API_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=

# API Key for authenticating requests to the Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here
```


## 💾 Caching & Performance

- **Redis** for in-memory session storage
- Chat history auto-expiry with TTL (example: 24 hours)

```js
await redisClient.set(sessionId, JSON.stringify(messages), { EX: 86400 });
```



