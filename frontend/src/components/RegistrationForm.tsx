import {
    FC,
    HTMLInputTypeAttribute,
    HTMLProps,
    FormEvent,
    useState,
    ChangeEvent,
} from "react";

// Libarary suggestion
// npm install react-hook-form

import { useAccount } from "wagmi";

import Button from "./Button";

import useRegisterManufacturer from "../hooks/useRegisterManufacturer";

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

const RegistrationForm: FC = () => {
    const [companyName, setCompanyName] = useState<string>("");
    const [registrationNo, setRegistrationNo] = useState<string>("");
    const [logo, setLogo] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    // const [website, setWebsite] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [registrar, setRegistrar] = useState<string>("");
    const [registrarId, setRegistrarId] = useState<string>("");
    const [taxId, setTaxId] = useState<string>("");
    // const [bankNo, setBankNo] = useState<string>("")

    const { register, isEnabled, isLoading, isSuccess, isError, error } =
        useRegisterManufacturer();

    const { isConnected } = useAccount();

    const verifyLogo = (logo: string) => {
        try {
            const t = new URL(logo);
            console.log(t);
        } catch (error) {
            return false;
        }

        return true;
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        // TODO: same here
        // console.log(isConnected);

        if (!verifyLogo(logo)) {
            // TODO: inform to user with toast
            return;
        }

        register(
            companyName,
            registrationNo,
            logo,
            address,
            email,
            registrar,
            registrarId,
            taxId
        );

        // TODO: handle errors and success with toasts

        // console.log(companyName);
        // console.log(registrationNo);
        // console.log(logo);
        // console.log(address);
        // console.log(email);
        // console.log(registrar);
        // console.log(registrarId);
        // console.log(taxId);
    };

    const handleChanges = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case "companyName":
                setCompanyName(value);
                break;
            case "registrationNo":
                setRegistrationNo(value);
                break;
            case "logo":
                setLogo(value);
                break;
            case "address":
                setAddress(value);
                break;
            // case "website":
            //     setWebsite(value);
            //     break;
            case "email":
                setEmail(value);
                break;
            case "registrar":
                setRegistrar(value);
                break;
            case "registrarId":
                setRegistrarId(value);
                break;
            case "taxId":
                setTaxId(value);
                break;
            // case "bankNo":
            //     setBankNo(value);
            //     break;
            default:
                break;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 mt-[20px] mx-[90px]">
            <div className="text-gray-950 text-4xl font-bold mb-2">
                Fill In The Details
            </div>
            <div className="w-full flex gap-5">
                <Input
                    lable="Company name"
                    name="companyName"
                    value={companyName}
                    onChange={handleChanges}
                    required
                />
                <Input
                    lable="Company registration number"
                    name="registrationNo"
                    value={registrationNo}
                    onChange={handleChanges}
                    required
                />
            </div>
            <div className="mt-[20px]">
                <Input
                    className="w-[49%]"
                    lable="Company logo (URL only)"
                    name="logo"
                    value={logo}
                    onChange={handleChanges}
                    required
                />
            </div>
            <div className="mt-[20px]">
                <Input
                    lable="Company address"
                    name="address"
                    value={address}
                    onChange={handleChanges}
                    required
                />
            </div>
            <div className="w-full flex gap-5 mt-[20px]">
                {/* <Input
                    lable="Website"
                    name="website"
                    value={website}
                    onChange={handleChanges}
                    required
                /> */}
                <Input
                    lable="Official Email"
                    name="email"
                    value={email}
                    onChange={handleChanges}
                    type="email"
                    required
                />
            </div>
            <div className="w-full flex gap-5 mt-[20px]">
                <Input
                    lable="Registrar name"
                    name="registrar"
                    value={registrar}
                    onChange={handleChanges}
                    required
                />
                <Input
                    lable="Registrar ID"
                    name="registrarId"
                    value={registrarId}
                    onChange={handleChanges}
                    required
                />
            </div>
            <div className="mt-[20px]">
                <Input
                    className="w-[49%]"
                    lable="Tax Identification number"
                    name="taxId"
                    value={taxId}
                    onChange={handleChanges}
                    required
                />
            </div>
            {/* <div className="mt-[20px]">
                <Input
                    className="w-[49%]"
                    lable="Bank number (for identification purposes)"
                    name="bankNo"
                    value={bankNo}
                    onChange={handleChanges}
                    required
                />
            </div> */}
            <Button
                className="mt-[50px]"
                title="Register"
                type="submit"
                disabled={isLoading || !isEnabled}
            />
        </form>
    );
};

export default RegistrationForm;
