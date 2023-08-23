import { FC, HTMLProps, ButtonHTMLAttributes } from "react";

interface ButtonProps {
    title: string;
    className?: HTMLProps<HTMLElement>["className"];
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ title, className, type, disabled }) => {
    return (
        <button
            className={`w-fit px-[59.5px] py-[12px] hover:transition-all rounded-[7px] text-white bg-[#001589] ${className} ${
                disabled
                    ? "bg-opacity-50"
                    : "hover:shadow-button hover:cursor-pointer"
            }`}
            type={type}
            disabled={disabled}
        >
            {title}
        </button>
    );
};

Button.defaultProps = {
    type: "button",
    disabled: false,
};

export default Button;
