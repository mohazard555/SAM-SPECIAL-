

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import TechnicalDetails from './components/TechnicalDetails';
import VideoPromo from './components/VideoPromo';
import SocialAds from './components/SocialAds';
import Faq from './components/Faq';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import UserManagement from './components/UserManagement';
import FileUpload from './components/FileUpload';
import FileGallery from './components/FileGallery';
import AnnouncementsManagement from './components/AnnouncementsManagement';
import AnnouncementsList from './components/AnnouncementsList';

// Types
type User = { username: string; role: 'admin' | 'user' };
type StoredUser = { username: string; password_hash: number; role: 'admin' | 'user' };
type StoredFile = { id: number; name: string; type: string; size: number; url: string; owner: string };
type Announcement = { id: number; title: string; content: string; };


// A simple hashing function for demonstration. NOT for production use.
const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

// This hook is now SSR-safe.
const useStickyState = <T,>(defaultValue: T, key: string) => {
    const [value, setValue] = useState<T>(() => {
        // Prevent SSR errors by checking for 'window'
        if (typeof window === 'undefined') {
            return defaultValue;
        }
        try {
            const stickyValue = window.localStorage.getItem(key);
            if (stickyValue !== null) {
                return JSON.parse(stickyValue);
            }
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error);
        }
        return defaultValue;
    });

    useEffect(() => {
        // This effect runs only on the client where localStorage is available.
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error);
        }
    }, [key, value]);

    return [value, setValue];
};


// --- Reusable Auth Form Component ---
const AuthForm = ({ title, buttonText, onSubmit, setView, switchView, switchText }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!username || !password) {
            setError('اسم المستخدم وكلمة المرور مطلوبان.');
            return;
        }
        const success = onSubmit(username, password);
        if (!success) {
            setError('بيانات الاعتماد غير صالحة أو اسم المستخدم موجود بالفعل.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                 <button onClick={() => setView('landing')} className="text-cyan-400 mb-4 hover:underline">&larr; العودة إلى الصفحة الرئيسية</button>
                <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
                    <h2 className="text-3xl font-bold text-center text-white mb-2">{title}</h2>
                    <p className="text-center text-gray-400 mb-8">للوصول إلى خزنتك الخاصة.</p>
                    {error && <p className="bg-red-500/20 text-red-400 text-center p-3 rounded-lg mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2" htmlFor="username">اسم المستخدم</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2" htmlFor="password">كلمة المرور</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-transform duration-300 hover:scale-105">
                            {buttonText}
                        </button>
                    </form>
                    <p className="text-center text-gray-400 mt-6">
                        {switchText} <button onClick={() => setView(switchView)} className="text-cyan-400 hover:underline font-semibold">اضغط هنا</button>
                    </p>
                </div>
            </div>
        </div>
    );
};


// --- Page Components ---
const LandingPage = ({ setView, announcements }) => (
    <div className="bg-gray-900 text-gray-200">
        <Header setView={setView} user={null} onLogout={() => { }} />
        <main>
            <Hero setView={setView} />
            <AnnouncementsList announcements={announcements} />
            <Features />
            <TechnicalDetails />
            <VideoPromo />
            <SocialAds />
            <Faq />
            <CtaSection setView={setView} />
        </main>
        <Footer />
    </div>
);

const DashboardPage = ({ user, onLogout, users, files, announcements, onAddUser, onAddFile, onDeleteFile, onEditFile, onImportFiles, onAddAnnouncement, onDeleteAnnouncement }) => {
    const [activeTab, setActiveTab] = useState('gallery');

    // Icons
    const GalleryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
    const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a4 4 0 110-5.292" /></svg>;
    const AnnouncementIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.136a1.76 1.76 0 011.164-2.288l5.397-1.936a1.76 1.76 0 012.288 1.164l2.147 6.136a1.76 1.76 0 01-3.417.592z" /></svg>;
    const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

    const NavItem = ({ tabName, icon, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center w-full px-4 py-3 text-right rounded-lg transition-colors duration-200 ${activeTab === tabName ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
        >
            {label}
            {icon}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex">
            <aside className="w-64 bg-gray-800 p-4 border-l border-gray-700 flex flex-col">
                <div className="text-center mb-8 pt-4">
                    <div className="w-20 h-20 rounded-full bg-cyan-600 mx-auto mb-3 flex items-center justify-center text-4xl font-bold border-4 border-gray-700">{user.username.charAt(0).toUpperCase()}</div>
                    <h3 className="font-semibold text-white text-xl">{user.username}</h3>
                    <p className="text-sm text-gray-400 capitalize">{user.role}</p>
                </div>
                <nav className="flex-grow space-y-2">
                    <NavItem tabName="gallery" icon={<GalleryIcon />} label="المعرض" />
                    <NavItem tabName="upload" icon={<UploadIcon />} label="رفع ملف" />
                    {user.role === 'admin' && (
                        <>
                            <div className="pt-4 mt-4 border-t border-gray-700">
                                <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">لوحة التحكم</p>
                            </div>
                            <NavItem tabName="users" icon={<UsersIcon />} label="إدارة المستخدمين" />
                            <NavItem tabName="announcements" icon={<AnnouncementIcon />} label="إدارة الإعلانات" />
                        </>
                    )}
                </nav>
                <div className="mt-auto">
                     <button
                        onClick={onLogout}
                        className="flex items-center w-full px-4 py-3 text-right rounded-lg transition-colors duration-200 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                    >
                        تسجيل الخروج
                        <LogoutIcon />
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                 {activeTab === 'gallery' && <FileGallery files={files} onDeleteFile={onDeleteFile} onEditFile={onEditFile} onImportFiles={onImportFiles} />}
                 {activeTab === 'upload' && <FileUpload onFileUpload={onAddFile} />}
                 {user.role === 'admin' && activeTab === 'users' && <UserManagement users={users} onAddUser={onAddUser} />}
                 {user.role === 'admin' && activeTab === 'announcements' && <AnnouncementsManagement announcements={announcements} onAddAnnouncement={onAddAnnouncement} onDeleteAnnouncement={onDeleteAnnouncement} />}
            </main>
        </div>
    );
};

// --- Main App Component ---
const App = () => {
    const [view, setView] = useState('landing');
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    
    const [users, setUsers] = useStickyState<StoredUser[]>([], 'sam-special-users');
    const [files, setFiles] = useStickyState<StoredFile[]>([], 'sam-special-files');
    const [announcements, setAnnouncements] = useStickyState<Announcement[]>([], 'sam-special-announcements');

    // Create a default admin user if none exist
    useEffect(() => {
        if (users.length === 0) {
            setUsers([{ username: 'admin', password_hash: hashString('admin'), role: 'admin' }]);
        }
    }, [users, setUsers]);

    // Handlers
    const handleRegister = (username, password) => {
        if (users.some(u => u.username === username)) {
            return false; // User already exists
        }
        const newUser: StoredUser = { username, password_hash: hashString(password), role: 'user' };
        setUsers([...users, newUser]);
        setCurrentUser({ username, role: 'user' });
        setView('dashboard');
        return true;
    };

    const handleLogin = (username, password) => {
        const user = users.find(u => u.username === username && u.password_hash === hashString(password));
        if (user) {
            setCurrentUser({ username: user.username, role: user.role });
            setView('dashboard');
            return true;
        }
        return false;
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setView('landing');
    };

    const handleAddUser = (username, password) => {
        if (users.some(u => u.username === username)) return false;
        const newUser: StoredUser = { username, password_hash: hashString(password), role: 'user' };
        setUsers([...users, newUser]);
        return true;
    };
    
    const handleAddFile = (fileData) => {
        if (!currentUser) return;
        const newFile: StoredFile = { ...fileData, id: Date.now(), owner: currentUser.username };
        setFiles([...files, newFile]);
    };

    const handleDeleteFile = (id) => {
        setFiles(files.filter(f => f.id !== id));
    };

    const handleEditFile = (id, newName) => {
        setFiles(files.map(f => f.id === id ? { ...f, name: newName } : f));
    };

    const handleImportFiles = (importedFiles) => {
        if(!currentUser) return;
        const newFiles = importedFiles.map((file, index) => ({
            ...file,
            id: Date.now() + index, // Ensure unique IDs
            owner: currentUser.username
        }));
        setFiles([...files, ...newFiles]);
    };

    const handleAddAnnouncement = (title, content) => {
        const newAnnouncement: Announcement = { id: Date.now(), title, content };
        setAnnouncements([...announcements, newAnnouncement]);
    };

    const handleDeleteAnnouncement = (id) => {
        setAnnouncements(announcements.filter(a => a.id !== id));
    };
    
    // Derived state for current user's files
    const userFiles = files.filter(f => f.owner === currentUser?.username);

    if (view === 'login') {
        return <AuthForm title="تسجيل الدخول" buttonText="دخول" onSubmit={handleLogin} setView={setView} switchView="register" switchText="ليس لديك حساب؟" />;
    }
    if (view === 'register') {
        return <AuthForm title="إنشاء حساب جديد" buttonText="تسجيل" onSubmit={handleRegister} setView={setView} switchView="login" switchText="لديك حساب بالفعل؟" />;
    }
    if (view === 'dashboard' && currentUser) {
        return <DashboardPage 
            user={currentUser} 
            onLogout={handleLogout} 
            users={users}
            files={userFiles}
            announcements={announcements}
            onAddUser={handleAddUser}
            onAddFile={handleAddFile}
            onDeleteFile={handleDeleteFile}
            onEditFile={handleEditFile}
            onImportFiles={handleImportFiles}
            onAddAnnouncement={handleAddAnnouncement}
            onDeleteAnnouncement={handleDeleteAnnouncement}
        />;
    }
    
    return <LandingPage setView={setView} announcements={announcements} />;
};

export default App;