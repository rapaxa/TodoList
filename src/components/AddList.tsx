import {useState, type KeyboardEvent, ChangeEvent} from "react";
import {Button, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grid from "@mui/material/Grid";

type AddListProps = {
    createItem: (title: string) => void;
    label: string;
    maxLength: number;
}
export const AddList = ({createItem,label,maxLength}: AddListProps) => {
    const [title, setTitle] = useState<string>('');
    const [errorNote, setErrorNote] = useState<boolean>(false);
    const handleCreateTask = () => {
        if (title.trim() !== '' && title.length <= maxLength) {
                createItem(title)
                setTitle("")
        } else {
            setErrorNote(true)
        }

    }
    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleCreateTask()
        }
    }
    const setInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
        if(title.length <= maxLength){
            setErrorNote(false)

        }else{
            setErrorNote(true)
        }

    }
    return (
        <Grid  >
            <TextField id="standard-basic"
                       color='secondary'
                       placeholder={`Max value size ${maxLength}`}
                       label={label}
                       value={title}
                       helperText={errorNote && "A lot symbols or your have wrong text"}
                       error={errorNote}
                       variant="standard"
                       onChange={setInputHandler}
                       onKeyDown={createItemOnEnterHandler}
            />

            <Button size={"small"} color={"success"} onClick={handleCreateTask}>{<AddCircleIcon/>}</Button>

        </Grid>
    )
}
