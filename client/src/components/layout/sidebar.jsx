import {
    Home,
    BrainCircuit,
    Workflow,
    Settings,
    Info,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    const links = [
        {
            name: "Home",
            path: "/",
            icon: <Home size={20} />,
        },
        {
            name: "Workspace",
            path: "/workspace",
            icon: <Workflow size={20} />,
        },
        {
            name: "AI",
            path: "/ai",
            icon: <BrainCircuit size={20} />,
        },
        {
            name: "About",
            path: "/about",
            icon: <Info size={20} />,
        },
        {
            name: "Settings",
            path: "/settings",
            icon: <Settings size={20} />,
        },
    ];

    return (
        <aside
            className="
        w-64
        border-r
        border-white/10
        bg-slate-900
        text-white
        flex
        flex-col
        p-5
      "
        >
            <h2 className="mb-10 text-2xl font-bold">
                ThinkFlow AI
            </h2>

            <nav className="flex flex-col gap-2">
                {links.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`
              flex
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              transition

              ${location.pathname === item.path
                                ? "bg-cyan-500 text-white"
                                : "hover:bg-slate-800"
                            }
            `}
                    >
                        {item.icon}

                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto rounded-xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">
                    ThinkFlow AI
                </p>

                <p className="mt-1 text-lg font-semibold">
                    v1.0
                </p>
            </div>
        </aside>
    );
}

export default Sidebar;