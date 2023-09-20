import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import authSlice from "../auth/authSlice";
import requestSlice from "../requests/requestSlice";
// import otherSlice from "../other/otherSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"], // Add the slices you want to persist here
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  auth: authSlice,
  request: requestSlice,
  // Add more slices here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
