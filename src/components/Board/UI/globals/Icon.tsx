import icon from "../../../../icons/select.png"

interface IProps {
    file: string
    alt?: string
    size?: number
}

export default function Icon({ file, alt, size }: IProps) {
    return (
        <img
            src={file}
            alt={alt || ""}
            className="w-full, h-full"
            style={{ maxWidth: size || 50, maxHeight: size || 50 }}
        />
    )
}