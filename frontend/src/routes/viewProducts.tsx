import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useGetProducts from "../hooks/useGetProducts";
import { useUser } from "../context/UserContext";
import { Route } from "../types";
import { AccessErrors, WalletErrors } from "../errors";
import { toast } from "react-toastify";
import duck from "../assets/animation_duck.gif";

const ViewProduct: FC = (): JSX.Element => {
    const navigate = useNavigate();

    const { products, isError, error } = useGetProducts();
    const { manufacturer } = useUser();

    useEffect(() => {
        if (!manufacturer) {
            navigate(Route.REGISTER);
        }
    }, [manufacturer]);

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
        if (isError) {
            handleError(error);
        }
    }, [isError]);

    return (
        <div className="flex flex-grow mt-[70px] mb-[155px]">
            <div className="w-full h-full px-5 flex items-center flex-col">
                <div className="mt-2 flex flex-col items-center">
                    <div className="text-gray-950 text-4xl font-bold mb-2">
                        Product List
                    </div>
                    <div className="text-neutral-700 text-base font-normal">
                        Given below are the products you have added to the
                        blockchain
                    </div>
                </div>
                {products ? (
                    <div className="w-full  mt-3">
                        <div className="grid grid-cols-6 border-b border-black border-opacity-25 px-[13px] py-[11px]">
                            <div className="text-zinc-500 text-xs font-medium">
                                Product Name
                            </div>
                            <div className="text-zinc-500 text-xs font-medium">
                                Description
                            </div>
                            <div className="text-zinc-500 text-xs font-medium">
                                product ID
                            </div>
                            <div className="text-zinc-500 text-xs font-medium">
                                MFD
                            </div>
                            <div className="text-zinc-500 text-xs font-medium">
                                EXP
                            </div>
                            <div className="text-zinc-500 text-xs font-medium">
                                Registration Time
                            </div>
                        </div>
                        {products?.map((product) => (
                            <div key={product.id}>product.name</div>
                        ))}
                    </div>
                ) : manufacturer?.isVerified ? (
                    <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
                        <div className="text-5xl">Nothing Yet 🤔 </div>
                        <div className="text-5xl">
                            Register Your First Product{" "}
                            <a
                                className="text-blue-600 cursor-pointer"
                                onClick={() => navigate(Route.ADD_PRODUCTS)}
                            >
                                Here
                            </a>
                        </div>
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

export default ViewProduct;
