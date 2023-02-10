import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from "../features/user/userSlice";
import filmSlice from "../features/film/filmSlice";

export const store = configureStore({
  reducer: {
    user:userSlice,
    film:filmSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
