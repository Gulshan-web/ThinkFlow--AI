import { X, Copy } from "lucide-react";

function AIExplainModal({

    open,

    explanation,

    onClose,

}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-white">

                        ✨ AI Explanation

                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
                    >
                        <X size={20} />
                    </button>

                </div>

                <h3 className="mb-3 text-xl font-semibold text-cyan-400">

                    {explanation?.title}

                </h3>

                <p className="mb-6 whitespace-pre-line text-slate-300">

                    {explanation?.summary}

                </p>

                <h4 className="mb-3 font-semibold text-white">

                    Key Points

                </h4>

                <ul className="mb-8 list-disc space-y-2 pl-6 text-slate-300">

                    {explanation?.keyPoints?.map(

                        (item, index) => (

                            <li key={index}>

                                {item}

                            </li>

                        )

                    )}

                </ul>

                <button

                    onClick={() => {

                        navigator.clipboard.writeText(

                            JSON.stringify(

                                explanation,

                                null,

                                2

                            )

                        );

                    }}

                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white hover:bg-cyan-600"

                >

                    <Copy size={18} />

                    Copy

                </button>

            </div>

        </div>

    );

}

export default AIExplainModal;