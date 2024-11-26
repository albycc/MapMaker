

type IProps = {
    children: JSX.Element | JSX.Element[] | null
}


export default function ToolbarOptionsWindow({ children }: IProps) {

    return (
        <div className="absolute flex flex-col bg-orange-100 rounded-bl-md rounded-br-md p-2" style={{ top: 36, left: 0 }}>
            {children}

        </div>
    )
}