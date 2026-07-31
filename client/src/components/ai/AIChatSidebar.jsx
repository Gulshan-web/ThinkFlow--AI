import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import MarkdownMessage from "./MarkdownMessage";

function AIChatSidebar({
    open,
    topic,
    messages,
    loading,
    onSend,
    onClose,
}) {

    const [input, setInput] = useState("");

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    function handleSend() {

        const text = input.trim();

        if (!text) return;

        onSend(text);

        setInput("");

    }

    if (!open) return null;

    return (

        <div
            className="
                fixed
                right-0
                top-0
                z-50
                flex
                h-screen
                w-[420px]
                flex-col
                border-l
                border-slate-700
                bg-slate-950
                shadow-2xl
            "
        >

            {/* HEADER */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-700
                    p-5
                "
            >

                <div>

                    <h2 className="text-xl font-bold text-white">

                        🤖 AI Assistant

                    </h2>

                    <p className="mt-1 text-sm text-cyan-400">

                        {topic || "No Topic Selected"}

                    </p>

                </div>

                <button

                    onClick={onClose}

                    className="
                        rounded-lg
                        bg-slate-800
                        p-2
                        hover:bg-red-500
                    "

                >

                    <X size={18} />

                </button>

            </div>

            {/* CHAT */}

            <div
                className="
                    flex-1
                    overflow-y-auto
                    p-5
                    space-y-4
                "
            >

                {messages.length === 0 && (

                    <div
                        className="
                            rounded-xl
                            bg-slate-800
                            p-4
                            text-slate-400
                        "
                    >

                        Ask anything about this topic 👇

                    </div>

                )}

                {messages.map((msg, index) => (

                    <div

                        key={index}

                        className={

                            msg.role === "user"

                                ? "ml-auto w-fit max-w-[90%] rounded-xl bg-cyan-600 px-4 py-3 text-white"

                                : "mr-auto w-fit max-w-[90%] rounded-xl bg-slate-800 px-4 py-3 text-slate-200"

                        }

                    >

                        <MarkdownMessage>

    {msg.content}

</MarkdownMessage>

                    </div>

                ))}

                {loading && (

                    <div
                        className="
                            rounded-xl
                            bg-slate-800
                            px-4
                            py-3
                            text-slate-400
                        "
                    >

                        AI is thinking...

                    </div>

                )}

                <div ref={bottomRef} />

            </div>

            {/* INPUT */}

            <div className="border-t border-slate-700 p-4">

                <div className="flex gap-3">

                    <input

                        value={input}

                        onChange={(e) =>

                            setInput(e.target.value)

                        }

                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                handleSend();

                            }

                        }}

                        placeholder="Ask anything..."

                        className="
                            flex-1
                            rounded-xl
                            bg-slate-800
                            px-4
                            py-3
                            text-white
                            outline-none
                            placeholder:text-slate-500
                        "

                    />

                    <button

                        onClick={handleSend}

                        disabled={loading}

                        className="
                            rounded-xl
                            bg-cyan-500
                            px-5
                            text-white
                            hover:bg-cyan-600
                            disabled:opacity-50
                        "

                    >

                        <Send size={18} />

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AIChatSidebar;