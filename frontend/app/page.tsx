"use client";

import { useState } from 'react';
import ActivityForm from '@/components/ActivityForm';
import ActivityList from '@/components/ActivityList';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleActivityRecorded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <ActivityForm onSuccess={handleActivityRecorded} />
      </div>
      <div className="lg:col-span-2">
        <ActivityList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
