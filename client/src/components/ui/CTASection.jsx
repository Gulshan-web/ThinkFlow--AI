import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function CTASection() {
    return (
        <section className="relative py-32">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-gradient-to-br
            from-cyan-500/10
            via-indigo-500/10
            to-purple-500/10
            p-16
            text-center
            backdrop-blur-xl
          "
                >
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
                        Start Creating
                    </span>

                    <h2 className="mt-8 text-5xl font-black leading-tight text-white">
                        Transform Ideas Into
                        <br />
                        Interactive Mind Maps
                    </h2>

                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                        Whether you're brainstorming, planning a project, studying,
                        or organizing knowledge, ThinkFlow AI helps you think visually
                        and work smarter.
                    </p>

                    <Link
                        to="/workspace"
                        className="
              mt-12
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              via-indigo-500
              to-purple-500
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              shadow-xl
              shadow-cyan-500/30
              transition-all
              duration-300
              hover:scale-105
            "
                    >
                        Launch Workspace

                        <ArrowRight size={22} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export default CTASection;