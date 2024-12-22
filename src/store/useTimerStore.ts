import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Timer } from '../types/timer';
import { getDataFromLocalStorage, setDataInLocalStorage } from '../utils/storage';

const initialState = {
  timers: getDataFromLocalStorage(),
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    addTimer: (state, action) => {
      state.timers.push({
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      });
      setDataInLocalStorage(state.timers);
    },
    deleteTimer: (state, action) => {
      state.timers = state.timers.filter((timer: Timer) => timer.id !== action.payload);
      setDataInLocalStorage(state.timers);
    },
    toggleTimer: (state, action) => {
      const timer = state.timers.find((timer: Timer) => timer.id === action.payload);
      if (timer) {
        timer.isRunning = !timer.isRunning;
      }
    },
    updateTimer: (state, action) => {
      state.timers.forEach((timer: Timer) => {
        if (timer.isRunning && timer.remainingTime > 0) {
          timer.remainingTime -= 1;
        }
        if (timer.remainingTime <= 0 && timer.isRunning) {
          timer.isRunning = false; // Stop timers that have ended
        }
      });
    },
    restartTimer: (state, action) => {
      const timer = state.timers.find((timer: Timer) => timer.id === action.payload);
      if (timer) {
        timer.remainingTime = timer.duration;
        timer.isRunning = false;
      }
    },
    editTimer: (state, action) => {
      const timer = state.timers.find((timer: Timer) => timer.id === action.payload.id);
      if (timer) {
        Object.assign(timer, action.payload.updates);
        timer.remainingTime = action.payload.updates.duration || timer.duration;
        timer.isRunning = false;
      }
      setDataInLocalStorage(state.timers);
    },
  },
});

const store = configureStore({
  reducer: timerSlice.reducer,
});

export { store };

export const {
  addTimer,
  deleteTimer,
  toggleTimer,
  updateTimer,
  restartTimer,
  editTimer,
} = timerSlice.actions;

export const useTimerStore = () => {
  const dispatch = useDispatch();
  const timers = useSelector((state: { timers: Timer[] }) => state.timers);

  return {
    timers,
    addTimer: (timer: Omit<Timer, 'id' | 'createdAt'>) => dispatch(addTimer(timer)),
    deleteTimer: (id: string) => dispatch(deleteTimer(id)),
    toggleTimer: (id: string) => dispatch(toggleTimer(id)),
    updateTimer: (id: string) => dispatch(updateTimer(id)),
    restartTimer: (id: string) => dispatch(restartTimer(id)),
    editTimer: (id: string, updates: Partial<Timer>) => dispatch(editTimer({ id, updates })),
  };
};