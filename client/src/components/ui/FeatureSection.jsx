import {
    BrainCircuit,
    Sparkles,
    Download,
    Search,
    MessageCircle,
    BookOpen,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

function FeatureSection() {
    const features = [
        {
            icon: <BrainCircuit size={34} />,
            title: "AI Mind Maps",
            description:
                "Generate complete interactive mind maps from a single prompt using AI.",
            gradient:
                "bg-gradient-to-br from-cyan-500/20 to-blue-500/10",
        },

        {
            icon: <Sparkles size={34} />,
            title: "AI Node Expansion",
            description:
                "Expand any node into detailed connected subtopics with one AI-powered click.",
            gradient:
                "bg-gradient-to-br from-purple-500/20 to-pink-500/10",
        },

        {
            icon: <BookOpen size={34} />,
            title: "AI Explain",
            description:
                "Instantly generate detailed explanations for any selected idea or concept.",
            gradient:
                "bg-gradient-to-br from-indigo-500/20 to-cyan-500/10",
        },

        {
            icon: <MessageCircle size={34} />,
            title: "AI Chat Assistant",
            description:
                "Brainstorm and ask follow-up questions directly from any selected node using AI.",
            gradient:
                "bg-gradient-to-br from-pink-500/20 to-orange-500/10",
        },

        {
            icon: <Download size={34} />,
            title: "Export",
            description:
                "Export your complete mind map as JSON, PNG or PDF with one click.",
            gradient:
                "bg-gradient-to-br from-green-500/20 to-emerald-500/10",
        },

        {
            icon: <Search size={34} />,
            title: "Smart Search",
            description:
                "Instantly search and highlight any idea inside large mind maps.",
            gradient:
                "bg-gradient-to-br from-orange-500/20 to-red-500/10",
        },
    ];

    return (
        <section
            id="features"
            className="relative py-28"
        >
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-20 text-center">

                    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
                        Features
                    </span>

                    <h2 className="mt-8 text-5xl font-black text-white">
                        Everything You Need
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
                        ThinkFlow AI combines artificial intelligence,
                        interactive visualization and modern design into one
                        powerful brainstorming platform.
                    </p>

                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            gradient={feature.gradient}
                        />
                    ))}

                </div>

            </div>
        </section>
    );
}

export default FeatureSection;