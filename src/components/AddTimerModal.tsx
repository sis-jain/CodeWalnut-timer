import React from 'react';
import { useTimerStore } from '../store/useTimerStore';
import { TimerModal } from '../shared/TimerModal';

interface AddTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTimerModal: React.FC<AddTimerModalProps> = ({ isOpen, onClose }) => {
  
  const { addTimer } = useTimerStore();

  if (!isOpen) return null;

  const addTimedFunction = (title: string, description: string, totalSeconds: number) => {
    addTimer({
      title: title.trim(),
      description: description.trim(),
      duration: totalSeconds,
      remainingTime: totalSeconds,
      isRunning: false,
    });
  }

  return (
   <TimerModal isOpen={isOpen} onClose={onClose} timedFuntion={addTimedFunction} modelType={'ADD'} />
  );
};