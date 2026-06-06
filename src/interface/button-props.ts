export interface ButtonProps{
    value?: string,
    type?: "button" | "submit" | "reset";
    className?: string,
    disabled?: boolean,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}