import React from "react";
import type {ButtonProps} from "../interface/button-props.ts";

const Button:React.FC<ButtonProps> = ({className,value,type,...props}) => {
    return <>
        <button type={type} className={className} {...props}>{value}</button>
    </>
}
export default Button;
