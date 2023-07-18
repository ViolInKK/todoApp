import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({...rest}, ref)  => {
    return (
        <input
        {...rest}
        ref={ref}>
        </input>
    )
})