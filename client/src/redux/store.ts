import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slices/userAuthSlice";
import financialSlice from "./slices/financialSlice";

const store = configureStore({
  reducer: {
    userAuth: userAuthSlice,
    financials: financialSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
