import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { create } from "zustand";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;

type StoreState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  increasePopulationAsync: () => void;
};
export const useBearStore = create<StoreState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  increasePopulationAsync: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({ bears: state.bears + 1 }));
  },
}));
