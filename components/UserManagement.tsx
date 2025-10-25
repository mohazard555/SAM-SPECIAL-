import React, { useState } from 'react';

const UserManagement: React.FC<{ users: any[]; onAddUser: (username: string, password: string) => boolean; }> = ({ users, onAddUser }) => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAddUser = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!newUsername || !newPassword) {
            setError('يجب ملء جميع الحقول.');
            return;
        }
        const result = onAddUser(newUsername, newPassword);
        if (result) {
            setSuccess(`تمت إضافة المستخدم "${newUsername}" بنجاح.`);
            setNewUsername('');
            setNewPassword('');
        } else {
            setError(`المستخدم "${newUsername}" موجود بالفعل.`);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">إدارة المستخدمين</h2>
            
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">إضافة مستخدم جديد</h3>
                 {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">{error}</p>}
                 {success && <p className="bg-green-500/20 text-green-400 p-3 rounded-lg mb-4">{success}</p>}
                <form onSubmit={handleAddUser} className="grid sm:grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm" htmlFor="new-username">اسم المستخدم</label>
                        <input
                            type="text"
                            id="new-username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                     <div>
                        <label className="block text-gray-300 mb-2 text-sm" htmlFor="new-password">كلمة المرور</label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                     <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105 h-11">
                        إضافة
                    </button>
                </form>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">قائمة المستخدمين</h3>
            <div className="overflow-x-auto bg-gray-800 rounded-2xl border border-gray-700">
                <table className="w-full text-right">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th className="p-4 font-semibold">اسم المستخدم</th>
                            <th className="p-4 font-semibold">الدور</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="border-t border-gray-700 hover:bg-gray-700/30">
                                <td className="p-4">{user.username}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.role === 'admin' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-gray-600/50 text-gray-300'}`}>
                                        {user.role}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
