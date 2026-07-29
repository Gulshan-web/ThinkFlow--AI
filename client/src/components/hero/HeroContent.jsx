import { Sparkles, BrainCircuit, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import GradientText from "../common/GradientText";
import HeroButtons from "./HeroButtons";

function HeroContent() {
    return (
        <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2">
                <Sparkles
                    size={16}
                    className="text-cyan-400"
                />

                <span className="text-sm font-medium text-cyan-300">
                    AI Powered Mind Mapping Platform
                </span>
            </div>

            {/* Heading */}

            <h1 className="text-5xl font-extrabold leading-tight text-white md:text-7xl">
                Turn Your
                <br />

                <GradientText>
                    Thoughts Into
                </GradientText>

                <br />

                Interactive Mind Maps
            </h1>

            {/* Description */}

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
                ThinkFlow AI transforms a simple idea into a beautiful interactive
                mind map. Organize concepts, expand ideas using AI, collaborate,
                export your work, and visualize your thinking like never before.
            </p>

            {/* Buttons */}

            <div className="mt-12">
                <HeroButtons />
            </div>

            {/* Statistics */}

            <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
                <StatCard
                    title="AI Generated"
                    value="Unlimited"
                    icon={<BrainCircuit size={30} />}
                />

                <StatCard
                    title="Export"
                    value="PNG / PDF"
                    icon={<ArrowRight size={30} />}
                />

                <StatCard
                    title="Responsive"
                    value="100%"
                    icon={<Sparkles size={30} />}
                />
            </div>

            {/* Workspace Link */}

            <div className="mt-12">
                <Link
                    to="/workspace"
                    className="text-cyan-400 transition hover:text-cyan-300"
                >
                    Go to Workspace →
                </Link>
            </div>
        </div>
    );
}

function StatCard({ icon, title, value }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-500/30">
            <div className="mb-4 flex justify-center text-cyan-400">
                {icon}
            </div>

            <h3 className="text-3xl font-bold text-white">
                {value}
            </h3>

            <p className="mt-2 text-slate-400">
                {title}
            </p>
        </div>
    );
}

export default HeroContent;