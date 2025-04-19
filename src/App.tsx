import './App.css'
import {useReducer} from "react";
import {v1} from "uuid";
import {TodoListItems} from "./components/TodoListItems.tsx";
import {AddList} from "./components/AddList.tsx";
import {AppBar, Button, Container, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistActionCreate,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {tasksAddAC, tasksChangeTitleAC, tasksDeleteAC, tasksReducer, tasksUpdateAC} from "./model/tasks-reducer.ts";

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

    const initialState: Array<TodoList> = [
        {id: todoId_1, title: "What to buy", filter: 'all'},
        {id: todoId_2, title: "What's new", filter: "completed"}
    ]
    const initialStateOfTasks: TodoLists = {
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
    }
    const [data, dispatchTodoList] = useReducer(todolistsReducer, initialState)
    const [tasks, dispatchTasks] = useReducer(tasksReducer, initialStateOfTasks)

    //CREATE TASK
    const handleCreateTask = (id: string, title: string) => {
        dispatchTasks(tasksAddAC(id, title));
    }
    //DELETE TASK
    const handleDeleteTask = (id: string, idItem: string) => {
        dispatchTasks(tasksDeleteAC(id, idItem))
    }
    //UPDATE TASK
    const handleUpdateTask = (id: string, idItem: string) => {
        dispatchTasks(tasksUpdateAC(id, idItem));
    }
    const changeTaskTitle = (idOfList:string,id:string,title:string) =>{
        dispatchTasks(tasksChangeTitleAC(idOfList,id,title))
    }
    //CHANGE FILTER
    const changeFilterHandler = (id: string, filter: Filter) => {
        dispatchTodoList(changeTodolistFilterAC({id, filter}))
    };
    //DELETE TODOLIST
    const deleteTodoList = (id: string) => {
        dispatchTodoList(deleteTodolistActionCreate(id))

    }
    //CHANGE TITILE of TODOLIST
    const changeTitleName = (id: string,title: string) => {

        dispatchTodoList(changeTodolistTitleAC({id, title}))
    }

    const createNewList = (title: string) => {
        const id = v1()
        dispatchTodoList(createTodolistAC(id, title))
        tasks[id] = []
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
                <Grid margin={11} container justifyContent="center">
                    <AddList label={"New task list"} maxLength={10} createItem={createNewList}/>
                </Grid>
                <Grid container justifyContent="flex-start" gap={8}>
                    {data.map(item => {
                        const todolistTasks = tasks[item.id]
                        let filteredTasks = todolistTasks
                        if (item.filter === "active") {
                            filteredTasks = todolistTasks.filter(task => !task.isDone)
                        }
                        if (item.filter === 'completed') {
                            filteredTasks = todolistTasks.filter(task => task.isDone)
                        }
                        return (
                            <Grid key={item.id}>
                                <Paper elevation={8}>
                                    <TodoListItems id={item.id}
                                                   todoList={item}
                                                   todoLists={filteredTasks}
                                                   addTask={handleCreateTask}
                                                   deleteTask={handleDeleteTask}
                                                   updateTask={handleUpdateTask}
                                                   filter={changeFilterHandler}
                                                   deleteList={deleteTodoList}
                                                   changeTaskTitle={changeTaskTitle}
                                                   changeTitle={changeTitleName}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}

                </Grid>


            </Container>

        </>
    )
        ;
}

export default App;
