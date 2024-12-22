import { Timer } from "../types/timer";

export function setDataInLocalStorage(state: Timer[]) {
    try {
      if (state) {
        localStorage.setItem("timers", JSON.stringify(state));
      }
    } catch (err) {
      console.error(err);
    }
  }
  
export function getDataFromLocalStorage() {
    try {
        const data = localStorage.getItem("timers");
        if (data) {
            return JSON.parse(data);
        }
    } catch (err) {
        console.error(err);
    }
    return [];
}