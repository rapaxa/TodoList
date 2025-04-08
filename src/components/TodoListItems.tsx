import {Filter, TodoListsItem} from "../App.tsx";
import {AddList} from "./AddList.tsx";
import {TodoListHeader} from "./TodoListHeader.tsx";
import {TaskItem} from "./TaskItem.tsx";
import {TaskDeleteButton} from "./TaskDeleteButton.tsx";
import {FilterButtons} from "./FilterButtons.tsx";
import {List, Stack} from "@mui/material";
import Grid from "@mui/material/Grid";

type TodoListItemsProps = {
    id: string;
    todoList: { id: string, title: string, filter: Filter }
    todoLists: TodoListsItem[]
    deleteTask: (id: string, idItem: string) => void;
    updateTask: (id: string, idItem: string) => void;
    addTask: (id: string, task: string) => void;
    filter: (id: string, filter: Filter) => void;
    deleteList: (id: string) => void;
    changeTitleName: (id: string, idItem: string, newTitle: string) => void;
}

export const TodoListItems = ({
                                  id,
                                  todoList,
                                  todoLists,
                                  deleteTask,
                                  updateTask,
                                  addTask,
                                  filter,
                                  deleteList,
                                  changeTitleName
                              }: TodoListItemsProps) => {
    const changeFilterHandler = (filterValues: Filter) => {
        filter(id, filterValues);
    }
    const createTask = (task: string) => {
        addTask(id, task);
    }
    const deleteTodoList = () => {
        deleteList(id)
    }


    return (

        <Grid padding={2}>
            <TodoListHeader title={todoList.title} onDelete={deleteTodoList}/>
            <AddList label={"New Task"} maxLength={12} createItem={createTask}/>
            <Stack direction={"row"}
                   sx={
                       {
                           justifyContent: "space-between"
                       }
                   }>
                <div>
                    {todoLists.length === 0 ? (
                        "Not available tasks"
                    ) : (
                        <List disablePadding dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {todoLists.map(task => (
                                <TaskItem
                                    key={task.id}
                                    id={id}
                                    task={task}
                                    updateTask={updateTask}
                                    changeTitleName={changeTitleName}
                                />
                            ))}
                        </List>
                    )}
                </div>

                <div>
                    <List disablePadding>
                        {todoLists.map(item => (
                            <TaskDeleteButton
                                key={item.id}
                                id={id}
                                taskId={item.id}
                                onDelete={deleteTask}
                            />
                        ))}
                    </List>
                </div>
            </Stack>


            <FilterButtons activeFilter={todoList.filter} onFilterChange={changeFilterHandler}/>
        </Grid>
    );

}