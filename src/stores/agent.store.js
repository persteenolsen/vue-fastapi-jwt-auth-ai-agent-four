
import { defineStore } from "pinia";
import { fetchWrapperAgent } from "@/helpers";

const baseUrl = `${import.meta.env.VITE_API_URL}/chat`;

function clean(value) {
    if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === "None"
    ) {
        return "";
    }

    return String(value);
}

export const useAgentStore = defineStore({
    id: "agent",

    state: () => ({
        answer: "",
        observation: "",
        action: "",
        loading: false,
        error: "",

        // NEW: Private RAG source references and evidence status
        source: [],
        status: "unknown"
    }),

    actions: {

        async chat(message) {

            this.loading = true;

            this.answer = "";
            this.observation = "";
            this.action = "";
            this.error = "";

            // NEW: Reset metadata for each question
            this.source = [];
            this.status = "unknown";

            try {

                const data = await fetchWrapperAgent.post(
                    baseUrl,
                    { message }
                );

                console.log("Agent response:", data);

                const result = data?.response ?? {};

                this.answer = clean(result.final_answer);

                // Existing observation handling
                const obs = result.observation;
                this.observation = clean(
                    Array.isArray(obs)
                    ? obs.map(item => item?.observation ?? "").filter(Boolean).join("\n\n")
                    : typeof obs === "object" && obs !== null
                    ? obs.observation ?? JSON.stringify(obs, null, 2)
                    : obs
                );

                // Existing action handling
                const action = clean(result.action);
                const actionInput = clean(result.action_input);

                this.action = action
                    ? actionInput
                        ? `${action}: ${actionInput}`
                        : action
                    : "";

                // NEW: Store the source list and status from FastAPI
                this.source = Array.isArray(result.source)
                    ? result.source
                    : [];

                this.status = clean(result.status) || "unknown";

            } catch (e) {

                console.error("Agent error:", e);

                this.error =
                    e?.message ||
                    e?.detail?.message ||
                    String(e);

                // NEW: Reflect request failure in the metadata
                this.source = [];
                this.status = "error";

            } finally {

                this.loading = false;

            }

        },

        clear() {

            this.answer = "";
            this.observation = "";
            this.action = "";
            this.error = "";

            // NEW: Clear metadata too
            this.source = [];
            this.status = "unknown";

        }

    }
});
