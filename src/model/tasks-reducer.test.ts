import {v1} from 'uuid'
import {beforeEach, expect, test} from 'vitest'

import {


} from './todolists-reducer.ts'
import {tasksAddAC, tasksChangeTitleAC, tasksDeleteAC, tasksReducer, TasksTypes} from "./tasks-reducer.ts";

let todolistId1:string
let todolistId2:string
let startState:TasksTypes={}
beforeEach(() => {
     todolistId1 = v1()
     todolistId2 = v1()

    startState = {
        [todolistId1]: [
            {id: '1', title: 'Html', isDone: true},
            {id: '2', title: 'React', isDone: false},
            {id: '3', title: 'Css', isDone: true},
        ],
        [todolistId2]: [
            {id: '4', title: 'TS', isDone: true},
            {id: '5', title: 'Telegram', isDone: false},
            {id:'6', title: 'XML', isDone: true},
        ]
    }
})


test('correct task should be added', () => {
    const newTaskTitle = 'New task'
    const endState = tasksReducer(startState, tasksAddAC(todolistId2, newTaskTitle))

    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].title).toBe(newTaskTitle)
    expect(endState[todolistId1].length).toBe(3)
})
test(' task should be delete', () => {
    const endState = tasksReducer(startState,tasksDeleteAC(todolistId2,'4'))

    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId2][2]).toBe(undefined)
})
test('task should be change',()=>{
    const newTitle = 'New title'
    const endState =  tasksReducer(startState,tasksChangeTitleAC(todolistId2,'4',newTitle))

    expect(endState[todolistId2][0].title).toBe(newTitle)
    expect(endState[todolistId2][1].title).toBe('Telegram')
})

