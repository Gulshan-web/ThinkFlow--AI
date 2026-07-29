import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-slate-950 text-white">
            <h1 className="text-7xl font-bold">404</h1>

            <p className="mt-4 text-gray-400">
                Page not found
            </p>

            <Link
                to="/"
                className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 transition hover:bg-indigo-700"
            >
                Back Home
            </Link>
        </div>
    );
}

export default NotFound;