import { Delete } from "@mui/icons-material";
import {IconButton} from "@mui/material";

type TaskDeleteButtonProps = {
    id: string;
    taskId: string;
    onDelete: (id: string, taskId: string) => void;
};

export const TaskDeleteButton = ({ id, taskId, onDelete }: TaskDeleteButtonProps) => (
    <li >
        <IconButton onClick={() => onDelete(id, taskId)}  aria-label="delete">
            <Delete />
        </IconButton>
    </li>
);
