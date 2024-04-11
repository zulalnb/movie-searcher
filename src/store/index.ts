import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import moviesSlice from "../features/moviesSlice";

const store = configureStore({
  reducer: { movies: moviesSlice },
});

export default store;

// reducer içindeki state'lerin veya slice'ların typeları otomatik olarak
// slice'lardan alınır ve tek bir rootstate type'ı olarak döner.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const todos = useSelector((state: RootState) => )
