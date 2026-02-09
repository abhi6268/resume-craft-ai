import { Link } from "react-router";

const Navbar = () => {
    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                ResumeCraft AI
                            </div>
                            <div className="text-xs text-gray-500">Smart Resume Analysis</div>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/upload"
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                            New Analysis
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
