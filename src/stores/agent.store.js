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
        error: ""
    }),

    actions: {

        async chat(message) {

            this.loading = true;

            this.answer = "";
            this.observation = "";
            this.action = "";
            this.error = "";

            try {

                const data = await fetchWrapperAgent.post(
                    baseUrl,
                    { message }
                );

                console.log("Agent response:", data);

                const result = data?.response ?? {};

                this.answer = clean(result.final_answer);
                
                // 19-10-2026 - Simple code for displaying observation from fastapi
                // this.observation = clean(result.observation?.[0]?.observation);
                
                // 19-10-2026 - Robust code for displaying observation from fastapi
                const obs = result.observation;
                this.observation = clean(
                   Array.isArray(obs)
                   ? obs.map(item => item?.observation ?? "").filter(Boolean).join("\n\n")
                   : typeof obs === "object" && obs !== null
                   ? obs.observation ?? JSON.stringify(obs, null, 2)
                   : obs
                 );
                
                // Here the original code continues from the above change ...
                const action = clean(result.action);
                const actionInput = clean(result.action_input);

                this.action = action
                    ? actionInput
                        ? `${action}: ${actionInput}`
                        : action
                    : "";

            } catch (e) {

                console.error("Agent error:", e);

                this.error =
                    e?.message ||
                    e?.detail?.message ||
                    String(e);

            } finally {

                this.loading = false;

            }

        },

        clear() {

            this.answer = "";
            this.observation = "";
            this.action = "";
            this.error = "";

        }

    }
});
