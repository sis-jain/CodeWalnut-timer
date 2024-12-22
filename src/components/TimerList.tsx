import React from 'react';
import { TimerItem } from '../shared/TimerItem';
import { useTimerStore } from '../store/useTimerStore';
import { EmptyState } from './EmptyState';

export const TimerList: React.FC = () => {
  const { timers } = useTimerStore();

  return (
    <div className="space-y-4 min-h-[400px]">
      {timers.length === 0 ? (
        <div className="h-[400px] flex flex-col items-center justify-center">
          <EmptyState />
          <p className="text-center text-gray-500 text-xl font-medium">
            No timers yet. Add one to get started!
          </p>
          <p className="text-center text-gray-400 mt-2">
            Click the "Add Timer" button above to create your first timer.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {timers.map((timer) => (
            <TimerItem key={timer.id} timer={timer} />
          ))}
        </div>
      )}
    </div>
  );
};