import {TodoListsItem} from "../App.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Checkbox, ListItem} from "@mui/material";

type TaskItemProps = {
    id: string;
    task: TodoListsItem;
    updateTask: (listId: string, taskId: string) => void;
    changeTitleName: (id: string, idItem: string, newTitle: string) => void;
};

export const TaskItem = ({ id, task, updateTask, changeTitleName }: TaskItemProps) => {
    const handleTitleChange = (newTitle: string) => {
        changeTitleName(id, task.id, newTitle);
    };

    return (
        <ListItem disablePadding key={task.id}>
            <Checkbox checked={task.isDone}
                      onChange={() => updateTask(id, task.id)}  color="success" />
            <EditableSpan title={task.title} callback={handleTitleChange} />


        </ListItem>
    );
};
