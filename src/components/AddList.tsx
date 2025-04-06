import {useState, type KeyboardEvent} from "react";
import {Button} from "./Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import s from './Button.module.css'
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons";

type AddListProps = {
    createItem: (text: string) => void;
    className?: string;
    maxLength: number;
}
export const AddList = ({createItem, className, maxLength}: AddListProps) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const handleCreateTask = () => {
        if (title.trim() !== '') {
            setError(false);
            createItem(title)
        } else {
            setError(true)
        }

    }
    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleCreateTask()
        }
    }
    return (
        <div className={className}>
            <input value={title}
                   onChange={(e) => {
                       setTitle(e.target.value)
                   }}
                   type="text"
                   maxLength={maxLength}
                   placeholder={`Max value size ${maxLength}`}
                   onKeyDown={createItemOnEnterHandler}/>
            <Button
                className={s.button_add_task}
                title={<FontAwesomeIcon style={{width: "100%", height: "100%"}} icon={faSquarePlus} beatFade/>}
                onClickHandler={handleCreateTask}/>
            {error && (<div>Введите текст</div>)}
        </div>
    )
}