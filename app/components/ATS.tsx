const ATS = ({ score, suggestions }: { score: number; suggestions: any[] }) => {
    const getATSLevel = (score: number) => {
        if (score >= 90) return { label: 'Excellent', color: 'green', emoji: '🎉' };
        if (score >= 80) return { label: 'Very Good', color: 'blue', emoji: '✅' };
        if (score >= 70) return { label: 'Good', color: 'indigo', emoji: '👍' };
        if (score >= 60) return { label: 'Fair', color: 'yellow', emoji: '⚠️' };
        return { label: 'Needs Work', color: 'red', emoji: '❌' };
    };

    const level = getATSLevel(score);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ATS Compatibility
                </h2>
            </div>

            {/* Score Display */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border border-indigo-200">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-gray-600 font-medium mb-1">Your ATS Score</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {score}
                            </span>
                            <span className="text-2xl text-gray-500">/100</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-2xl">{level.emoji}</span>
                            <span className={`text-sm font-semibold text-${level.color}-600`}>
                                {level.label}
                            </span>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <svg className="w-32 h-32 text-indigo-600 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="h-3 bg-white/50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-1000 rounded-full"
                            style={{ width: `${score}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* What is ATS */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                    <div className="flex-shrink-0">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-blue-900 mb-1">What is ATS?</div>
                        <div className="text-sm text-blue-700">
                            Applicant Tracking Systems (ATS) are software used by employers to scan and filter resumes. A higher ATS score means your resume is more likely to pass through these automated systems.
                        </div>
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            {suggestions && suggestions.length > 0 && (
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        ATS Optimization Tips
                    </h3>
                    <div className="space-y-3">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-xl border ${
                                    suggestion.type === 'good'
                                        ? 'bg-green-50 border-green-200'
                                        : 'bg-orange-50 border-orange-200'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        {suggestion.type === 'good' ? (
                                            <div className="bg-green-100 p-1.5 rounded-lg">
                                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <div className="bg-orange-100 p-1.5 rounded-lg">
                                                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-medium ${
                                            suggestion.type === 'good' ? 'text-green-900' : 'text-orange-900'
                                        }`}>
                                            {suggestion.tip}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ATS;
