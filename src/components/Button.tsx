

type ButtonProps = {
    onClickHandler?: () => void,
    title: string
    className?: string
}

export const Button = ({onClickHandler,title,className}:ButtonProps) =>{
    return(
        <button className={className} onClick={onClickHandler}>{title}</button>
    )
}