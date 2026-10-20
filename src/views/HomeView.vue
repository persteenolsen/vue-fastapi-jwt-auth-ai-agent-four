
<template>
  <div class="welcome" v-if="username">
    Welcome, {{ username }}!
  </div>

  <div class="home">
    <h2>Agentic RAG Chat Assistant</h2>

    <form @submit.prevent="handleChat">

      <label>Question</label>

      <textarea
        v-model="prompt"
        rows="4"
        placeholder="Ask something..."
        @keydown.enter.exact.prevent="handleChat"
      />

      <small>
        Enter = Send &nbsp;&nbsp; Shift+Enter = New line
      </small>

      <br /><br />

      <button
        type="submit"
        :disabled="agentStore.loading || !prompt.trim()"
      >
        {{ agentStore.loading ? "Thinking..." : "Ask" }}
      </button>

    </form>

    <div v-if="agentStore.answer" class="section">

      <label>Answer</label>

      <textarea
        readonly
        rows="10"
        :value="agentStore.answer"
      />

    </div>

    <div class="section">

      <label>Observation</label>

      <textarea
        readonly
        rows="4"
        :value="agentStore.observation"
      />

    </div>

    <div class="section">

      <label>Action</label>

      <textarea
        readonly
        rows="4"
        :value="agentStore.action"
      />

    </div>

    <!-- NEW: Display private RAG evidence status -->
    <div class="section" v-if="agentStore.status !== 'unknown'">

      <label>Status</label>

      <div
        class="status"
        :class="`status-${agentStore.status}`"
      >
        {{ agentStore.status }}
      </div>

    </div>

    <!-- NEW: Display source URLs or references -->
    <div class="section" v-if="agentStore.source.length">

      <label>Sources</label>

      <ul class="sources">
        <li
          v-for="(item, index) in agentStore.source"
          :key="index"
        >
          <a
            v-if="typeof item === 'string' && /^https?:\/\//i.test(item)"
            :href="item"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item }}
          </a>

          <span v-else-if="typeof item === 'string'">
            {{ item }}
          </span>

          <span v-else>
            {{ JSON.stringify(item) }}
          </span>
        </li>
      </ul>

    </div>

    <div
      v-if="agentStore.error"
      class="error"
    >
      {{ agentStore.error }}
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores";
import { useAgentStore } from "@/stores/agent.store";

const authStore = useAuthStore();
const agentStore = useAgentStore();

const username = authStore.user?.username || "Guest";

const prompt = ref("");

async function handleChat() {

  if (!prompt.value.trim() || agentStore.loading)
    return;

  await agentStore.chat(prompt.value);

}
</script>

<style scoped>
.home {
    max-width: 900px;
    margin: auto;
}

textarea {
    width: 100%;
    resize: vertical;
    padding: 10px;
    overflow-y: auto;
}

.section {
    margin-top: 20px;
}

.error {
    margin-top: 20px;
    color: red;
    font-weight: bold;
}

.welcome {
    text-align: center;
    color: orange;
    margin-bottom: 20px;
}

/* NEW: Status display */
.status {
    margin-top: 8px;
    font-weight: bold;
    overflow-wrap: anywhere;
}

.status-sources_found {
    color: #15803d;
}

.status-unverified {
    color: #b45309;
}

.status-error {
    color: #dc2626;
}

.sources {
    margin-top: 8px;
    padding-left: 24px;
    overflow-wrap: anywhere;
}

.sources li {
    margin-bottom: 8px;
}

.sources a {
    color: #2563eb;
    text-decoration: underline;
}
</style>
