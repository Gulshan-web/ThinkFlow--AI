import { useState } from "react";
import { Send } from "lucide-react";

function AIChatInput({ onSend, loading }) {

    const [question, setQuestion] = useState("");

    function handleSubmit(e) {

        e.preventDefault();

        if (!question.trim()) return;

        onSend(question);

        setQuestion("");

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="flex gap-3"
        >

            <input

                type="text"

                value={question}

                onChange={(e) =>
                    setQuestion(e.target.value)
                }

                placeholder="Ask anything..."

                className="
                    flex-1
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-900
                    px-4
                    py-3
                    text-white
                    outline-none
                    focus:border-cyan-500
                "

            />

            <button

                type="submit"

                disabled={loading}

                className="
                    rounded-xl
                    bg-cyan-500
                    px-5
                    transition
                    hover:bg-cyan-400
                    disabled:opacity-50
                "

            >

                <Send size={18} />

            </button>

        </form>

    );

}

export default AIChatInput;