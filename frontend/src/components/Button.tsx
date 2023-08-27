import { FC, HTMLProps, ButtonHTMLAttributes } from "react";

interface ButtonProps {
    title: string;
    className?: HTMLProps<HTMLElement>["className"];
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    disabled?: boolean;
    primary?: boolean;
    secondary?: boolean;
    onclick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

const Button: FC<ButtonProps> = ({
    title,
    className,
    type,
    disabled,
    onclick,
    secondary,
}) => {
    return (
        <button
            className={`w-fit px-[59.5px] py-[12px] hover:transition-all rounded-[7px]  ${className} ${
                disabled
                    ? "bg-opacity-50"
                    : "hover:shadow-button hover:cursor-pointer"
            } ${
                secondary
                    ? "bg-neutral-100 text-black"
                    : " bg-[#001589] text-white"
            }`}
            type={type}
            disabled={disabled}
            onClick={onclick}
        >
            {title}
        </button>
    );
};

Button.defaultProps = {
    type: "button",
    disabled: false,
    primary: true,
    secondary: false,
};

export default Button;
