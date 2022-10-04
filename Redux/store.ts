import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userList from "./userListSlice";

const rootReducer = combineReducers({
    userList: userList
})
export type RootState = ReturnType<typeof rootReducer>
const store = configureStore({
    reducer: rootReducer,
})

export default store