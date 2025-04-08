import {Filter, TodoListsItem} from "../App.tsx";
import {AddList} from "./AddList.tsx";
import {TodoListHeader} from "./TodoListHeader.tsx";
import {TaskItem} from "./TaskItem.tsx";
import {TaskDeleteButton} from "./TaskDeleteButton.tsx";
import {FilterButtons} from "./FilterButtons.tsx";

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
        <div>
            <TodoListHeader title={todoList.title} onDelete={deleteTodoList}/>
            <AddList createItem={createTask}/>

            <div>
                {todoLists.length === 0 ? (
                    "Not available tasks"
                ) : (
                    <ul>
                        {todoLists.map(task => (
                            <TaskItem
                                key={task.id}
                                id={id}
                                task={task}
                                updateTask={updateTask}
                                changeTitleName={changeTitleName}
                            />
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <ul>
                    {todoLists.map(item => (
                        <TaskDeleteButton
                            key={item.id}
                            id={id}
                            taskId={item.id}
                            onDelete={deleteTask}
                        />
                    ))}
                </ul>
            </div>

            <FilterButtons onFilterChange={changeFilterHandler}/>
        </div>
    );

}