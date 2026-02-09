import type { Feedback } from "../../constants";

const Summary = ({ feedback }: { feedback: Feedback }) => {
    const f = feedback?.feedback ?? feedback;
    const overallScore = f?.overallScore || 0;

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'from-green-500 to-emerald-500';
        if (score >= 60) return 'from-blue-500 to-cyan-500';
        if (score >= 40) return 'from-yellow-500 to-orange-500';
        return 'from-red-500 to-pink-500';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 90) return 'Excellent';
        if (score >= 80) return 'Very Good';
        if (score >= 70) return 'Good';
        if (score >= 60) return 'Fair';
        return 'Needs Improvement';
    };

    const categories = [
        { name: 'ATS', score: f?.ATS?.score || 0, icon: '🤖' },
        { name: 'Tone & Style', score: f?.toneAndStyle?.score || 0, icon: '✍️' },
        { name: 'Content', score: f?.content?.score || 0, icon: '📝' },
        { name: 'Structure', score: f?.structure?.score || 0, icon: '🏗️' },
        { name: 'Skills', score: f?.skills?.score || 0, icon: '💪' },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Overall Performance
            </h2>

            <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Overall Score Circle */}
                <div className="flex-shrink-0">
                    <div className="relative w-48 h-48">
                        {/* Background Circle */}
                        <svg className="w-48 h-48 transform -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="#e5e7eb"
                                strokeWidth="12"
                                fill="none"
                            />
                            {/* Progress Circle */}
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="url(#gradient)"
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 88}`}
                                strokeDashoffset={`${2 * Math.PI * 88 * (1 - overallScore / 100)}`}
                                strokeLinecap="round"
                                className="transition-all duration-1000"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" className="text-indigo-600" stopColor="currentColor" />
                                    <stop offset="100%" className="text-purple-600" stopColor="currentColor" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* Score Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {overallScore}
                            </div>
                            <div className="text-sm text-gray-600 font-semibold">{getScoreLabel(overallScore)}</div>
                        </div>
                    </div>
                </div>

                {/* Category Scores */}
                <div className="flex-1 w-full">
                    <div className="space-y-4">
                        {categories.map((category, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{category.icon}</span>
                                        <span className="font-semibold text-gray-700">{category.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">{category.score}/100</span>
                                </div>
                                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r ${getScoreColor(category.score)} transition-all duration-1000`}
                                        style={{ width: `${category.score}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Insights */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                        <div className="text-2xl font-bold text-green-700">
                            {categories.filter(c => c.score >= 80).length}
                        </div>
                        <div className="text-sm text-green-600 font-medium">Strong Areas</div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                        <div className="text-2xl font-bold text-yellow-700">
                            {categories.filter(c => c.score >= 60 && c.score < 80).length}
                        </div>
                        <div className="text-sm text-yellow-600 font-medium">Good Areas</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 border border-red-200">
                        <div className="text-2xl font-bold text-red-700">
                            {categories.filter(c => c.score < 60).length}
                        </div>
                        <div className="text-sm text-red-600 font-medium">Needs Work</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;
