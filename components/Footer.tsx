
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="container mx-auto px-6 py-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} SAM Special. جميع الحقوق محفوظة.</p>
        <div className="mt-4 flex justify-center space-x-6 space-x-reverse">
            <a href="#privacy" className="hover:text-cyan-400 transition-colors">سياسة الخصوصية</a>
            <a href="#terms" className="hover:text-cyan-400 transition-colors">شروط الخدمة</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">اتصل بنا</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
