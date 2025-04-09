import { Filter, TodoListsItem } from "../App.tsx";
import { AddList } from "./AddList.tsx";
import { TodoListHeader } from "./TodoListHeader.tsx";
import { TaskItem } from "./TaskItem.tsx";
import { TaskDeleteButton } from "./TaskDeleteButton.tsx";
import { FilterButtons } from "./FilterButtons.tsx";
import { List, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";

type TodoListItemsProps = {
    id: string;
    todoList: { id: string, title: string, filter: Filter };
    todoLists: TodoListsItem[];
    deleteTask: (id: string, idItem: string) => void;
    updateTask: (id: string, idItem: string) => void;
    addTask: (id: string, task: string) => void;
    filter: (id: string, filter: Filter) => void;
    deleteList: (id: string) => void;
    changeTitleName: (id: string, idItem: string, newTitle: string) => void;
};

export const TodoListItems = ({
                                  id,
                                  todoList,
                                  todoLists,
                                  deleteTask,
                                  updateTask,
                                  addTask,
                                  filter,
                                  deleteList,
                                  changeTitleName,
                              }: TodoListItemsProps) => {
    const [sortedItems, setSortedItems] = useState<TodoListsItem[]>([]);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Для отслеживания порядка сортировки

    // Функция для сортировки задач
    const handleSortItems = () => {
        const sorted = [...todoLists].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.title.localeCompare(b.title); // Сортировка по возрастанию
            } else {
                return b.title.localeCompare(a.title); // Сортировка по убыванию
            }
        });
        setSortedItems(sorted);
    };

    // Эффект для сортировки при изменении todoLists
    useEffect(() => {
        handleSortItems();
    }, [todoLists, sortOrder]); // Сортируем при изменении todoLists или sortOrder

    const changeFilterHandler = (filterValues: Filter) => {
        filter(id, filterValues);
    };
    const createTask = (task: string) => {
        addTask(id, task);
    };
    const deleteTodoList = () => {
        deleteList(id);
    };

    // Функция для изменения порядка сортировки
    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc")); // Переключаем порядок сортировки
    };

    return (
        <Grid padding={2}>
            <TodoListHeader title={todoList.title} onDelete={deleteTodoList} />
            <AddList label={"New Task"} maxLength={12} createItem={createTask} />
            <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                <div>
                    {todoLists.length === 0 ? (
                        "Not available tasks"
                    ) : (
                        <List disablePadding dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {sortedItems.map(task => (
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
                        {sortedItems.map(item => (
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

            <FilterButtons activeFilter={todoList.filter} onFilterChange={changeFilterHandler} />

            <Button
                variant="contained"
                color="primary"
                onClick={toggleSortOrder}
                sx={{ marginTop: 2 }}
            >
                Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </Button>
        </Grid>
    );
};
