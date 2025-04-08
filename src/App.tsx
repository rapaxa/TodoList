import './App.css'
import {useState} from "react";
import {v1} from "uuid";
import {TodoListItems} from "./components/TodoListItems.tsx";
import {AddList} from "./components/AddList.tsx";


export type TodoList = {
    id: string,
    title: string,
    filter: Filter
}
export type Filter = "all" | "active" | "completed"
export type TodoLists = {
    [key: string]: Array<TodoListsItem>
}

export type TodoListsItem = {
    id: string,
    title: string,
    isDone: boolean,
}
const todoId_1 = v1()
const todoId_2 = v1()


function App() {

    const [data, setData] = useState<Array<TodoList>>([
        {id: todoId_1, title: "What to buy", filter: 'all'},
        {id: todoId_2, title: "What's new", filter: "completed"}
    ])

    const [todoLists, setTodoLists] = useState<TodoLists>({
        [todoId_1]: [
            {id: v1(), title: 'Html', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Css', isDone: true},
        ],
        [todoId_2]: [
            {id: v1(), title: 'TS', isDone: true},
            {id: v1(), title: 'Telegram', isDone: false},
            {id: v1(), title: 'XML', isDone: true},
        ]
    })
    const handleCreateTask = (id: string, title: string) => {
        setTodoLists({
            ...todoLists,
            [id]: [...todoLists[id], {id: v1(), title, isDone: false}]
        });
    }
    const handleDeleteTask = (id: string, idItem: string) => {
        setTodoLists({
            ...todoLists,
            [id]: todoLists[id].filter(item => item.id !== idItem)
        })
    }
    const handleUpdateTask = (id: string, idItem: string) => {
        setTodoLists({
            ...todoLists,
            [id]: todoLists[id].map(item => item.id === idItem ? {...item, isDone: !item.isDone} : item)
        })
    }
    const changeFilterHandler = (id: string, filter: Filter) => {
        setData(data.map(item =>
            item.id === id ? {...item, filter} : item
        ));
    };
    const changeTaskTitle = (id: string, idItem: string, newTitle: string) => {
        setTodoLists({
            ...todoLists,
            [id]: todoLists[id].map(item => item.id === idItem ? {...item, title: newTitle} : item)
        })
    }
    const changeTodoListTitle = (id: string, newTitle: string) => {
        setData([
            ...data.map(item => item.id === id ? {...item, title: newTitle} : item)
        ])
    }
    const createNewList = (title: string) => {
        const id = v1()
        setData([
            ...data,
            {id, title, filter: 'all'},
        ])
        setTodoLists({
            ...todoLists,
            [id]: []

        })
    }
    const deleteTodoList = (id: string) => {
        setData(data.filter(item => item.id !== id));
    }

    const todoListsComponents = data.map(item => {
        const todolistTasks = todoLists[item.id]
        let filteredTasks = todolistTasks
        if (item.filter === "active") {
            filteredTasks = todolistTasks.filter(task => !task.isDone)
        }
        if (item.filter === 'completed') {
            filteredTasks = todolistTasks.filter(task => task.isDone)
        }

        return (

            <div className={'todoList'} key={item.id}>
                <TodoListItems id={item.id}
                               todoList={item}
                               todoLists={filteredTasks}
                               addTask={handleCreateTask}
                               deleteTask={handleDeleteTask}
                               updateTask={handleUpdateTask}
                               filter={changeFilterHandler}
                               deleteList={deleteTodoList}
                               changeTaskTitle={changeTaskTitle}
                               changeTodoListTitle={changeTodoListTitle}
                />
            </div>
        )
    })
    return (
        <>
            <AddList className={'createTodoLists'} createItem={createNewList} maxLength={10}/>
            <div className="container">
                {todoListsComponents}
            </div>
        </>

    )
}

export default App;
