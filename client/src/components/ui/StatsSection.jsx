import { motion } from "framer-motion";
import {
    BrainCircuit,
    Users,
    Workflow,
    Download,
} from "lucide-react";

const stats = [
    {
        icon: <BrainCircuit size={34} />,
        number: "50K+",
        label: "Ideas Generated",
    },
    {
        icon: <Users size={34} />,
        number: "15K+",
        label: "Active Users",
    },
    {
        icon: <Workflow size={34} />,
        number: "1M+",
        label: "Nodes Created",
    },
    {
        icon: <Download size={34} />,
        number: "100K+",
        label: "Exports",
    },
];

function StatsSection() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{
                                opacity: 0,
                                y: 50,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                            }}
                            className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-8
                text-center
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-cyan-500/30
              "
                        >
                            <div className="mb-5 flex justify-center text-cyan-400">
                                {item.icon}
                            </div>

                            <h3 className="text-5xl font-black text-white">
                                {item.number}
                            </h3>

                            <p className="mt-3 text-slate-400">
                                {item.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default StatsSection;