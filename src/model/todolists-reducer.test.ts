import {v1} from 'uuid'
import {beforeEach, expect, test} from 'vitest'

import {
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    createTodoListAC,
    deleteTodolistAC,
    todolistsReducer
} from './todolists-reducer.ts'
import {TodoList} from "../App.tsx";
let todolistId1:string
let todolistId2:string
let startState:TodoList[]=[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})
test('correct todolist should be deleted', () => {


    // 2. Действие
    // const action:DeleteTodoListActionType = {
    //     type: 'delete_todolist',
    //     payload: {
    //         id: todolistId1,
    //     },
    // }

    //BEST PRACTICE

    const endState = todolistsReducer(startState, deleteTodolistAC({id:todolistId1}))

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {


    const title = 'New todolist'
    const endState = todolistsReducer(startState, createTodoListAC(title))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})
test('correct todolist should change its title', () => {
    const title = 'New title'
    const endState = todolistsReducer(startState, changeTodoListTitleAC({id: todolistId2, title}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})
test('correct todolist should change its filter', () => {
    const filter = 'completed'
    const endState = todolistsReducer(startState, changeTodoListFilterAC({id: todolistId2, filter}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(filter)
})