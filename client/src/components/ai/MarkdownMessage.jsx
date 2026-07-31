import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Copy } from "lucide-react";

function CodeBlock({ language, value }) {

    return (

        <div className="relative my-4">

            <button
                onClick={() => navigator.clipboard.writeText(value)}
                className="absolute right-3 top-3 rounded bg-slate-700 px-3 py-1 text-xs text-white hover:bg-cyan-600"
            >
                <Copy size={14}/>
            </button>

            <SyntaxHighlighter
                language={language || "javascript"}
                style={oneDark}
                PreTag="div"
            >
                {value}
            </SyntaxHighlighter>

        </div>

    );

}

export default function MarkdownMessage({ children }) {

    return (

        <ReactMarkdown

            remarkPlugins={[remarkGfm]}

            components={{

                code(props) {

                    const { className, children } = props;

                    const language =
                        className?.replace("language-", "");

                    if (language) {

                        return (

                            <CodeBlock
                                language={language}
                                value={String(children).replace(/\n$/, "")}
                            />

                        );

                    }

                    return (

                        <code className="rounded bg-slate-800 px-1 py-0.5 text-cyan-300">

                            {children}

                        </code>

                    );

                }

            }}

        >

            {children}

        </ReactMarkdown>

    );

}