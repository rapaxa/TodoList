import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {todolistsReducer} from "../model/todolists-reducer.ts";
import {tasksReducer} from "../model/tasks-reducer.ts";

export const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})
export const store = configureStore({
    reducer: rootReducer,
})
// Get the type of our store variable
// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch
//@ts-ignore
window.store = store
