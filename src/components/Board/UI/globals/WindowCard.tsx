
interface IProps {
    children: string | JSX.Element | JSX.Element[]
    position: { top?: string | number, bottom?: string | number, left?: string | number, right?: string | number }
}

export default function WindowCard({ children, position }: IProps) {

    return (
        <div className="absolute rounded-md bg-slate-50 p-1.5" style={{ top: position.top, bottom: position.bottom, left: position.left, right: position.right }}>
            {children}
        </div>
    )
}