
import React from 'react';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const featuresList = [
    { title: "حساب خاص لكل مستخدم", description: "اسم مستخدم وكلمة مرور لكل خزنة شخصية." },
    { title: "رفع سهل لأي نوع ملف", description: "صور، فيديو، صوت، مستندات، أرشيفات… بدون قيود." },
    { title: "تنظيم ذكي", description: "تصنيف تلقائي واقتراح وسوم بفضل قدرات Google AI." },
    { title: "استرجاع سريع", description: "بحث نصي ومرئي للعثور على الملفات فورًا." },
    { title: "تصدير واستيراد", description: "حمل نسخة احتياطية أو استرجعها في أي وقت (ZIP / JSON / API)." },
    { title: "تشفير وحماية الخصوصية", description: "بياناتك ملكك — سياسات خصوصية واضحة." },
];

const Features: React.FC = () => {
    return (
        <section className="py-20 bg-gray-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                     <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">خزنتك الرقمية الخاصة. آمنة. ذكية. متاحة دائمًا.</h3>
                    <p className="text-cyan-400 text-lg">احفظ كل ما يهمك في SAM Special — مساحة تخزين خاصة وآمنة لكل مستخدم.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresList.map((feature, index) => (
                        <div key={index} className="flex items-start p-6 bg-gray-900 rounded-xl space-x-4 space-x-reverse hover:bg-gray-700 transition-colors duration-300 transform hover:-translate-y-1">
                            <CheckIcon />
                            <div>
                                <h4 className="font-bold text-lg text-white mb-1">{feature.title}</h4>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="mt-20 max-w-4xl mx-auto text-center p-8 bg-gray-900 rounded-2xl border border-gray-700 shadow-lg">
                    <h4 className="text-2xl font-bold text-white mb-4">حل التخزين الشخصي الأمثل</h4>
                    <p className="text-gray-300 leading-relaxed">
                        SAM Special هو حل التخزين الشخصي المدعوم بتقنيات Google AI Studio، صُمّم ليخزّن ملفاتك بأمان مع تجربة مستخدم بسيطة وسريعة. كل مستخدم يحصل على خزنة خاصة مع إمكانية إنشاء اسم مستخدم وكلمة مرور، رفع ملفات متعددة الصيغ، وتنظيم آلي يسهل العثور على ما تحتاجه. تقدّم المنصة خيارات تصدير واستيراد كاملة لعمل نسخ احتياطية أو لنقل بياناتك إلى مكان آخر. مثالي للأفراد الذين يريدون مساحة آمنة لإحتفاظ بذكرياتهم وملفات العمل في مكان واحد.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Features;
