"use client";

import { useState } from 'react';
import { userService } from '../services/api';

export default function UserForm({ onSuccess }: { onSuccess: () => void }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fullName: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await userService.create(formData);
            setFormData({
                username: '',
                email: '',
                fullName: ''
            });
            onSuccess();
        } catch (err: any) {
            console.error('Failed to create user', err);
            setError(err.response?.data?.message || 'Failed to create user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl shadow-2xl shadow-indigo-500/10 transition-all duration-300">
            <div className="border-b border-theme pb-6 mb-6">
                <h3 className="text-2xl font-bold text-theme-fg">
                    Create New User
                </h3>
                <p className="mt-2 text-sm text-theme-muted">Add a new user to the system.</p>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl mb-6">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-theme-muted mb-2">Username</label>
                    <input
                        type="text"
                        required
                        className="block w-full rounded-xl border bg-theme-input border-theme focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4 text-theme-fg transition-all duration-200"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="jdoe"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-theme-muted mb-2">Email</label>
                    <input
                        type="email"
                        required
                        className="block w-full rounded-xl border bg-theme-input border-theme focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4 text-theme-fg transition-all duration-200"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-theme-muted mb-2">Full Name</label>
                    <input
                        type="text"
                        className="block w-full rounded-xl border bg-theme-input border-theme focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4 text-theme-fg transition-all duration-200"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Doe"
                    />
                </div>
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/30 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    {loading ? 'Creating...' : 'Create User'}
                </button>
            </div>
        </form>
    );
}
