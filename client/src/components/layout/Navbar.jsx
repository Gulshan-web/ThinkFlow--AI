import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Logo from "../common/Logo";

function Navbar() {
    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
            }}
            className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-slate-950/60 backdrop-blur-xl"
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
                {/* Logo */}
                <Link to="/">
                    <Logo />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-10 md:flex">
                    <NavItem to="/">Home</NavItem>

                    <NavItem to="/workspace">Workspace</NavItem>

                    <a
                        href="#features"
                        className="text-sm font-medium text-slate-300 transition duration-300 hover:text-white"
                    >
                        Features
                    </a>

                    <a
                        href="#about"
                        className="text-sm font-medium text-slate-300 transition duration-300 hover:text-white"
                    >
                        About
                    </a>
                </nav>

                {/* Right Buttons */}
                <div className="hidden items-center gap-4 md:flex">
                    <button
                        className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-500/10"
                    >
                        Login
                    </button>

                    <Link
                        to="/workspace"
                        className="rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Button */}
                <button className="rounded-lg border border-white/10 p-2 text-white md:hidden">
                    <Menu size={22} />
                </button>
            </div>
        </motion.header>
    );
}

function NavItem({ to, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `relative text-sm font-medium transition duration-300 ${isActive
                    ? "text-white"
                    : "text-slate-300 hover:text-white"
                }`
            }
        >
            {children}
        </NavLink>
    );
}

export default Navbar;