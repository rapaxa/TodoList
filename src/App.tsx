import './App.css'
import {useEffect, useState} from "react";
import {v1} from "uuid";
import {TodoListItems} from "./components/TodoListItems.tsx";
import {AddList} from "./components/AddList.tsx";
import {AppBar, Button, Container, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";

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


function MenuIcon() {
    return null;
}

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
    useEffect(() => {
        getLocalStorage();

    }, []);
    const setLocalStorage = () => {
        localStorage.setItem("todo-data", JSON.stringify(data))
        localStorage.setItem("todo-tasks", JSON.stringify(todoLists))
    }

    const getLocalStorage = () => {
        const savedData = localStorage.getItem("todo-data");
        const savedTasks = localStorage.getItem("todo-tasks");

        if (savedData) {
            setData(JSON.parse(savedData));
        }
        if (savedTasks) {
            setTodoLists(JSON.parse(savedTasks));
        }
    }


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
        const updatedTodoLists = {...todoLists};
        delete updatedTodoLists[id];
        setTodoLists(updatedTodoLists);
    };
    const changeTitleName = (id: string, idItem: string, newTitle: string) => {
        setTodoLists({
            ...todoLists,
            [id]: todoLists[id].map(item => item.id === idItem ? {...item, title: newTitle} : item)
        })
    }
    return (
        <>

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Grid margin={11}  container justifyContent="center" >
                    <AddList label={"New task list"} maxLength={10} createItem={createNewList}/>
                </Grid>
                <Grid  container justifyContent="flex-start" gap={8}>
                    {data.map(item => {
                        const todolistTasks = todoLists[item.id]
                        let filteredTasks = todolistTasks
                        if (item.filter === "active") {
                            filteredTasks = todolistTasks.filter(task => !task.isDone)
                        }
                        if (item.filter === 'completed') {
                            filteredTasks = todolistTasks.filter(task => task.isDone)
                        }
                        return (
                            <Grid key={item.id}>
                                <Paper  elevation={8} >
                                <TodoListItems id={item.id}
                                               todoList={item}
                                               todoLists={filteredTasks}
                                               addTask={handleCreateTask}
                                               deleteTask={handleDeleteTask}
                                               updateTask={handleUpdateTask}
                                               filter={changeFilterHandler}
                                               deleteList={deleteTodoList}
                                               changeTitleName={changeTitleName}
                                />
                                </Paper>
                            </Grid>
                        )
                    })}

                </Grid>


            </Container>
            <button onClick={setLocalStorage}>SET</button>

        </>
    )
        ;
}

export default App;
