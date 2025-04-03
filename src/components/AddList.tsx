import { useState,type KeyboardEvent} from "react";
import {Button} from "./Button.tsx";
import s from './Button.module.css'
type AddListProps = {
    createItem:(text:string) => void;
    className?:string;
}
export const AddList= ({createItem,className}:AddListProps) => {
    const [title, setTitle] = useState<string>('');
    const handleCreateTask = () => {
        if (title.trim() !== '') {
        createItem(title)
        } else {
            console.log('error')
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
                   onChange={(e) =>{
                setTitle(e.target.value)
            }} type="text"
                    placeholder={'Max value size 12'}
            onKeyDown={createItemOnEnterHandler}/>
            <Button className={s.button_add_task} title={'+'} onClickHandler={handleCreateTask}/>

        </div>
    )
}