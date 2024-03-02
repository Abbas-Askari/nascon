import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
// import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import presistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = () => {
  console.log("making store!");
  return configureStore({
    reducer: persistedReducer,
    // middleware: [thunk],
  });
};
