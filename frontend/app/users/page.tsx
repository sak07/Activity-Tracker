"use client";

import { useState } from 'react';
import UserForm from '@/components/UserForm';
import UserList from '@/components/UserList';

export default function UsersPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleUserCreated = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <UserForm onSuccess={handleUserCreated} />
            </div>
            <div className="lg:col-span-2">
                <UserList refreshTrigger={refreshTrigger} />
            </div>
        </div>
    );
}
