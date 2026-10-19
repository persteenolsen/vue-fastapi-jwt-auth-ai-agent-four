
# 🤖 vue-fastapi-jwt-ai-agent

Last updated: 19-10-2026

A Vue 3 frontend using Pinia for state management and JWT authentication, designed to interact with a FastAPI AI Agent backend featuring LangChain, Groq, and agentic Retrieval-Augmented Generation (RAG).

The application provides a secure, interactive interface where authenticated users can ask questions, receive AI-generated answers, and inspect the tools and observations used by the agent.

Vue 3 SPA → JWT Authentication → FastAPI → LangChain Agent → Private RAG + Wikipedia → AI Response

## FastAPI Backend

https://github.com/persteenolsen/fastapi-jwt-auth-ai-agent-four

The backend provides JWT authentication, protected API endpoints, LLM integration, and agentic RAG.

The agent uses Groq's `openai/gpt-oss-20b` model and two tools:

- **Private_RAG:** Retrieves information from a private knowledge base backed by PostgreSQL on Neon.
- **Wikipedia:** Retrieves public information when additional context is useful.

The agent queries the private knowledge base before answering and can combine private document evidence with public information when appropriate.

---

# 🔐 Features

- Vue 3 single-page application (SPA)
- Pinia state management
- JWT authentication with bearer tokens
- Authenticated API requests to FastAPI
- AI-powered question-answering interface
- Integration with an agentic RAG backend
- Private knowledge retrieval and public Wikipedia search
- Display of agent actions and tool inputs
- Intermediate tool observations
- Final AI-generated answers
- Error handling and user feedback
- Environment-based API configuration
- Vite development server and production build

---

# 🧱 Tech Stack

- Node.js 18.19.1
- Vue 3
- Pinia
- Vite
- FastAPI
- JWT authentication
- LangChain
- Groq LLM
- Agentic Retrieval-Augmented Generation (RAG)
- PostgreSQL on Neon

---

# 📁 Project Structure

    .
    ├── index.html             # SPA entry point
    ├── package.json           # Dependencies and scripts
    ├── vite.config.js         # Vite configuration
    ├── src
    │   ├── main.js            # Vue application entry point
    │   ├── App.vue            # Root component
    │   ├── components         # Reusable Vue components
    │   ├── views              # Application pages
    │   ├── stores             # Pinia stores for auth and agent state
    │   ├── helpers            # API request helpers
    │   └── router             # Vue router configuration
    ├── public                 # Static assets
    └── .env                   # Environment variables

---

# ⚙️ Installation

Clone the repository:

    git clone https://github.com/persteenolsen/vue-fastapi-jwt-auth-ai-agent-four.git

Enter the project folder:

    cd vue-fastapi-jwt-auth-ai-agent-four

Install dependencies:

    npm install

Start the development server:

    npm run dev

Open the application:

    http://localhost:3000

Ensure that the FastAPI backend is running and configured before submitting questions.

---

# 🚀 Development

Start the Vite development server:

    npm run dev

Create a production build:

    npm run build

Preview the production build locally:

    npm run preview

Default preview address:

    http://localhost:5050

---

# 🔐 Environment Variables

Configure the FastAPI backend URL in your frontend `.env` file:

    VITE_API_URL=http://127.0.0.1:8000

The backend requires its own configuration for Groq API access, JWT authentication, and database connectivity.

Never commit API keys, database credentials, or JWT secrets to the repository.

---

# 🧪 Usage

1. Start the FastAPI AI Agent backend.
2. Start the Vue frontend using `npm run dev`.
3. Open the application and log in.
4. Enter a question in the AI Agent interface.
5. Submit the question.
6. Review the AI-generated answer and available agent execution details.

The frontend displays the final answer and can present tool actions, inputs, and observations returned by the backend.

---

# 📡 API Integration

The frontend communicates with the FastAPI backend through HTTP requests.

## Authentication

POST `/login-spa`

Example response:

    {
      "access_token": "token-value",
      "token_type": "bearer",
      "username": "user"
    }

The authentication store manages the JWT access token and supplies it to authenticated API requests.

## Chat

POST `/chat`

Example request:

    {
      "message": "What information do our internal documents contain about Apple's leadership?"
    }

Illustrative response structure:

    {
      "response": {
        "action": "Private_RAG, Wikipedia",
        "action_input": "Apple leadership",
        "observation": [
          {
            "tool": "Private_RAG",
            "tool_input": "Apple leadership",
            "observation": "Retrieved private knowledge and source references..."
          },
          {
            "tool": "Wikipedia",
            "tool_input": "Apple leadership",
            "observation": "Retrieved public information..."
          }
        ],
        "final_answer": "The answer combines relevant private document evidence with public information.",
        "tools_used": [
          "Private_RAG",
          "Wikipedia"
        ]
      }
    }

Actual tool usage and response contents depend on the question and backend execution.

The response fields are:

| Field | Description |
|---|---|
| `action` | Names of the tools used |
| `action_input` | Input associated with the last tool execution |
| `observation` | List of tool inputs and execution results |
| `final_answer` | Final AI-generated answer |
| `tools_used` | Unique tool names in execution order |

The `observation` field is an array of objects, allowing the frontend to display individual tool executions.

---

# 🧠 Agentic RAG Integration

The Vue application provides the user interface for an AI agent that combines private knowledge retrieval with public information search.

The backend is responsible for tool selection, retrieval, and answer generation.

## Private_RAG

- Searches private organizational knowledge.
- Retrieves information from the knowledge base on Domain B.
- Uses PostgreSQL on Neon.
- Returns an answer and source references when available.

## Wikipedia

- Retrieves publicly available information.
- Supplements private knowledge when additional context is useful.

The agent is instructed to query `Private_RAG` before answering, distinguish private document evidence from public information, and report when supporting private document sources are unavailable.

Public information does not independently verify private organizational facts.

## Application Flow

    User Question
          |
          v
    Vue 3 Frontend
          |
          v
    FastAPI Backend
          |
          v
    LangChain Agent + Groq LLM
          |
          v
    Private RAG Retrieval
          |
          +---- Wikipedia (when useful)
          |
          v
    Final Answer + Tool Observations
          |
          v
    Vue Displays the Response

The frontend can display the agent's execution information, providing visibility into which tools were used and what observations were returned.

For implementation details about the agent, retrieval pipeline, and database integration, see the [FastAPI backend repository](https://github.com/persteenolsen/fastapi-jwt-auth-ai-agent-four).

---

# 💡 Use Cases

This frontend can serve as a foundation for:

- 💬 AI chat assistants
- 📚 Private document question-answering
- 🏢 Internal organizational knowledge assistants
- 🔎 Tool-based research assistants
- 🛠️ Developer and documentation assistants
- 🔐 Authenticated AI applications

The architecture separates the Vue user interface from the backend agent logic, making it easier to maintain and extend the application.

---

# 👨‍💻 Author

Built as a Vue 3 SPA demonstrating JWT authentication, Pinia state management, and integration with a FastAPI AI Agent backend featuring LangChain, Groq, private knowledge retrieval, and agentic RAG.
