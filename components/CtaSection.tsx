import React from 'react';

const CtaSection: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          جاهز لبدء خزنتك الخاصة؟
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          ابدأ خزنتك الآن — مجانًا لمدة 14 يومًا. لا حاجة لبطاقة ائتمان.
        </p>
        <button onClick={() => setView('register')} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform duration-300 hover:scale-105 shadow-lg shadow-cyan-500/20">
            أنشئ حسابك المجاني
        </button>
      </div>
    </section>
  );
};

export default CtaSection;
