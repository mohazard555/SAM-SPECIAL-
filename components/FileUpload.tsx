import React, { useState, useCallback } from 'react';

const FileUpload: React.FC<{ onFileUpload: (file: any) => void }> = ({ onFileUpload }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [feedback, setFeedback] = useState('');

    const processFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            onFileUpload({
                name: file.name,
                type: file.type,
                size: file.size,
                url: e.target.result,
            });
            setFeedback(`تم رفع "${file.name}" بنجاح!`);
            setTimeout(() => setFeedback(''), 3000);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            processFile(event.dataTransfer.files[0]);
        }
    }, [onFileUpload]);

    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(false);
    }, []);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            processFile(event.target.files[0]);
        }
    };
    
    const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">رفع ملف جديد</h2>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-4 border-dashed rounded-2xl p-8 text-center transition-colors duration-300 ${isDragOver ? 'border-cyan-500 bg-gray-800/50' : 'border-gray-600 bg-gray-800'}`}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <UploadIcon />
                    <p className="mt-4 text-xl font-semibold text-white">اسحب وأفلت ملفك هنا</p>
                    <p className="text-gray-400">أو انقر للاختيار من جهازك</p>
                </label>
            </div>
            {feedback && <p className="mt-4 text-center text-green-400 bg-green-500/10 py-2 px-4 rounded-lg">{feedback}</p>}
        </div>
    );
};

export default FileUpload;
