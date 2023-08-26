import { FC, useState, Dispatch, SetStateAction } from "react";

import txtlogo from "../assets/logoFull-dark.svg";
import CheckAuthenicityForm from "../components/CheckAuthenicityForm";
import { Product } from "../types";
import Button from "../components/Button";

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
}

// TODO: just this one :) :>
const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
    return (
        <div className="p-5 mt-[20px] mx-[90px] w-full h-full flex items-center">
            {product.name}
        </div>
    );
};

const CheckAuthenticity: FC = (): JSX.Element => {
    const [verifiedProduct, setVerifiedProduct] = useState<Product | undefined>(
        undefined
    );

    return (
        <div className="flex flex-grow mt-[70px] mb-[155px]">
            <div className="w-full h-full grid grid-cols-2 ">
                <Info
                    isProductVerified={verifiedProduct != undefined}
                    setVerifiedProduct={setVerifiedProduct}
                />
                {verifiedProduct == undefined ? (
                    <CheckAuthenicityForm
                        verifiedProduct={verifiedProduct}
                        setVerifiedProduct={setVerifiedProduct}
                    />
                ) : (
                    <ProductDetails product={verifiedProduct} />
                )}
            </div>
        </div>
    );
};

export default CheckAuthenticity;
