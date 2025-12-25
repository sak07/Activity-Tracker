"use client";

import { useState, useEffect } from 'react';
import { ActivityType, User } from '../types';
import { activityService, userService } from '../services/api';

export default function ActivityForm({ onSuccess }: { onSuccess: () => void }) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        activityType: ActivityType.OTHER,
        description: '',
        metadata: ''
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await userService.getAll();
            setUsers(data);
        } catch (error) {
            console.error('Failed to load users', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await activityService.create({
                userId: Number(formData.userId),
                activityType: formData.activityType,
                description: formData.description,
                metadata: formData.metadata
            });
            setFormData({
                userId: '',
                activityType: ActivityType.OTHER,
                description: '',
                metadata: ''
            });
            onSuccess();
        } catch (error) {
            console.error('Failed to create activity', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl shadow-2xl shadow-indigo-500/10 transition-all duration-300">
            <div className="border-b border-theme pb-6 mb-6">
                <h3 className="text-2xl font-bold text-theme-fg">
                    Record Activity
                </h3>
                <p className="mt-2 text-sm text-theme-muted">Log a new user action in the system.</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-theme-muted mb-2">User</label>
                    <select
                        required
                        className="block w-full rounded-xl border bg-theme-input border-theme focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4 text-theme-fg transition-all duration-200"
                        value={formData.userId}
                        onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    >
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username} ({user.email})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-theme-muted mb-2">Activity Type</label>
                    <select
                        required
                        className="block w-full rounded-xl border bg-theme-input border-theme focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4 text-theme-fg transition-all duration-200"
                        value={formData.activityType}
                        onChange={(e) => setFormData({ ...formData, activityType: e.target.value as ActivityType })}
                    >
                        {Object.values(ActivityType).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-theme-muted mb-2">Description</label>
                    <textarea
                        className="block w-full rounded-xl border bg-theme-input border-theme focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4 text-theme-fg transition-all duration-200 resize-none"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the activity..."
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-theme-muted mb-2">Metadata (JSON)</label>
                    <textarea
                        className="block w-full rounded-xl border bg-theme-input border-theme focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4 text-theme-fg transition-all duration-200 font-mono text-xs resize-none"
                        rows={2}
                        value={formData.metadata}
                        onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
                        placeholder='{"key": "value"}'
                    />
                </div>
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/30 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    {loading ? 'Recording...' : 'Record Activity'}
                </button>
            </div>
        </form>
    );
}
