import {Filter, TodoList} from "../App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";


export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodoList')
export const createTodoListAC = createAction('todolists/createTodolist', (title: string) => {
    return {
        payload: {
            title: title,
            id: nanoid()
        }
    }
})
export const changeTodoListTitleAC = createAction<{ id: string, title: string }>('todolists/changeTitleTodolist')

export const changeTodoListFilterAC = createAction<{ id: string, filter: Filter }>('todolists/changeFilterTodolist')
const initialState: TodoList[] = []

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        })
        .addCase(createTodoListAC, (state, action) => {
            state.push({id: action.payload.id, title: action.payload.title, filter: 'all'})
        })
        .addCase(changeTodoListTitleAC, (state, action) => {
            const todolist = state.find(el => el.id === action.payload.id)
            if (todolist) {
                todolist.title = action.payload.title
            }
        })
        .addCase(changeTodoListFilterAC, (state, action) => {
            const filter = state.find(el => el.id === action.payload.id)
            if (filter) {
                filter.filter = action.payload.filter
            }
        })
})
