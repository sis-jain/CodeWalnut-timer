import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { ModalButton } from '../shared/ModalButton';

interface TimerControlsProps {
  isRunning: boolean;
  remainingTime: number;
  onToggle: () => void;
  onRestart: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  remainingTime,
  onToggle,
  onRestart,
}) => {
  const isCompleted = remainingTime <= 0;
  
  if (isCompleted) {
    return (
      <ModalButton
        onClick={onRestart}
        className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
        title="Restart Timer"
      >
        <RotateCcw className="w-6 h-6" />
      </ModalButton>
    );
  }

  return (
    <ModalButton
      onClick={onToggle}
      className={`p-3 rounded-full transition-colors ${
        isRunning
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-green-100 text-green-600 hover:bg-green-200'
      }`}
      title={isRunning ? 'Pause Timer' : 'Start Timer'}
    >
      {isRunning ? (
        <Pause className="w-6 h-6" />
      ) : (
        <Play className="w-6 h-6" />
      )}
    </ModalButton>
  );
};