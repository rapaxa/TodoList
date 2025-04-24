import { Input } from "@mui/material";
import {ChangeEvent, type KeyboardEvent, useState} from "react";

type EditableSpanProps = {
    title: string,
    callback: (value: string) => void,
}


export const EditableSpan = ({title, callback}: EditableSpanProps) => {
    const [onEdit, setOnEdit] = useState<boolean>(false);
    const [titleInput, setTitleInput] = useState<string>(title);
    const handleOnEdit = (): void => {
        setOnEdit(true);
    }
    const handleOffEdit = () => {
        callback(titleInput)
        setOnEdit(false);

    }

    const setTitleInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(event.target.value)
    }
    const onKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleOffEdit()
        }
    }
    return (
        <>
            {onEdit ?
                <Input type="text"
                       autoFocus
                       value={titleInput}
                       onChange={setTitleInputHandler}
                       onBlur={handleOffEdit}
                       onKeyDown={onKeyEnter}

                />
                : <span onDoubleClick={handleOnEdit}>{title}</span>
        }
        </>
    )
}