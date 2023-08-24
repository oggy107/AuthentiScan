import { FC, HTMLInputTypeAttribute, HTMLProps } from "react";

interface InputProps {
    lable: string;
    name: string;
    required?: boolean;
    type?: HTMLInputTypeAttribute;
    className?: HTMLProps<HTMLElement>["className"];
    value?: HTMLProps<HTMLInputElement>["value"];
    onChange?: HTMLProps<HTMLInputElement>["onChange"];
}

const Input: FC<InputProps> = ({
    lable,
    name,
    required,
    type,
    className,
    value,
    onChange,
}) => {
    return (
        <div className="w-full">
            <p className="text-neutral-500 text-base">{lable}</p>
            <input
                className={`w-full bg-purple-500 bg-opacity-5 rounded-lg shadow border border-black border-opacity-20 outline-none p-1 px-2 ${className}`}
                type={type}
                required={required}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

Input.defaultProps = {
    required: false,
    type: "text",
};

export default Input;