import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
type TodoListHeaderProps ={
    title: string,
    onDelete: () => void,

}
export const TodoListHeader = ({title,onDelete}:TodoListHeaderProps) =>{
    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3>{title}</h3>
            <IconButton onClick={onDelete}  aria-label="delete">
                <Delete />
            </IconButton>

        </div>
    )
}