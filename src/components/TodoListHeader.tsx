import {Button} from "./Button.tsx";
type TodoListHeaderProps ={
    title: string,
    onDelete: () => void,

}
export const TodoListHeader = ({title,onDelete}:TodoListHeaderProps) =>{
    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3>{title}</h3>
            <Button  onClickHandler={onDelete} title={"X"}/>
        </div>
    )
}