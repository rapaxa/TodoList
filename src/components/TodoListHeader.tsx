import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan.tsx";
type TodoListHeaderProps ={
    id:string
    title: string,
    onDelete: () => void,
    changeTitle:(id:string,title:string) => void,
}
export const TodoListHeader = ({id,title,onDelete,changeTitle}:TodoListHeaderProps) =>{
    const handleTitleChange = (newTitle: string) => {
        changeTitle(id, newTitle);
    };
    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <EditableSpan title={title} callback={handleTitleChange}/>
            <IconButton onClick={onDelete}  aria-label="delete">
                <Delete />
            </IconButton>

        </div>
    )
}