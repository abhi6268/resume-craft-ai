import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatSize } from '../lib/utils';

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: maxFileSize,
    });

    const file = acceptedFiles[0] || null;
    const rejection = fileRejections[0];

    return (
        <div>
            <div 
                {...getRootProps()} 
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer ${
                    isDragActive 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : file 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50'
                }`}
            >
                <input {...getInputProps()} />

                {file ? (
                    // File Selected State
                    <div className="flex items-center gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-200">
                            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{file.name}</p>
                            <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-green-600 font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                File ready for analysis
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onFileSelect?.(null);
                            }}
                            className="flex-shrink-0 bg-red-100 hover:bg-red-200 p-2.5 rounded-xl transition-colors"
                        >
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    // Upload State
                    <div className="text-center">
                        <div className="mb-4">
                            {isDragActive ? (
                                <div className="bg-indigo-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto">
                                    <svg className="w-10 h-10 text-indigo-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="bg-indigo-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto">
                                    <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="mb-2">
                            <p className="text-base font-semibold text-gray-900 mb-1">
                                {isDragActive ? 'Drop your resume here' : 'Drop your resume or click to browse'}
                            </p>
                            <p className="text-sm text-gray-500">
                                PDF files up to {formatSize(maxFileSize)}
                            </p>
                        </div>
                        
                        {!isDragActive && (
                            <button
                                type="button"
                                className="mt-4 inline-flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                Choose File
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Error Messages */}
            {rejection && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-red-900">Upload failed</p>
                            <p className="text-sm text-red-700 mt-1">
                                {rejection.errors[0]?.code === 'file-too-large' 
                                    ? `File is too large. Maximum size is ${formatSize(maxFileSize)}`
                                    : 'Please upload a valid PDF file'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
