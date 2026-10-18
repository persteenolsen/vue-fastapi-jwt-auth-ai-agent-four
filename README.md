# 🤖 vue-fastapi-jwt-ai-agent

Last updated: 18-10-2026

A Vue 3 frontend using Pinia for state management and JWT authentication, designed to interact with a FastAPI AI Agent API.

This project demonstrates a complete AI agent frontend architecture:

SPA architecture → authentication → API integration → AI agent → tool execution → agent response display → local development → production build

The application provides an interface where users can ask questions and receive:

- AI-generated answers
- Agent actions
- Tool observations
- Error handling feedback

## FastAPI Backend

https://github.com/persteenolsen/fastapi-jwt-auth-ai-agent-four

The backend API using FastAPI, JWT authentication, LLM integration, and agent tools such as Wikipedia search.

The backend provides:

- JWT authentication
- Protected AI agent endpoints
- LLM integration
- Agent tool execution
- Structured JSON responses

---

# 🔐 Features

- Vue 3 SPA architecture
- Pinia for global state management
- JWT authentication with bearer tokens
- Secure authenticated API requests
- AI agent question answering interface
- Agent action display
- Tool observation display
- Final answer display
- Error handling and feedback
- Development server with Vite
- Production-ready build and preview
- Environment-based API configuration
- Easy deployment to static hosting

---

# 🧱 Tech Stack

- Node.js 18.19.1
- Vue 3
- Pinia
- Vite
- ESLint
- VS Code

---

# 📁 Project Structure

    .
    ├── index.html             # SPA entry point
    ├── package.json           # Node dependencies + scripts
    ├── vite.config.js         # Vite configuration
    ├── src
    │   ├── main.js            # Vue application entry point
    │   ├── App.vue            # Root component
    │   ├── components         # Reusable Vue components
    │   ├── views              # Application pages
    │   ├── stores             # Pinia stores (JWT auth + AI agent state)
    │   ├── helpers            # API fetch wrappers
    │   └── router             # Vue router configuration
    ├── public                 # Static assets
    └── .env                   # Environment variables

---

# ⚙️ Installation

Clone the repository:

    git clone https://github.com/persteenolsen/vue-fastapi-jwt-auth-ai-agent-four.git

Enter the project folder:

    cd vue-fastapi-jwt-auth-ai-agent-three

Install dependencies:

    npm install

Verify setup:

    npm run dev

Open the application:

    http://localhost:3000

---

# 🚀 Development

Start the development server:

    npm run dev

The application will be available at:

    http://localhost:3000

---

# 📦 Production Build

Create a production build:

    npm run build

Preview the production build locally:

    npm run preview

Default preview address:

    http://localhost:5050

---

# 🔐 Environment Variables

Configure the FastAPI backend URL:

    VITE_API_URL=http://127.0.0.1:8000

---

# 🧪 Usage

1. Start the FastAPI AI Agent backend
2. Start the Vue frontend:

       npm run dev

3. Login through the SPA
4. Enter a question in the AI Agent interface
5. Submit the question
6. Receive:

   - Agent answer
   - Agent action
   - Tool observation

---

# 📡 API Integration

The frontend communicates with protected FastAPI endpoints.

## Authentication

POST `/login-spa`

Returns a JWT access token:

Example response:

    {
      "access_token": "token-value",
      "token_type": "bearer",
      "username": "user"
    }

The token is stored in the authentication store and automatically included in API requests.

---

## Chat

POST `/chat`

Example request:

    {
      "message": "Who is the CEO of Apple?"
    }

Example response:

    {
      "response": {
        "action": "Wikipedia",
        "action_input": "Apple CEO",
        "observation": "Timothy Donald Cook is an American business executive...",
        "final_answer": "The CEO of Apple is Tim Cook."
      }
    }

---

# 🧠 Application Flow

    User Question
          |
          v
    Vue Application
          |
          v
    FastAPI Agent API
          |
          v
    LLM Agent
          |
          +---- Tool Selection
          |
          +---- Tool Execution
          |
          +---- Observation
          |
          v
    Final Answer Returned To User

The user can see both the final answer and the intermediate agent information.

---

# 📋 Displayed Information

The application provides an interface where users can ask questions and receive:

- AI-generated answers
- Agent actions
- Tool observations
- Error handling feedback

---

# 🏗️ Design

# 🧠 Key Design Features

- Global Pinia store for authentication state
- Dedicated Pinia store for AI agent state
- JWT bearer authentication handling
- Clean separation between frontend and backend logic
- Agent response parsing and display
- Tool action visibility for transparency
- Observation display for debugging and explainability
- Environment-based API configuration
- Vue SPA architecture

---

# 💡 Use Cases

This Vue frontend can be used as a general-purpose interface for FastAPI-based AI agent systems.

## 💬 AI Chat Assistants

- Build AI-powered assistants for internal or customer applications
- Provide conversational access to information
- Combine LLM reasoning with external tools
- Display transparent agent execution steps

Examples:

- Customer support assistants
- Internal knowledge assistants
- Personal AI assistants
- FAQ agents

## 🔎 Tool-Based AI Systems

- Connect AI models with external tools
- Show which tools were selected
- Display tool results and observations

Examples:

- Wikipedia research agents
- Search assistants
- Data lookup assistants
- Information retrieval agents

## 🏢 Enterprise AI Applications

- Create authenticated AI assistants
- Control access using JWT authentication
- Connect users with company knowledge systems

Examples:

- Employee assistants
- Internal support portals
- Business knowledge agents
- Training assistants

## 🛠️ Developer Assistants

- Build AI tools for technical workflows
- Connect agents with documentation and APIs
- Help developers retrieve information faster

Examples:

- API assistants
- Documentation agents
- Coding assistants
- DevOps helpers

## 🔐 Secure AI Applications

With JWT authentication and protected FastAPI endpoints, this frontend supports applications where AI access must be controlled.

Examples:

- Private AI assistants
- Customer portals
- Member-only applications
- Role-based AI systems

---

# 👨‍💻 Author

Built as a Vue 3 SPA demonstrating secure JWT authentication, Pinia state management, and integration with a FastAPI AI Agent backend.
