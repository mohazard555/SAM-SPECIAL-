import React from 'react';

const Header: React.FC<{ setView: (view: string) => void; user: { username: string } | null; onLogout: () => void; }> = ({ setView, user, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => setView('landing')} className="text-2xl font-bold text-cyan-400">SAM Special</button>
        <nav className="flex items-center space-x-4 space-x-reverse">
          {user ? (
            <>
              <span className="text-gray-300">أهلاً، {user.username}</span>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setView('login')} className="hidden sm:inline text-gray-300 hover:text-white transition-colors">
                تسجيل الدخول
              </button>
              <button
                onClick={() => setView('register')}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
              >
                أنشئ حسابك
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
