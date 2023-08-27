import { FC, useState, Dispatch, SetStateAction } from "react";

import txtlogo from "../assets/logoFull-dark.svg";
import CheckAuthenicityForm from "../components/CheckAuthenicityForm";
import { Manufacturer, Product } from "../types";
import Button from "../components/Button";
import { epochToDate } from "../utils";

interface InfoProps {
    isProductVerified: boolean;
    setVerifiedProduct: Dispatch<SetStateAction<Product | undefined>>;
}

const Info: FC<InfoProps> = ({ isProductVerified, setVerifiedProduct }) => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div>
                <div>
                    <span>
                        <img src={txtlogo} alt="Authentiscan" />
                    </span>
                </div>
                <div className="mt-[74.19px] w-[345px]">
                    <div className="text-gray-500 ">
                        AuthentiScan Let you easily verify your products using
                        blockchain technology.
                    </div>
                    <br />
                    {isProductVerified ? (
                        <div>
                            <div className="text-gray-500">
                                <div>
                                    Here are the details of item we found on the
                                    blockchain.
                                </div>
                                <br />
                                <div>
                                    To check more products, click on the button
                                    below.
                                </div>
                            </div>
                            <Button
                                className="mt-[44px]"
                                title="Check another Product"
                                onclick={() => {
                                    setVerifiedProduct(undefined);
                                }}
                            />
                        </div>
                    ) : (
                        <div>
                            <span className=" text-gray-700">
                                It’s easy as 1 2 3:
                            </span>{" "}
                            <br />
                            <div className="text-gray-500">
                                Select manufacturer <br />
                                Enter Product unique id <br /> Hit check button{" "}
                                <br /> <br />
                                and we will search the whole universe for your
                                product authenticity.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

interface ProductDetailsProps {
    product: Product;
    manufacturer: Manufacturer | undefined;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product, manufacturer }) => {
    return (
        <div className="p-5 mt-[20px] mx-[90px] w-full h-full flex flex-col items-center justify-start pr-[150px]">
            <div className="text-center">
                <div className="text-4xl font-bold my-3">Product Details</div>
                <div className="text-neutral-700">
                    Here are the details of product we found on the blockchain.
                </div>
            </div>
            <div className="w-full mt-[50px]">
                <div className="grid grid-cols-2 gap-[50px]">
                    <div className="flex">
                        <div className="text-neutral-500 mr-[10px]">
                            Product Name:
                        </div>
                        <div className="flex-grow text-black border-b border-zinc-300">
                            {product.name}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="text-neutral-500 mr-[10px]">
                            Manufacturer:
                        </div>
                        <div className="flex-grow text-black border-b border-zinc-300">
                            {manufacturer?.name}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-[50px] mt-[25px]">
                    <div className="flex">
                        <div className="text-neutral-500 mr-[10px]">MFD:</div>
                        <div className="flex-grow text-black border-b border-zinc-300">
                            {product.MFDDate}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="text-neutral-500 mr-[10px]">EXP:</div>
                        <div className="flex-grow text-black border-b border-zinc-300">
                            {product.EXPDate}
                        </div>
                    </div>
                </div>
                <div className="flex mt-[25px]">
                    <div className="text-neutral-500 mr-[10px]">
                        Product ID:
                    </div>
                    <div className="flex-grow text-black border-b border-zinc-300">
                        {product.id}
                    </div>
                </div>
                <div className="flex mt-[25px]">
                    <div className="text-neutral-500 mr-[10px]">
                        Registration Date:
                    </div>
                    <div className="flex-grow text-black border-b border-zinc-300">
                        {epochToDate(Number(product.regTime))}
                    </div>
                </div>
                <div className="mt-[25px]">
                    <div className="text-neutral-500 mr-[10px]">
                        Description:
                    </div>
                    <div className="flex-grow mt-[10px]">
                        {product.description}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CheckAuthenticity: FC = (): JSX.Element => {
    const [verifiedProduct, setVerifiedProduct] = useState<Product | undefined>(
        undefined
    );
    const [productManufacturer, setProductManufacturer] = useState<
        Manufacturer | undefined
    >(undefined);

    return (
        <div className="flex flex-grow mt-[70px] mb-[155px]">
            <div className="w-full h-full grid grid-cols-2">
                <Info
                    isProductVerified={verifiedProduct != undefined}
                    setVerifiedProduct={setVerifiedProduct}
                />
                {verifiedProduct == undefined ? (
                    <CheckAuthenicityForm
                        verifiedProduct={verifiedProduct}
                        setVerifiedProduct={setVerifiedProduct}
                        setProductManufacturer={setProductManufacturer}
                    />
                ) : (
                    <ProductDetails
                        product={verifiedProduct}
                        manufacturer={productManufacturer}
                    />
                )}
            </div>
        </div>
    );
};

export default CheckAuthenticity;
