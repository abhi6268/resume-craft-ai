import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import { storage } from "~/lib/storage";

export const meta = () => [
    { title: "Resume Analysis - ResumeCraft AI" },
    { name: "description", content: "Detailed AI analysis of your resume" },
];

const Resume = () => {
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [resumeData, setResumeData] = useState<any>(null);
    const [feedback, setFeedback] = useState<any>(null);

    useEffect(() => {
        if (!id) return;

        const item = storage.get(id);
        if (!item) return;

        setResumeData(item);
        setFeedback(item.feedback || null);

        if (item.imageDataUrl) {
            setImageUrl(item.imageDataUrl);
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Header */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors group">
                            <div className="bg-gray-100 group-hover:bg-indigo-100 p-2 rounded-lg transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </div>
                            <span className="font-semibold">Back to Dashboard</span>
                        </Link>
                        
                        <div className="flex items-center gap-3">
                            {resumeData && (
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-gray-900">{resumeData.jobTitle || 'Resume'}</div>
                                    <div className="text-xs text-gray-500">{resumeData.companyName || 'Analysis'}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Resume Preview */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Resume Preview
                            </h2>
                            {imageUrl ? (
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                                    <img
                                        src={imageUrl}
                                        className="w-full h-auto"
                                        alt="Resume preview"
                                    />
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
                                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-600">Preview not available</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Analysis Results */}
                    <div className="lg:col-span-2">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Resume Analysis
                            </h1>
                            <p className="text-gray-600">
                                AI-powered insights to improve your resume
                            </p>
                        </div>

                        {feedback ? (
                            <div className="space-y-6">
                                <Summary feedback={feedback} />
                                <ATS score={feedback?.ATS?.score || 0} suggestions={feedback?.ATS?.tips || []} />
                                <Details feedback={feedback} />
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-6"></div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing your resume...</h3>
                                <p className="text-gray-600">
                                    Our AI is reviewing your resume and generating feedback
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
