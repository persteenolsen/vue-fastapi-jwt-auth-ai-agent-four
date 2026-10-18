<template>
  <div class="welcome" v-if="username">
    Welcome, {{ username }}!
  </div>

  <div class="home">
    <h2>AI Agent</h2>

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
.home{
    max-width:900px;
    margin:auto;
}

textarea {
    width: 100%;
    resize: vertical;
    padding: 10px;
    overflow-y: auto;
}


.section{
    margin-top:20px;
}

.error{
    margin-top:20px;
    color:red;
    font-weight:bold;
}

.welcome{
    text-align:center;
    color:orange;
    margin-bottom:20px;
}
</style>
