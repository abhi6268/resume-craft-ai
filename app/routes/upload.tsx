import { useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { storage } from "~/lib/storage";
import { extractPdfText } from "~/lib/pdfText";

async function postAnalyze(payload: {
    resumeText: string;
    jobTitle: string;
    jobDescription: string;
}) {
    const res = await fetch("http://localhost:3001/api/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
    });

    const ct = res.headers.get("content-type") || "";
    const text = await res.text();

    if (!ct.includes("application/json")) {
        throw new Error(
            `API did not return JSON (status ${res.status}). Got: ${text.slice(0, 200)}`
        );
    }

    const data = JSON.parse(text);

    if (!res.ok) {
        throw new Error(data?.error || data?.detail || `Analyze failed (${res.status})`);
    }

    return data;
}

const Upload = () => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (f: File | null) => setFile(f);

    const handleAnalyze = async ({
        companyName,
        jobTitle,
        jobDescription,
        file,
    }: {
        companyName: string;
        jobTitle: string;
        jobDescription: string;
        file: File;
    }) => {
        setIsProcessing(true);
        setCurrentStep(1);

        try {
            setStatusText("Extracting text from your resume...");
            setCurrentStep(1);
            const resumeText = await extractPdfText(file);

            if (!resumeText) {
                throw new Error("Could not extract text from PDF. Try a text-based PDF.");
            }

            if (resumeText.replace(/\s/g, "").length < 200) {
                throw new Error(
                    "This looks like a scanned PDF with no selectable text. Upload a text-based PDF."
                );
            }

            setStatusText("Generating preview image...");
            setCurrentStep(2);
            const imageFile = await convertPdfToImage(file);
            let imageDataUrl: string | undefined;

            if (imageFile?.file) {
                imageDataUrl = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(String(reader.result));
                    reader.onerror = () => reject(new Error("Failed to read preview image"));
                    reader.readAsDataURL(imageFile.file);
                });
            }

            setStatusText("Analyzing with AI...");
            setCurrentStep(3);
            const id = generateUUID();

            storage.upsert({
                id,
                companyName,
                jobTitle,
                jobDescription,
                fileName: file.name,
                createdAt: Date.now(),
                resumeText,
                imageDataUrl,
                feedback: undefined,
            });

            const response = await postAnalyze({ resumeText, jobTitle, jobDescription });

            if (!response.ok || !response.feedback) {
                throw new Error(response.error || "Failed to get feedback from API");
            }

            const existing = storage.get(id);
            if (existing) {
                storage.upsert({ ...existing, feedback: response.feedback });
            }

            setStatusText("Analysis complete!");
            setCurrentStep(4);
            setTimeout(() => navigate(`/resume/${id}`), 500);
        } catch (err: any) {
            console.error(err);
            setStatusText(`Error: ${err?.message ?? "Failed to analyze resume"}`);
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <Navbar />

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {isProcessing ? (
                    // Processing View
                    <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                        <div className="mb-8">
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-ping opacity-20"></div>
                                <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full w-32 h-32 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{statusText}</h2>
                        <p className="text-gray-600 mb-8">This may take 10-30 seconds...</p>

                        {/* Progress Steps */}
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center justify-between mb-4">
                                {[1, 2, 3, 4].map((step) => (
                                    <div key={step} className="flex flex-col items-center flex-1">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                                            currentStep >= step 
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                                                : 'bg-gray-200 text-gray-400'
                                        }`}>
                                            {currentStep > step ? '✓' : step}
                                        </div>
                                        <div className="text-xs text-gray-600 mt-2">
                                            {step === 1 && 'Extract'}
                                            {step === 2 && 'Preview'}
                                            {step === 3 && 'Analyze'}
                                            {step === 4 && 'Done'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
                                    style={{ width: `${(currentStep / 4) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Upload Form View
                    <>
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                AI-Powered Analysis
                            </div>
                            <h1 className="text-5xl font-bold text-gray-900 mb-4">
                                Get Your Resume <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Score</span>
                            </h1>
                            <p className="text-xl text-gray-600">
                                Upload your resume and job details for instant AI feedback
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                            <form id="upload-form" className="space-y-6">
                                <div>
                                    <label htmlFor="company-name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        name="company-name"
                                        placeholder="e.g., Google, Microsoft, Apple..."
                                        id="company-name"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="job-title" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Job Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="job-title"
                                        placeholder="e.g., Senior Software Engineer"
                                        id="job-title"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="job-description" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Job Description
                                        <span className="text-gray-500 font-normal ml-2">(Optional but recommended)</span>
                                    </label>
                                    <textarea
                                        rows={6}
                                        name="job-description"
                                        placeholder="Paste the job description here for more accurate feedback..."
                                        id="job-description"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="uploader" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Upload Resume <span className="text-red-500">*</span>
                                    </label>
                                    <FileUploader onFileSelect={handleFileSelect} />
                                </div>

                                <button
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    type="button"
                                    onClick={() => {
                                        const form = document.getElementById("upload-form") as HTMLFormElement | null;
                                        if (!form) return;

                                        const formData = new FormData(form);
                                        const companyName = String(formData.get("company-name") || "");
                                        const jobTitle = String(formData.get("job-title") || "");
                                        const jobDescription = String(formData.get("job-description") || "");

                                        if (!file) {
                                            setStatusText("Error: Please upload a PDF resume first.");
                                            return;
                                        }

                                        if (!jobTitle.trim()) {
                                            setStatusText("Error: Job title is required.");
                                            return;
                                        }

                                        handleAnalyze({
                                            companyName: companyName.trim(),
                                            jobTitle: jobTitle.trim(),
                                            jobDescription: jobDescription.trim(),
                                            file,
                                        });
                                    }}
                                >
                                    Analyze My Resume
                                </button>

                                {statusText && !isProcessing && statusText.startsWith("Error") && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                                        {statusText}
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div className="text-center">
                                <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">ATS Compatible</h3>
                                <p className="text-sm text-gray-600">Check if your resume passes Applicant Tracking Systems</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Instant Feedback</h3>
                                <p className="text-sm text-gray-600">Get detailed improvements in under 30 seconds</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Expert Tips</h3>
                                <p className="text-sm text-gray-600">Actionable suggestions to improve every section</p>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default Upload;
