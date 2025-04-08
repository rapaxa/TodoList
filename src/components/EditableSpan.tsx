import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string;
    changeTitleCallback: (title: string) => void;

}

export const EditableSpan = ({
                                 title,
                                 changeTitleCallback,
                             }: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [titleInput, setTitleInput] = useState<string>(title);

    const onEdit = () => {
        setIsEditMode(true)
    }

    const offEdit = () => {

        setIsEditMode(false)
        changeTitleCallback( titleInput)

    }

    const setTitleInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(event.target.value)
    }

    return (
        isEditMode ?
            <input
                value={titleInput}
                autoFocus
                onBlur={offEdit}
                onChange={setTitleInputHandler}
            /> :
            <span onDoubleClick={onEdit}>{title}</span>
    )
}