import { Github, Linkedin, Heart } from "lucide-react";

function PremiumFooter() {
    return (
        <footer className="border-t border-slate-800 bg-slate-950 py-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-8">

                <div>
                    <h2 className="text-xl font-bold text-white">
                        ThinkFlow AI
                    </h2>

                    <p className="mt-2 text-slate-400">
                        AI Powered Mind Mapping Platform
                    </p>
                </div>

                <div className="flex gap-4">

                    <Github className="cursor-pointer text-slate-400 hover:text-white" />

                    <Linkedin className="cursor-pointer text-slate-400 hover:text-white" />

                </div>

            </div>

            <div className="mt-6 text-center text-sm text-slate-500">
                Made with <Heart className="inline h-4 w-4 text-red-500" /> using React + AI
            </div>
        </footer>
    );
}

export default PremiumFooter;