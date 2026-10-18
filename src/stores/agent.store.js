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

                this.observation = clean(result.observation);

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
