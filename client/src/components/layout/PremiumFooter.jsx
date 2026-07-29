import { Link } from "react-router-dom";
import {
    Github,
    Linkedin,
    Twitter,
    Mail,
    BrainCircuit,
} from "lucide-react";

function PremiumFooter() {
    const productLinks = [
        "Mind Maps",
        "AI Generator",
        "Export",
        "Templates",
    ];

    const companyLinks = [
        "About",
        "Features",
        "Pricing",
        "Blog",
    ];

    const resources = [
        "Documentation",
        "Help Center",
        "Privacy",
        "Terms",
    ];

    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950">
            {/* Background Glow */}

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />

                <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[140px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-20">

                {/* Top */}

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

                    {/* Brand */}

                    <div className="lg:col-span-2">

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500">

                                <BrainCircuit size={26} className="text-white" />

                            </div>

                            <div>

                                <h2 className="text-2xl font-bold text-white">
                                    ThinkFlow AI
                                </h2>

                                <p className="text-sm text-cyan-400">
                                    Interactive Mind Mapping
                                </p>

                            </div>

                        </div>

                        <p className="mt-6 max-w-md leading-7 text-slate-400">
                            ThinkFlow AI helps you transform ideas into beautiful,
                            interactive mind maps powered by artificial intelligence.
                            Organize thoughts, brainstorm visually and export your
                            work effortlessly.
                        </p>

                        {/* Social */}

                        <div className="mt-8 flex gap-4">

                            <SocialButton icon={<Github size={20} />} />

                            <SocialButton icon={<Linkedin size={20} />} />

                            <SocialButton icon={<Twitter size={20} />} />

                            <SocialButton icon={<Mail size={20} />} />

                        </div>

                    </div>

                    {/* Product */}

                    <FooterColumn
                        title="Product"
                        links={productLinks}
                    />

                    {/* Company */}

                    <FooterColumn
                        title="Company"
                        links={companyLinks}
                    />

                    {/* Resources */}

                    <FooterColumn
                        title="Resources"
                        links={resources}
                    />

                </div>

                {/* Divider */}

                <div className="my-12 h-px bg-white/10" />

                {/* Bottom */}

                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

                    <p className="text-sm text-slate-500">
                        © 2026 ThinkFlow AI. All rights reserved.
                    </p>

                    <div className="flex gap-6">

                        <Link
                            to="/"
                            className="text-sm text-slate-400 transition hover:text-white"
                        >
                            Privacy
                        </Link>

                        <Link
                            to="/"
                            className="text-sm text-slate-400 transition hover:text-white"
                        >
                            Terms
                        </Link>

                        <Link
                            to="/"
                            className="text-sm text-slate-400 transition hover:text-white"
                        >
                            Cookies
                        </Link>

                    </div>

                </div>

            </div>
        </footer>
    );
}

/* -------------------------------- */

function FooterColumn({ title, links }) {
    return (
        <div>

            <h3 className="mb-6 text-lg font-semibold text-white">
                {title}
            </h3>

            <ul className="space-y-4">

                {links.map((item) => (
                    <li key={item}>

                        <Link
                            to="/"
                            className="text-slate-400 transition hover:text-cyan-400"
                        >
                            {item}
                        </Link>

                    </li>
                ))}

            </ul>

        </div>
    );
}

/* -------------------------------- */

function SocialButton({ icon }) {
    return (
        <button
            className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-white/10
        bg-white/5
        text-slate-300
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-cyan-500
        hover:bg-cyan-500/10
        hover:text-cyan-400
      "
        >
            {icon}
        </button>
    );
}

export default PremiumFooter;