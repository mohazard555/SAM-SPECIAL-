import React, { useRef } from 'react';

const FileGallery: React.FC<{ files: any[], onDeleteFile: (id: number) => void, onEditFile: (id: number, newName: string) => void, onImportFiles: (files: any[]) => void }> = ({ files, onDeleteFile, onEditFile, onImportFiles }) => {
    
    const importInputRef = useRef<HTMLInputElement>(null);

    // --- ICONS ---
    const FileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
    const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
    const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
    const PrintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>;

    // --- HELPERS ---
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    // --- HANDLERS ---
    const handleDelete = (id, name) => {
        if (window.confirm(`هل أنت متأكد أنك تريد حذف "${name}"؟`)) {
            onDeleteFile(id);
        }
    };
    
    const handleEdit = (id, currentName) => {
        const newName = prompt('أدخل الاسم الجديد للملف:', currentName);
        if (newName && newName.trim() !== '') {
            onEditFile(id, newName.trim());
        }
    };
    
    const handleDownload = (file) => {
         const link = document.createElement('a');
         link.href = file.url;
         link.download = file.name;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
    };

    const handlePrint = (file) => {
        const printWindow = window.open(file.url, '_blank');
        if(printWindow) {
            printWindow.onload = () => {
                printWindow.print();
            };
        }
    };

    const handleExport = () => {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(files, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "sam-special-vault-export.json";
        link.click();
    };

    const handleImportClick = () => {
        importInputRef.current?.click();
    };

    const handleImport = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const result = e.target?.result as string;
                const importedData = JSON.parse(result);
                onImportFiles(importedData);
                alert('تم استيراد الملفات بنجاح!');
            } catch (error) {
                alert('فشل في قراءة ملف JSON. يرجى التأكد من أن الملف بالتنسيق الصحيح.');
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Reset input
    };

    // --- CATEGORIZATION ---
    const images = files.filter(f => f.type.startsWith('image/'));
    const videos = files.filter(f => f.type.startsWith('video/'));
    const music = files.filter(f => f.type.startsWith('audio/'));
    const others = files.filter(f => !f.type.startsWith('image/') && !f.type.startsWith('video/') && !f.type.startsWith('audio/'));
    
    // --- RENDER ---
    // Fix: Explicitly type FileCard as a React Function Component (React.FC) to ensure TypeScript recognizes it can accept the 'key' prop.
    const FileCard: React.FC<{ file: any }> = ({ file }) => (
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 group relative">
            <div className="h-40 flex items-center justify-center bg-gray-900 overflow-hidden">
                {file.type.startsWith('image/') ? (
                    <img src={file.url} alt={file.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                    <FileIcon />
                )}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-white truncate" title={file.name}>{file.name}</h3>
                <p className="text-sm text-gray-400">{formatBytes(file.size)}</p>
            </div>
            {/* --- Actions Overlay --- */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-2 space-x-reverse">
                    <button onClick={() => handleEdit(file.id, file.name)} title="إعادة تسمية" className="p-2 rounded-full bg-gray-700 hover:bg-cyan-500 text-white transition-colors"><EditIcon /></button>
                    <button onClick={() => handleDelete(file.id, file.name)} title="حذف" className="p-2 rounded-full bg-gray-700 hover:bg-red-500 text-white transition-colors"><DeleteIcon /></button>
                    <button onClick={() => handleDownload(file)} title="تحميل" className="p-2 rounded-full bg-gray-700 hover:bg-green-500 text-white transition-colors"><DownloadIcon /></button>
                    {file.type.startsWith('image/') && <button onClick={() => handlePrint(file)} title="طباعة" className="p-2 rounded-full bg-gray-700 hover:bg-blue-500 text-white transition-colors"><PrintIcon /></button>}
                </div>
            </div>
        </div>
    );
    
    const CategorySection = ({ title, files }) => {
        if (files.length === 0) return null;
        return (
            <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-4 pb-2 border-b-2 border-gray-700">{title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {files.map(file => <FileCard key={file.id} file={file} />)}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">معرض الملفات</h2>
                <div className="flex gap-2">
                    <input type="file" ref={importInputRef} onChange={handleImport} accept=".json" className="hidden" />
                    <button onClick={handleImportClick} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">استيراد</button>
                    <button onClick={handleExport} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">تصدير</button>
                </div>
            </div>

            {files.length === 0 ? (
                 <div className="text-center py-20 bg-gray-800 rounded-2xl">
                    <FileIcon />
                    <h3 className="mt-4 text-xl font-semibold text-white">خزنتك فارغة</h3>
                    <p className="text-gray-400">انتقل إلى قسم "رفع الملفات" للبدء.</p>
                </div>
            ) : (
                <>
                    <CategorySection title="الصور" files={images} />
                    <CategorySection title="الفيديوهات" files={videos} />
                    <CategorySection title="الموسيقى" files={music} />
                    <CategorySection title="ملفات أخرى" files={others} />
                </>
            )}
        </div>
    );
};

export default FileGallery;