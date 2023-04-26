import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //
import departmentReducer from "./Reducer/departmentReducer";
import loadingReducer from "./Reducer/loadingReducer";
import meetingReducer from "./Reducer/meetingReducer";
import missionReducer from "./Reducer/missionReducer";
import relicsReducer from "./Reducer/relicsReducer";
import usersReducer from "./Reducer/usersReducer";
import rootSaga from "./rootSaga";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};
const reducers = combineReducers({
  users: usersReducer,
  meeting: meetingReducer,
  department: departmentReducer,
  relics: relicsReducer,
  loading: loadingReducer,
  mission: missionReducer,
});
const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gMC) =>
    gMC({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
