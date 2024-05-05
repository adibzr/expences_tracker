import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import financialSlice from "./slices/financialSlice";
import fundsSlice from "./slices/fundsSlice";
import userAuthSlice from "./slices/userAuthSlice";
import categoriesSlice from "./slices/categoriesSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["guestId", "token"], // only persist the 'user' state
};
const persistedReducer = persistReducer(persistConfig, userAuthSlice);
const store = configureStore({
  reducer: {
    userAuth: persistedReducer,
    financials: financialSlice,
    funds: fundsSlice,
    categories: categoriesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
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

export const persistor = persistStore(store);
export default store;
