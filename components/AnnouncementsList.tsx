
import React from 'react';

const AnnouncementsList: React.FC<{ announcements: any[] }> = ({ announcements }) => {
    if (announcements.length === 0) {
        return null;
    }
    
    // Show latest 3 announcements
    const recentAnnouncements = announcements.slice(-3).reverse();

    return (
        <section className="py-20 bg-gray-800/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                     <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">آخر الأخبار والإعلانات</h3>
                    <p className="text-cyan-400 text-lg">ابق على اطلاع بآخر التحديثات والميزات الجديدة.</p>
                </div>
                <div className="max-w-4xl mx-auto space-y-6">
                    {recentAnnouncements.map(ann => (
                        <div key={ann.id} className="bg-gray-900/70 p-6 rounded-xl border border-gray-700 backdrop-blur-sm shadow-lg transform transition-transform duration-300 hover:-translate-y-1">
                            <h4 className="font-bold text-xl text-cyan-400 mb-2">{ann.title}</h4>
                            <p className="text-gray-300">{ann.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AnnouncementsList;
