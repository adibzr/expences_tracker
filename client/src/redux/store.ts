import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import balanceSlice from "./slices/transactionSlice";
import categoriesSlice from "./slices/categoriesSlice";
import expenseSlice from "./slices/expenseSlice";
import incomeSlice from "./slices/incomeSlice";
import userAuthSlice from "./slices/userAuthSlice";
import bankSlice from "./slices/bankSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["guestId", "token"],
};
const persistedReducer = persistReducer(persistConfig, userAuthSlice);
const store = configureStore({
  reducer: {
    userAuth: persistedReducer,
    balance: balanceSlice,
    expense: expenseSlice,
    categories: categoriesSlice,
    income: incomeSlice,
    bank: bankSlice,
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
