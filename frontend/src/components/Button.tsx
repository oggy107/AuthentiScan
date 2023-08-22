import { FC, HTMLProps, ButtonHTMLAttributes } from "react";

interface ButtonProps {
    title: string;
    className?: HTMLProps<HTMLElement>["className"];
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const Button: FC<ButtonProps> = ({ title, className, type }) => {
    return (
        <button
            className={`w-fit px-[59.5px] py-[12px] hover:cursor-pointer rounded-[7px] text-white bg-[#001589] ${className}`}
            type={type}
        >
            {title}
        </button>
    );
};

Button.defaultProps = {
    type: "button",
};

export default Button;
