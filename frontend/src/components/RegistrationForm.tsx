import { FC, HTMLInputTypeAttribute, HTMLProps, FormEvent } from "react";

import Button from "./Button";

interface InputProps {
    lable: string;
    name: string;
    required?: boolean;
    type?: HTMLInputTypeAttribute;
    className?: HTMLProps<HTMLElement>["className"];
}

const Input: FC<InputProps> = ({ lable, name, required, type, className }) => {
    return (
        <div className="w-full">
            <p className="text-neutral-500 text-base">{lable}</p>
            <input
                className={`w-full bg-purple-500 bg-opacity-5 rounded-lg shadow border border-black border-opacity-20 outline-none p-1 px-2 ${className}`}
                type={type}
                required={required}
                name={name}
            />
        </div>
    );
};

Input.defaultProps = {
    required: false,
    type: "text",
};

const RegistrationForm: FC = () => {
    // const companyNameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        // get inputs from form
        // const companyName = companyNameRef.current?.value;
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 mt-[20px] mx-[90px]">
            <div className="text-gray-950 text-4xl font-bold mb-2">
                Fill In The Details
            </div>
            <div className="w-full flex gap-5">
                <Input lable="Company name" name="company name" required />
                <Input
                    lable="Company registration number"
                    name="registrationNo"
                    required
                />
            </div>
            <div className="mt-[20px]">
                <Input
                    className="w-[49%]"
                    lable="Company logo (URL only)"
                    name="logo"
                    required
                />
            </div>
            <div className="mt-[20px]">
                <Input lable="Company address" name="address" required />
            </div>
            <div className="w-full flex gap-5 mt-[20px]">
                <Input lable="Website" name="website" required />
                <Input lable="Official Email" name="email" required />
            </div>
            <div className="w-full flex gap-5 mt-[20px]">
                <Input lable="Registrar name" name="registrar" required />
                <Input lable="Registrar ID" name="registrarId" required />
            </div>
            <div className="mt-[20px]">
                <Input
                    className="w-[49%]"
                    lable="Tax Identification number"
                    name="taxId"
                    required
                />
            </div>
            <div className="mt-[20px]">
                <Input
                    className="w-[49%]"
                    lable="Bank number (for identification purposes)"
                    name="bankNo"
                    required
                />
            </div>
            <Button className="mt-[20px]" title="Register" type="submit" />
        </form>
    );
};

export default RegistrationForm;
