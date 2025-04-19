import {Filter, TodoList} from "../App.tsx";

const initialState: TodoList[] = []
//!!!!!! LOOKG TO 19
// export type DeleteTodoListActionType = ReturnType<typeof deleteTodolistActionCreate>
// export type CreateTodoListActionType = ReturnType<typeof createTodolistAC>
export type ActionType =
    ReturnType<typeof createTodolistAC>
    | ReturnType<typeof deleteTodolistActionCreate>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
export const todolistsReducer = (todolists: TodoList[] = initialState, action: ActionType): TodoList[] => {

    switch (action.type) {
        case 'delete_todolist':
            return todolists.filter(tl => tl.id !== action.payload.id)

        case "create_todolist":
            return [
                ...todolists,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    filter: 'all'
                }
            ]
        case 'change_todolist_title':
            console.log()
            return todolists.map(item => item.id === action.payload.id ? {...item, title: action.payload.title} : item)
        case 'change_todolist_filter':
            return todolists.map(item => item.id === action.payload.id ? {
                ...item,
                filter: action.payload.filter
            } : item)
        default:
            return todolists
    }

}

export const deleteTodolistActionCreate = (id: string) => ({
        type: 'delete_todolist',
        payload: {
            id:id
        }
    } as const
)
export const createTodolistAC = (id: string, title: string) => (
    {
        type: 'create_todolist',
        payload: {
            id,
            title
        }

    } as const

)
export const changeTodolistTitleAC = ({id, title}: { id: string, title: string }) => (
    {
        type: 'change_todolist_title',
        payload: {id, title}
    } as const
)
export const changeTodolistFilterAC = ({id, filter}: { id: string, filter: Filter }) => ({
    type: 'change_todolist_filter',
    payload: {id, filter}
} as const)