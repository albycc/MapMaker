

type IProps = {
    children: JSX.Element | null
}


export default function ToolbarOptionsWindow({ children }: IProps) {

    return (
        <div className="w-6 absolute flex bg-orange-300" style={{ top: 40, left: 0 }}>
            {children}

        </div>
    )
}