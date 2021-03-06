import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from "redux-thunk";
import AppReducer from "./appReducer";
import HomeReducer from "../Featuers/HomePage/homeReducer";

const rootReducer = combineReducers({
    app: AppReducer,
    home: HomeReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never
export type RootStateType = ReturnType<typeof rootReducer>