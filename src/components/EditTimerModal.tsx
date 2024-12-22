import React from 'react';
import { useTimerStore } from '../store/useTimerStore';
import { Timer } from '../types/timer';
import { TimerModal } from '../shared/TimerModal';

interface EditTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  timer: Timer;
}

export const EditTimerModal: React.FC<EditTimerModalProps> = ({
  isOpen,
  onClose,
  timer,
}) => {

  const { editTimer } = useTimerStore();

  const editTimedFunction = (title: string, description: string, totalSeconds: number) => {
    editTimer(timer.id, {
      title: title.trim(),
      description: description.trim(),
      duration: totalSeconds,
    })
  }

  return (
    <TimerModal isOpen={isOpen} onClose={onClose} timer={timer} timedFuntion={editTimedFunction} modelType='Edit' />
  );
};