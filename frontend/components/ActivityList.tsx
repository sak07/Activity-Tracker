"use client";

import { useState, useEffect } from 'react';
import { Activity, Page, ActivityType } from '../types';
import { activityService } from '../services/api';
import { format } from 'date-fns';

export default function ActivityList({ refreshTrigger }: { refreshTrigger: number }) {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [page, setPage] = useState<Page<Activity> | null>(null);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState<ActivityType | ''>('');

    useEffect(() => {
        loadActivities(0);
    }, [refreshTrigger, filterType]);

    const loadActivities = async (pageNumber: number) => {
        setLoading(true);
        try {
            let data;
            if (filterType) {
                data = await activityService.getByType(filterType, pageNumber);
            } else {
                data = await activityService.getAll(pageNumber);
            }
            setActivities(data.content);
            setPage(data);
        } catch (error) {
            console.error('Failed to load activities', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-center glass p-6 rounded-3xl shadow-lg gap-4 sm:gap-0">
                <div>
                    <h3 className="text-2xl font-bold text-theme-fg">
                        Recent Activities
                    </h3>
                    <p className="mt-1 text-sm text-theme-muted">Monitor user actions in real-time.</p>
                </div>
                <div className="relative">
                    <select
                        className="appearance-none w-full sm:w-auto rounded-xl border bg-theme-input border-theme focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3 pl-4 pr-10 text-theme-fg transition-all duration-200 cursor-pointer"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as ActivityType)}
                    >
                        <option value="">All Activity Types</option>
                        {Object.values(ActivityType).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="glass rounded-2xl p-6 premium-card border border-white/20">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${activity.activityType === 'LOGIN' ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' :
                                    activity.activityType === 'LOGOUT' ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-500/10 dark:text-zinc-400' :
                                        activity.activityType === 'PURCHASE' ? 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400' :
                                            'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
                                    }`}>
                                    {/* Icon placeholder could go here */}
                                    <span className="text-xs font-bold">{activity.activityType.substring(0, 2)}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-theme-fg">
                                            {activity.activityType}
                                        </span>
                                        <span className="text-sm text-theme-muted">
                                            by <span className="font-medium text-indigo-600">{activity.username || `User #${activity.userId}`}</span>
                                        </span>
                                    </div>
                                    <p className="text-sm text-theme-muted leading-relaxed">
                                        {activity.description || 'No description provided.'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-xs font-medium text-zinc-400 bg-zinc-100/50 px-3 py-1 rounded-full">
                                    {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                                </span>
                            </div>
                        </div>

                        {activity.metadata && (
                            <div className="mt-4 pt-4 border-t border-zinc-100">
                                <code className="text-xs font-mono text-zinc-500 block bg-zinc-100/30 p-3 rounded-lg overflow-x-auto">
                                    {activity.metadata}
                                </code>
                            </div>
                        )}
                    </div>
                ))}

                {activities.length === 0 && !loading && (
                    <div className="glass rounded-3xl p-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="p-4 bg-zinc-100 rounded-full mb-4">
                                <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-theme-fg">No activities found</h3>
                            <p className="text-sm text-theme-muted mt-1">
                                Try adjusting your filters or record a new activity to get started.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {page && page.totalPages > 1 && (
                <div className="flex justify-between items-center glass p-4 rounded-2xl">
                    <button
                        onClick={() => loadActivities(page.number - 1)}
                        disabled={page.first}
                        className="px-6 py-2.5 rounded-xl text-sm font-medium text-theme-muted bg-theme-secondary hover-bg-theme-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ring-1 border-theme"
                    >
                        Previous
                    </button>
                    <span className="text-sm font-medium text-theme-muted bg-theme-secondary px-4 py-2 rounded-lg">
                        Page {page.number + 1} of {page.totalPages}
                    </span>
                    <button
                        onClick={() => loadActivities(page.number + 1)}
                        disabled={page.last}
                        className="px-6 py-2.5 rounded-xl text-sm font-medium text-theme-muted bg-theme-secondary hover-bg-theme-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ring-1 border-theme"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
