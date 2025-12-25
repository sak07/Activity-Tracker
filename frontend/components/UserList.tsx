"use client";

import { useState, useEffect } from 'react';
import { User } from '../types';
import { userService } from '../services/api';
import { format } from 'date-fns';

export default function UserList({ refreshTrigger }: { refreshTrigger: number }) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUsers();
    }, [refreshTrigger]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getAll();
            setUsers(data);
        } catch (error) {
            console.error('Failed to load users', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass rounded-3xl p-8 shadow-lg">
            <div className="border-b border-theme pb-6 mb-6">
                <h3 className="text-2xl font-bold text-theme-fg">
                    Users
                </h3>
                <p className="mt-2 text-sm text-theme-muted">Manage and view all registered system users.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {users.map((user) => (
                    <div key={user.id} className="glass rounded-2xl p-6 premium-card border border-white/20 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-base font-bold text-theme-fg group-hover:text-indigo-600 transition-colors">
                                    @{user.username}
                                </p>
                                <p className="text-sm text-theme-muted">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-theme-fg">
                                {user.fullName || 'No name'}
                            </p>
                            <p className="text-xs text-zinc-400 mt-1 bg-zinc-100/50 px-2 py-1 rounded-lg inline-block">
                                Joined {format(new Date(user.createdAt), 'MMM d, yyyy')}
                            </p>
                        </div>
                    </div>
                ))}

                {users.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <div className="p-4 bg-zinc-100 rounded-full inline-block mb-4">
                            <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <p className="text-lg font-medium text-theme-fg">No users found</p>
                        <p className="text-sm text-theme-muted mt-1">Create a new user to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
