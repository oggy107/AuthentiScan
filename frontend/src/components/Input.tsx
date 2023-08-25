import {
    FC,
    HTMLInputTypeAttribute,
    HTMLProps,
    TextareaHTMLAttributes,
} from "react";

interface InputProps {
    lable: string;
    name: string;
    required?: boolean;
    type?: HTMLInputTypeAttribute;
    className?: HTMLProps<HTMLElement>["className"];
    value?: HTMLProps<HTMLInputElement>["value"];
    onChange?: HTMLProps<HTMLInputElement>["onChange"];
    onTextAreaChange?: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"];
    textarea?: boolean;
    rows?: HTMLProps<HTMLTextAreaElement>["rows"];
    cols?: HTMLProps<HTMLTextAreaElement>["cols"];
}

const Input: FC<InputProps> = ({
    lable,
    name,
    required,
    type,
    className,
    value,
    onChange,
    textarea,
    onTextAreaChange,
    rows,
    cols,
}) => {
    return (
        <div className="w-full">
            <p className="text-neutral-500 text-base">{lable}</p>
            {textarea ? (
                <textarea
                    className={`w-full bg-purple-500 bg-opacity-5 rounded-lg shadow border border-black border-opacity-20 outline-none p-1 px-2 ${className}`}
                    name={name}
                    rows={rows}
                    cols={cols}
                    required={required}
                    value={value}
                    onChange={onTextAreaChange}
                ></textarea>
            ) : (
                <input
                    className={`w-full bg-purple-500 bg-opacity-5 rounded-lg shadow border border-black border-opacity-20 outline-none p-1 px-2 ${className}`}
                    type={type}
                    required={required}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    );
};

Input.defaultProps = {
    required: false,
    type: "text",
    textarea: false,
    rows: 5,
};

export default Input;
