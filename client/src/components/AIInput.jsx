import { useState } from "react";
import { Sparkles } from "lucide-react";

function AIInput({ onGenerate, loading }) {
    const [idea, setIdea] = useState("");

    const handleSubmit = () => {
        if (!idea.trim()) {
            alert("Please enter an idea.");
            return;
        }

        onGenerate(idea);
    };

    return (
        <div className="mx-auto mt-10 max-w-4xl">

            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

                <h2 className="mb-6 text-center text-3xl font-bold text-white">
                    Generate AI Mind Map
                </h2>

                <textarea
                    rows={5}
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Example: Build an E-Commerce Website..."
                    className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-700
                        bg-slate-800
                        p-5
                        text-lg
                        text-white
                        outline-none
                        focus:border-cyan-400
                    "
                />

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="
                        mt-6
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-2xl
                        bg-gradient-to-r
                        from-cyan-500
                        to-indigo-500
                        py-4
                        text-lg
                        font-bold
                        text-white
                        transition
                        hover:scale-[1.02]
                        disabled:opacity-50
                    "
                >
                    <Sparkles size={22} />

                    {loading ? "Generating..." : "Generate Mind Map"}
                </button>

            </div>

        </div>
    );
}

export default AIInput;