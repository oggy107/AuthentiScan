import { FC, ChangeEvent, useState, useEffect, FormEvent } from "react";
import { toast } from "react-toastify";

import Input from "../components/Input";
import Button from "../components/Button";
import useAddTrustedEntity from "../hooks/useAddTrustedEntity";
import { TrustedEntitiesErrors, WalletErrors } from "../errors";

const AddTrustedEntity: FC = (): JSX.Element => {
    const [address, setAddress] = useState<string>("");

    const {
        addTrustedEntity,
        isEnabled,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useAddTrustedEntity();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name == "address") {
            setAddress(event.target.value);
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!address.startsWith("0x")) {
            toast.error("Invalid address", { toastId: "invalid" });
            return;
        }

        addTrustedEntity(address as `0x{string}`);
    };

    const handleError = (error: Error | null) => {
        if (error?.message.includes(TrustedEntitiesErrors.NotOwner.Exception)) {
            toast.error(TrustedEntitiesErrors.NotOwner.ExceptionMessage);
        } else if (
            error?.message.includes(
                TrustedEntitiesErrors.AlreadyTrusted.Exception
            )
        ) {
            toast.error(TrustedEntitiesErrors.AlreadyTrusted.ExceptionMessage);
        } else if (
            error?.message.includes(WalletErrors.WalletUserRejected.Error)
        ) {
            toast.error(WalletErrors.WalletUserRejected.ErrorMessage);
        } else {
            toast.error(error?.name);
        }
    };

    useEffect(() => {
        if (isLoading) {
            toast.dismiss();
            toast.info("Please check wallet");
        }

        if (isSuccess) {
            toast.dismiss();
            toast.success("Added Trusted Entity Successfully");
        }

        if (isError) {
            toast.dismiss();
            handleError(error);
        }
    }, [isLoading, isSuccess, isError]);

    return (
        <div className="flex flex-grow mt-[70px] mb-[155px]">
            <div className="w-full h-full flex items-center flex-col">
                <div className="text-gray-950 text-4xl font-bold mb-2 mt-[100px]">
                    Enter Trusted Entity Details
                </div>
                <div className="w-[40%]">
                    <form onSubmit={handleSubmit} className="mt-[20px]">
                        <Input
                            lable="Wallet Address of Trusted Entity"
                            name="address"
                            value={address}
                            onChange={handleChange}
                        />
                        <div className="w-full flex justify-center mt-12">
                            <Button
                                title="Add Trusted Entity"
                                type="submit"
                                disabled={isLoading || !isEnabled}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTrustedEntity;
