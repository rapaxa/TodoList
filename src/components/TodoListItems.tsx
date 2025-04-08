import {Filter, TodoListsItem} from "../App.tsx";
import {AddList} from "./AddList.tsx";
import {Button} from "./Button.tsx";
import s from './Button.module.css'
import s2 from './TodoListItems.module.css'
import {EditableSpan} from "./EditableSpan.tsx";
import {v1} from "uuid";

type TodoListItemsProps = {
    id: string;
    todoList: { id: string, title: string, filter: Filter }
    todoLists: TodoListsItem[]
    deleteTask: (id: string, idItem: string) => void;
    updateTask: (id: string, idItem: string) => void;
    addTask: (id: string, task: string) => void;
    filter: (id: string, filter: Filter) => void;
    deleteList: (id: string) => void;
    changeTaskTitle: (id: string, idItem: string, newTitle: string) => void;
    changeTodoListTitle: (id: string, newTitle: string)=>void;
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
                                  changeTaskTitle,
                                  changeTodoListTitle
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
    const todoListTitleCallback=(newTitle:string)=>{
        changeTodoListTitle(id,newTitle)
    }
    return (
        <>
            <div className={s2.todo_list}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

                    <EditableSpan title={todoList.title} changeTitleCallback={todoListTitleCallback}/>
                    <Button className={s.button_delete} onClickHandler={deleteTodoList} title={"X"}/>
                </div>


                <AddList maxLength={10} createItem={createTask}/>


                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className={s2.todo_items}>
                        {todoLists.length <= 0 ? "Not available tasks" :
                            <ul>
                                {todoLists.map(task => {
                                        const changeTitleCallback = (newTitle: string) => {
                                            changeTaskTitle(id, task.id, newTitle);
                                        }
                                        return (
                                            <li key={task.id}>
                                                <EditableSpan changeTitleCallback={changeTitleCallback} title={task.title}/>


                                                <input checked={task.isDone}
                                                       onChange={() => updateTask(id, task.id)}
                                                       type="checkbox"/>
                                            </li>
                                        )
                                    }
                                )}
                            </ul>
                        }
                    </div>
                    <div>
                        <ul>
                            {todoLists.map(item => (
                                <li key={v1()}>
                                    <button onClick={() => deleteTask(id, item.id)}>X</button>
                                </li>
                            ))}

                        </ul>
                    </div>
                    <div className={s2.filters}>
                        <Button className={s.button_filters} title={'All'}
                                onClickHandler={() => changeFilterHandler('all')}/>
                        <Button className={s.button_filters} title={'Active'}
                                onClickHandler={() => changeFilterHandler('active')}/>
                        <Button className={s.button_filters} title={'Completed'}
                                onClickHandler={() => changeFilterHandler('completed')}/>
                    </div>
                </div>


            </div>

        </>
    )
}