import { FC, FormEvent, useState, ChangeEvent, useEffect } from "react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";

import Input from "./Input";
import Button from "./Button";
import useRegisterManufacturer from "../hooks/useRegisterManufacturer";
import { RegistrationVMExceptions } from "../errors";
import { useStage } from "../context/StageContext";

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

    const stageContext = useStage();
    const { setStage } = stageContext!;

    const { isConnected } = useAccount();

    const verifyLogo = (logo: string) => {
        try {
            new URL(logo);
        } catch (error) {
            return false;
        }

        return true;
    };

    const handleError = (error?: string) => {
        toast.error(error);
    };

    useEffect(() => {
        if (isLoading) {
            toast.info("Please check wallet", { autoClose: false });
        }

        if (isSuccess) {
            toast.dismiss();
            toast.success("Registered Successfully");
            setStage("welcome");
        }

        if (isError) {
            toast.dismiss();
            if (
                error?.message.includes(
                    RegistrationVMExceptions.ManufacturerAlreadyRegistered
                        .Exception
                )
            ) {
                handleError(
                    RegistrationVMExceptions.ManufacturerAlreadyRegistered
                        .ExceptionMessage
                );
            } else {
                handleError(error?.name);
            }
        }
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!isConnected) {
            toast.error("Please connect wallet", { toastId: "wallet" });
            return;
        }

        if (!verifyLogo(logo)) {
            toast.error("Logo invalid", { toastId: "logo" });
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
