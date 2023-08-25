import { FC, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useAccount } from "wagmi";

import useRegisterProducts from "../hooks/useRegisterProduct";
import { WalletErrors, AccessErrors } from "../errors";
import { toast } from "react-toastify";
import fullLogo from "../assets/logoFull-dark.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";
import duck from "../assets/animation_duck.gif";
import { useNavigate } from "react-router-dom";
import { Route } from "../types";

const Info: FC = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-[60%]">
                <div>
                    <img src={fullLogo} alt="authentiscan logo" />
                </div>
                <div className="text-neutral-500 mt-[41px]">
                    AuthentiScan provides easy solutions for you to register
                    your products on the blockchain. <br />
                    <br />
                    Simply fill up the product details and click on ‘Register On
                    Blockchain’.You will be charged some gas fee for the
                    transaction. Your products stays on the blockchain as long
                    as blockchain stays, that is literally till eternity.
                </div>
            </div>
        </div>
    );
};

interface AddProductFormProps {
    isConnected: boolean;
}

const AddProductForm: FC<AddProductFormProps> = ({ isConnected }) => {
    const [productName, setProductName] = useState<string>("");
    const [productId, setProductId] = useState<string>("");
    const [productDesc, setProductDesc] = useState<string>("");
    const [productMFGDate, setProductMFGDate] = useState<string>("");
    const [productEXPDate, setProductEXPDate] = useState<string>("");

    const { registerProduct, isEnabled, isLoading, isSuccess, isError, error } =
        useRegisterProducts();

    const handleChanges = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case "productName":
                setProductName(value);
                break;
            case "productId":
                setProductId(value);
                break;
            case "productDesc":
                setProductDesc(value);
                break;
            case "productMFGDate":
                setProductMFGDate(value);
                break;
            case "productEXPDate":
                setProductEXPDate(value);
                break;
            default:
                break;
        }
    };

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.name == "productDesc") {
            setProductDesc(event.target.value);
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!isConnected) {
            toast.error("Please connect wallet", { toastId: "wallet" });
            return;
        }

        registerProduct(
            productId,
            productName,
            productDesc,
            productMFGDate,
            productEXPDate
        );
    };

    const handleError = (error: Error | null) => {
        if (error?.message.includes(AccessErrors.NotVerified.Exception)) {
            toast.error(AccessErrors.NotVerified.ExceptionMessage);
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
            toast.success("Product Registered Successfully");
        }

        if (isError) {
            toast.dismiss();
            handleError(error);
        }
    }, [isLoading, isSuccess, isError]);

    return (
        <form onSubmit={handleSubmit} className="p-5 mt-[20px] mx-[90px]">
            <div className="text-gray-950 text-4xl font-bold mb-2">
                Enter Product Details
            </div>
            <div className="mt-[20px]">
                <Input
                    lable="Product Name"
                    name="productName"
                    value={productName}
                    onChange={handleChanges}
                    required
                />
            </div>
            <div className="mt-[20px]">
                <Input
                    lable="Product unique Id"
                    name="productId"
                    value={productId}
                    onChange={handleChanges}
                    required
                />
            </div>
            <div className="mt-[20px]">
                <Input
                    lable="Product Description"
                    name="productDesc"
                    value={productDesc}
                    onTextAreaChange={handleTextAreaChange}
                    required
                    textarea
                />
            </div>
            <div className="mt-[20px]">
                <Input
                    lable="MFG Date"
                    name="productMFGDate"
                    value={productMFGDate}
                    onChange={handleChanges}
                    required
                    type="date"
                />
            </div>
            <div className="mt-[20px]">
                <Input
                    lable="Expiration Date"
                    name="productEXPDate"
                    value={productEXPDate}
                    onChange={handleChanges}
                    type="date"
                    required
                />
            </div>
            <Button
                className="mt-4"
                title="Register Product"
                type="submit"
                disabled={isLoading || !isEnabled}
            />
        </form>
    );
};

const AddProduct: FC = (): JSX.Element => {
    const { isConnected } = useAccount();
    const { manufacturer } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!manufacturer) {
            navigate(Route.REGISTER);
        }
    }, [manufacturer]);

    return (
        <div className="flex flex-grow">
            <div className="w-full h-full">
                {manufacturer?.isVerified ? (
                    <div className="w-full h-full grid grid-cols-2">
                        <Info />
                        <AddProductForm isConnected={isConnected} />
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
                        <div className="text-5xl">You Are Not Verified Yet</div>
                        <img src={duck} alt="duck" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddProduct;
