import { Link } from "react-router";
import type { StoredResume } from "~/lib/storage";

const ResumeCard = ({ resume }: { resume: StoredResume }) => {
    const overallScore = resume.feedback?.overallScore || resume.feedback?.feedback?.overallScore || 0;
    const atsScore = resume.feedback?.ATS?.score || resume.feedback?.feedback?.ATS?.score || 0;

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
        return 'Needs Work';
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <Link to={`/resume/${resume.id}`} className="group">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-indigo-300 transition-all duration-300 h-full">
                {/* Card Header with Image/Preview */}
                <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 p-6 h-48 flex items-center justify-center overflow-hidden">
                    {resume.imageDataUrl ? (
                        <img
                            src={resume.imageDataUrl}
                            alt="Resume preview"
                            className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="text-center">
                            <div className="bg-white p-4 rounded-2xl shadow-sm">
                                <svg className="w-16 h-16 text-indigo-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* Score Badge */}
                    {resume.feedback && (
                        <div className="absolute top-4 right-4">
                            <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-200">
                                <div className={`text-2xl font-bold bg-gradient-to-r ${getScoreColor(overallScore)} bg-clip-text text-transparent`}>
                                    {overallScore}
                                </div>
                                <div className="text-xs text-gray-500 font-semibold">Score</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                    {/* Job Title & Company */}
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
                            {resume.jobTitle || 'Untitled Resume'}
                        </h3>
                        {resume.companyName && (
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {resume.companyName}
                            </p>
                        )}
                    </div>

                    {/* Status & Scores */}
                    {resume.feedback ? (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Overall</span>
                                <span className="font-semibold text-gray-900">{getScoreLabel(overallScore)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    ATS Score
                                </span>
                                <span className="font-semibold text-gray-900">{atsScore}/100</span>
                            </div>
                            
                            {/* Mini Progress Bar */}
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${getScoreColor(overallScore)} transition-all duration-500`}
                                    style={{ width: `${overallScore}%` }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Analysis pending...</span>
                            </div>
                        </div>
                    )}

                    {/* Footer - Date & Action */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(resume.createdAt)}
                        </span>
                        <span className="text-xs font-semibold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1">
                            View Details
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ResumeCard;
