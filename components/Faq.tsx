
import React, { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-4">
      <button
        className="w-full flex justify-between items-center text-right focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-lg font-medium text-white">{question}</h4>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <p className="text-gray-400 pr-2">{answer}</p>
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
    const faqData = [
        {
            question: "هل يمكنني مشاركة ملف واحد فقط؟",
            answer: "نعم — كل ملف يمكن مشاركته برابط مؤقت أو دائم مع إعدادات أذونات."
        },
        {
            question: "ما صيغ الملفات المدعومة؟",
            answer: "كل الصيغ الشائعة: JPG, PNG, MP4, MP3, PDF, DOCX, ZIP، وغير ذلك."
        },
        {
            question: "كيف يعمل التصدير؟",
            answer: "تصدير كامل للخزنة بصيغة ZIP + ملف إعدادات JSON لاستعادة البنية."
        },
        {
            question: "هل البيانات مشفّرة؟",
            answer: "نعم — تشفير أثناء النقل وفي حالة التخزين."
        }
    ];
    return (
        <section className="py-20 bg-gray-800">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">الأسئلة الشائعة</h3>
                    <p className="text-cyan-400 text-lg">إجابات سريعة على استفساراتك.</p>
                </div>
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <FaqItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
