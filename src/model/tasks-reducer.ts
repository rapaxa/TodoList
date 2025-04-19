import {v1} from "uuid";

type ActionsTypes = ReturnType<typeof tasksAddAC> | ReturnType<typeof tasksDeleteAC> | ReturnType<typeof tasksUpdateAC> | ReturnType<typeof tasksChangeTitleAC>;
type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
};

export type TasksTypes = {
    [todolistId: string]: TaskType[]
};
const initialState: TasksTypes = {};

export const tasksReducer = (state: TasksTypes = initialState, action: ActionsTypes): TasksTypes => {
    switch (action.type) {
        case "ADD_TASK": {
            const {todolistId, id, title, isDone} = action.payload;
            const newTask: TaskType = {id, title, isDone};

            return {
                ...state, [todolistId]: [newTask, ...(state[todolistId] || [])]

            };
        }
        case "DELETE_TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            }
        }
        case "UPDATE_TASK": {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.id ? {...el, isDone: !el.isDone} : el)
            }
        }
        case "CHANGE_TASK": {
            return {
                ...state,
                [action.payload.idOfList]: state[action.payload.idOfList]
                    .map(el => el.id ===action.payload.id ? {...el, title: action.payload.title} : el)

            }
        }
        default:
            return state;
    }
};

export const tasksAddAC = (todolistId: string, title: string) => ({
    type: "ADD_TASK",
    payload: {
        todolistId,
        id: v1(),
        title,
        isDone: false,
    }
} as const);
export const tasksDeleteAC = (todolistId: string, id: string) => ({
    type: "DELETE_TASK",
    payload: {
        todolistId,
        id
    }
} as const);
export const tasksUpdateAC = (todolistId: string, id: string) => ({
    type: "UPDATE_TASK",
    payload: {
        todolistId,
        id
    }
} as const);
export const tasksChangeTitleAC = (idOfList:string,id: string,title:string) => ({
    type: 'CHANGE_TASK',
    payload:{
        idOfList,
        title,
        id
    }
}as const)
