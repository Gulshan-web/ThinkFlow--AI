import AnimatedBackground from "../common/AnimatedBackground";

function HeroBackground() {
    return (
        <>
            {/* Main Animated Background */}
            <AnimatedBackground />

            {/* Blur Gradient 1 */}
            <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />

            {/* Blur Gradient 2 */}
            <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-purple-500/20 blur-[140px]" />

            {/* Blur Gradient 3 */}
            <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />
        </>
    );
}

export default HeroBackground;