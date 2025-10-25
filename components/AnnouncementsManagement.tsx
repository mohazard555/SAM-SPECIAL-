
import React, { useState } from 'react';

const AnnouncementsManagement: React.FC<{
    announcements: any[];
    onAddAnnouncement: (title: string, content: string) => void;
    onDeleteAnnouncement: (id: number) => void;
}> = ({ announcements, onAddAnnouncement, onDeleteAnnouncement }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) {
            setError('يجب ملء العنوان والمحتوى.');
            return;
        }
        onAddAnnouncement(title, content);
        setTitle('');
        setContent('');
        setError('');
    };

    const handleDelete = (id, title) => {
        if (window.confirm(`هل أنت متأكد أنك تريد حذف الإعلان "${title}"؟`)) {
            onDeleteAnnouncement(id);
        }
    };
    
    const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">إدارة الإعلانات</h2>

            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">إضافة إعلان جديد</h3>
                {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm" htmlFor="ann-title">العنوان</label>
                        <input
                            type="text"
                            id="ann-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm" htmlFor="ann-content">المحتوى</label>
                        <textarea
                            id="ann-content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div className="text-left">
                        <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-transform duration-300 hover:scale-105">
                            نشر الإعلان
                        </button>
                    </div>
                </form>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">الإعلانات الحالية</h3>
             <div className="space-y-4">
                {announcements.length > 0 ? (
                    announcements.map(ann => (
                        <div key={ann.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-white">{ann.title}</h4>
                                <p className="text-gray-400">{ann.content}</p>
                            </div>
                            <button 
                                onClick={() => handleDelete(ann.id, ann.title)} 
                                title="حذف" 
                                className="p-2 rounded-full text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors flex-shrink-0 mr-4">
                                <DeleteIcon />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-8">لا توجد إعلانات حاليًا.</p>
                )}
            </div>
        </div>
    );
};

export default AnnouncementsManagement;
