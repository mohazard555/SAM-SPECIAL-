
import React from 'react';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const SyncIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 12L4 13m3 3l3-3m6 0v12m0-12l3 3m-3-3l-3 3" />
    </svg>
);


const TechnicalDetails: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <SyncIcon />
            <h3 className="text-2xl font-bold text-white mb-4">شرح ميزة التصدير/الاستيراد</h3>
            <div className="space-y-4 text-gray-300">
                <p><strong className="text-cyan-400">التصدير (Export):</strong> أنشئ ملف نسخة احتياطية بصيغة ZIP أو ملف إعدادات بصيغة JSON. يمكن تحميل النسخة مباشرة إلى جهازك أو حفظها في خدمة سحابة خارجية.</p>
                <p><strong className="text-cyan-400">الاستيراد (Import):</strong> قم برفع ملف ZIP/JSON لاستعادة الملفات والبنية الأصلية. يدعم الاستيراد دمج المحتوى مع خزنتك الحالية أو استبدالها بالكامل.</p>
                <p><strong className="text-cyan-400">API/أدوات المطورين:</strong> واجهة برمجة تطبيقات لاستيراد/تصدير تلقائي ودوري.</p>
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <LockIcon />
            <h3 className="text-2xl font-bold text-white mb-4">نحن نأخذ أمانك على محمل الجد</h3>
            <p className="text-gray-300 leading-relaxed">
              جميع الملفات مشفّرة أثناء الانتقال وفي حالة السكون، وسجلات الدخول محمية، ويمكنك تفعيل المصادقة الثنائية (2FA). بياناتك لن تُباع أو تُشارك دون موافقتك الصريحة. SAM Special يبني الخصوصية افتراضيًا.
            </p>
             <div className="mt-6 flex flex-col space-y-2">
                <div className="flex items-center space-x-2 space-x-reverse bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-green-400">✓</span>
                    <p>تسجيل دخول آمن بكلمة مرور</p>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-green-400">✓</span>
                    <p>خيار المصادقة الثنائية (2FA)</p>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-green-400">✓</span>
                    <p>"نسيت كلمة المرور؟" مع إعادة تعيين آمنة</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechnicalDetails;
