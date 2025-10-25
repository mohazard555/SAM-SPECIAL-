import React from 'react';

const Hero: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          خزنة رقمية بذكاء Google — خصوصيتك أولًا
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          انضم إلى SAM Special واحصل على مساحة تخزين شخصية مُدارة بالذكاء الاصطناعي من Google AI Studio: رفع جميع أنواع الملفات، تنظيم ذكي، استرجاع سريع، وتشفير لحماية خصوصيتك. سجّل اسم مستخدم وكلمة مرور — وكل مستخدم له خزينة خاصة به.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button onClick={() => setView('register')} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-300 hover:scale-105">
            سجل الآن
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-300 hover:scale-105">
            تجربة مجانية
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
