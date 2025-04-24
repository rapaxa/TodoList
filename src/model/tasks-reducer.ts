import {v1} from "uuid";
import {createAction, createReducer} from "@reduxjs/toolkit";
import {createTodoListAC, deleteTodolistAC} from "./todolists-reducer.ts";

type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
};

export type TasksTypes = {
    [todolistId: string]: TaskType[]
};

export const tasksAddAC = createAction('tasks/addTasks', (todolistId: string, title: string) => {
    return {
        payload: {
            todolistId,
            id: v1(),
            title,
            isDone: false,
        }
    }
})
export const tasksDeleteAC = createAction<{ todolistId: string, id: string }>('tasks/deleteTasks')
export const tasksUpdateAC = createAction<{ todolistId: string, id: string }>('tasks/updateTasks')
export const tasksChangeTitleAC = createAction<{
    todolistId: string,
    id: string,
    title: string
}>('tasks/tasksChangeTitle');
const initialState: TasksTypes = {};


export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id];
        })
        .addCase(createTodoListAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(tasksAddAC, (state, action) => {
            const {todolistId, id, title, isDone} = action.payload;
            const newTask: TaskType = {id, title, isDone};
            state[todolistId].push(newTask)
        })
        .addCase(tasksDeleteAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1);
            }
        })
        .addCase(tasksChangeTitleAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.id);
            if (task) {
                task.title = action.payload.title;
            }
        })
        .addCase(tasksUpdateAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.id);
            if (task) {
                task.isDone = !task.isDone;
            }
        })


})

