import './App.css'
import {TodoListItems} from "./components/TodoListItems.tsx";
import {AddList} from "./components/AddList.tsx";
import {
    AppBar,
    Container,
    createTheme, CssBaseline,
    FormControlLabel,
    IconButton,
    Paper,
    Switch,
    Toolbar,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    createTodoListAC,
    deleteTodolistAC,
} from "./model/todolists-reducer.ts";
import {tasksAddAC, tasksChangeTitleAC, tasksDeleteAC, tasksUpdateAC} from "./model/tasks-reducer.ts";
import {useAppSelector} from "./common/hooks/useAppSelectors.ts";
import {useAppDispatch} from "./common/hooks/useAppDispath.ts";
import {useState} from "react";
import {ThemeProvider} from "@emotion/react";

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


type ThemeMode = "light" | "dark";

function MenuIcon() {
    return null;
}

function App() {

    const todoLists = useAppSelector((state) => state.todoLists)
    const tasks = useAppSelector((state) => state.tasks)
    const dispatch = useAppDispatch();

    const [isDarkMode, setDarkMode] = useState<ThemeMode>('light');
    const darkTheme = createTheme({
        palette: {
            mode:isDarkMode,
        },
    });

    //CREATE TASK
    const handleCreateTask = (id: string, title: string) => {
        dispatch(tasksAddAC(id, title));
    }
    //DELETE TASK
    const handleDeleteTask = (id: string, idItem: string) => {
        dispatch(tasksDeleteAC({todolistId: id, id: idItem}))
    }
    //UPDATE TASK
    const handleUpdateTask = (id: string, idItem: string) => {
        dispatch(tasksUpdateAC({todolistId: id, id: idItem}));
    }
    const changeTaskTitle = (id: string, idItem: string, title: string) => {
        dispatch(tasksChangeTitleAC({todolistId: id, id: idItem, title}))
    }
    //CHANGE FILTER
    const changeFilterHandler = (id: string, filter: Filter) => {
        dispatch(changeTodoListFilterAC({id, filter}))
    };
    //DELETE TODOLIST
    const deleteTodoList = (id: string) => {
        dispatch(deleteTodolistAC({id}))

    }
    //CHANGE TITILE of TODOLIST
    const changeTitleName = (id: string, title: string) => {

        dispatch(changeTodoListTitleAC({id, title}))
    }

    const createNewList = (title: string) => {
        dispatch(createTodoListAC(title))

    }
    const changeThemeMode = () => {
        return isDarkMode === 'dark' ? setDarkMode('light') : setDarkMode('dark')
    }
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
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
                            Todolist
                        </Typography>
                        <FormControlLabel
                            sx={{display: 'block'}}
                            control={
                                <Switch
                                    onChange={changeThemeMode}
                                    name={isDarkMode}
                                    color="primary"
                                />
                            }
                            label={isDarkMode === 'dark' ? 'light' : 'dark'}
                        />
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <Grid margin={11} container justifyContent="center">
                        <AddList label={"New task list"} maxLength={10} createItem={createNewList}/>
                    </Grid>
                    <Grid container justifyContent="flex-start" gap={8}>

                        {todoLists.map(item => {
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
            </ThemeProvider>
        </>
    )
        ;
}

export default App;
