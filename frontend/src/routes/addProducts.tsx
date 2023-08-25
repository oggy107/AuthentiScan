import { FC, useEffect } from "react";
import { useAccount } from "wagmi";

import { Route } from "../types";
import { useHeader } from "../context/HeaderContext";
import useGetManufacturer from "../hooks/useGetManufacturer";
import { RegistrationVMExceptions } from "../errors";
import { toast } from "react-toastify";
import fullLogo from "../assets/logoFull-dark.svg";
import Input from "../components/Input";
import Button from "../components/Button";

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

const AddProductForm: FC = () => {
    return (
        <form className="p-5 mt-[20px] mx-[90px]">
            <div className="text-gray-950 text-4xl font-bold mb-2">
                Enter Product Details
            </div>
            {/* <div className="w-full flex gap-5"></div> */}
            <div className="mt-[20px]">
                <Input
                    lable="Product Name"
                    name="productName"
                    // value={}
                    // onChange={}
                    required
                />
            </div>
            <div className="mt-[20px]">
                <Input
                    lable="Product unique Id"
                    name="productId"
                    // value={}
                    // onChange={}
                    required
                />
            </div>
            <div className="mt-[20px]">
                <Input
                    lable="Product Description"
                    name="productDesc"
                    // value={}
                    // onChange={}
                    required
                    textarea
                />
            </div>
            <div className="mt-[20px]">
                <Input
                    lable="MFG Date"
                    name="productMFGDate"
                    // value={}
                    // onChange={}
                    required
                    type="date"
                />
            </div>
            <div className="mt-[20px]">
                <Input
                    lable="Expiration Date"
                    name="productEXPDate"
                    // value={}
                    // onChange={}
                    type="date"
                    required
                />
            </div>
            <Button className="mt-4" title="Register Product" type="submit" />
        </form>
    );
};

const AddProduct: FC = (): JSX.Element => {
    const { setNavLinks, setProfile } = useHeader();
    const { address, isConnected } = useAccount();
    const { manufacturer, isSuccess, isError, error } =
        useGetManufacturer(address);

    useEffect(() => {
        setNavLinks([
            {
                name: "Home",
                route: Route.HOME,
            },
            {
                name: "Profile",
                route: Route.PROFILE,
            },
            {
                name: "Add Products",
                route: Route.ADD_PRODUCTS,
            },
            {
                name: "View Products",
                route: Route.VIEW_PRODUCTS,
            },
        ]);
    }, []);

    useEffect(() => {
        if (isError) {
            if (
                error?.message.includes(
                    RegistrationVMExceptions.ManufacturerNotRegistered.Exception
                )
            ) {
                toast.error(
                    RegistrationVMExceptions.ManufacturerNotRegistered
                        .ExceptionMessage
                );
            } else {
                toast.error(error?.name);
            }
        }
        if (isSuccess) {
            if (manufacturer) {
                setProfile({
                    name: manufacturer.name,
                    logo: manufacturer.logo,
                });
            }
        }
    }, [isError, isSuccess]);
    return (
        <div className="flex flex-grow">
            <div className="w-full h-ful">
                <div className="w-full h-full grid grid-cols-2">
                    <Info />
                    <AddProductForm />
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
