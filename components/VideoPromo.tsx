
import React from 'react';

const VideoPromo: React.FC = () => {
    const steps = [
        { time: "0-5s", description: "لقطات سريعة: صور عائلية، ملفات عمل، ملفات موسيقى تنتقل إلى شاشة واجهة بسيطة.", voiceover: "كل شيء مهم في مكان واحد..." },
        { time: "5-15s", description: "تظهر شاشة تسجيل دخول SAM Special — إدخال اسم مستخدم وكلمة مرور.", voiceover: "SAM Special: خزنتك الشخصية الآمنة — فقط لك." },
        { time: "15-30s", description: "عرض رفع ملف بالسحب والإفلات، تنظيم تلقائي للصور، وميزة البحث الفوري.", voiceover: "ارفع، نظم، وابحث بسرعة — مدعوم بذكاء Google." },
        { time: "30-40s", description: "أيقونات تصدير/استيراد، زر مشاركة مع تحكم بالخصوصية.", voiceover: "نسخ احتياطي وتصدير متى شئت — تحكّم كامل بالخصوصية." },
        { time: "40-45s", description: "شعار + CTA.", voiceover: "SAM Special — خزنتك. ذكية. آمنة. ابدأ الآن." },
    ];

    return (
        <section className="py-20 bg-gray-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">شاهد SAM Special أثناء العمل</h3>
                    <p className="text-cyan-400 text-lg">سيناريو فيديو ترويجي (30–45 ثانية)</p>
                </div>

                <div className="relative border-r-2 border-cyan-500 mr-4">
                    {steps.map((step, index) => (
                        <div key={index} className="mb-8 flex items-center w-full">
                             <div className="absolute w-4 h-4 bg-gray-900 rounded-full -right-2 border-2 border-cyan-500"></div>
                             <div className="pr-10 w-full">
                                <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                                    <span className="font-bold text-cyan-400 text-sm">{step.time}</span>
                                    <p className="text-gray-200 mt-2">{step.description}</p>
                                    <p className="text-gray-400 italic mt-3">🎙️ التعليق الصوتي: "{step.voiceover}"</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoPromo;
