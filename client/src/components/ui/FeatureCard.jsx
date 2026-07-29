import { motion } from "framer-motion";

function FeatureCard({
    icon,
    title,
    description,
    gradient,
}) {
    return (
        <motion.div
            whileHover={{
                y: -12,
                scale: 1.03,
            }}
            transition={{
                duration: 0.3,
            }}
            className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-xl
      "
        >
            {/* Glow */}

            <div
                className={`absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 ${gradient}`}
            />

            <div className="relative z-10">
                {/* Icon */}

                <div
                    className="
            mb-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-slate-900/60
            text-cyan-400
            shadow-lg
          "
                >
                    {icon}
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">
                    {title}
                </h3>

                <p className="leading-7 text-slate-400">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

export default FeatureCard;