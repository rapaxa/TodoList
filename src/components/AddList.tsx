import { useState,type KeyboardEvent} from "react";
import {Button} from "./Button.tsx";
type AddListProps = {
    createItem:(text:string) => void;
}
export const AddList= ({createItem}:AddListProps) => {
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
        <div >
            <input value={title}
                   onChange={(e) =>{
                setTitle(e.target.value)
            }} type="text"
                    placeholder={'Max value size 12'}
            onKeyDown={createItemOnEnterHandler}/>
            <Button  title={'+'} onClickHandler={handleCreateTask}/>

        </div>
    )
}