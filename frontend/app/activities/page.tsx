"use client";

import ActivityList from '@/components/ActivityList';

export default function ActivitiesPage() {
    return (
        <div className="space-y-8">
            <div className="glass p-8 rounded-3xl shadow-lg">
                <h3 className="text-3xl font-bold text-theme-fg">
                    All Activities
                </h3>
                <p className="mt-2 text-theme-muted">
                    Comprehensive list of all system activities.
                </p>
            </div>
            <ActivityList refreshTrigger={0} />
        </div>
    );
}
