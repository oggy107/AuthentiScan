import { FC } from "react";

import dropDownIcon from "../assets/icons/drop-down.svg";
import Button from "./Button";
import Input from "./Input";

const CheckAuthenicityForm: FC = () => {
    return (
        <form className="p-5 mt-[20px] mx-[90px] w-full h-full flex items-center justify-center">
            <div className="w-[50%]">
                <div className="text-4xl font-bold text-center">
                    Check Authenticity
                </div>
                <div className="text-gray-700 mt-[25px] text-center">
                    Select manufacturer and product unique id to check the
                    authenticity of your product.
                </div>
                <div className="mt-[69px] w-full">
                    <div className="text-black text-base font-normal w-[249px] h-[32px]">
                        Select Manufacturer
                    </div>
                    <div className="w-[383px] h-11 px-3.5 py-2.5 rounded-lg shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                        <div className="w-[327px] h-6 text-gray-500 text-base font-normal leading-normal">
                            Select Manufacturer
                        </div>

                        <span>
                            <img src={dropDownIcon} alt="dropdown button" />
                        </span>

                        <div className=""></div>
                    </div>
                </div>

                <div className="mt-[26px]">
                    <Input
                        lable="Enter Product Id"
                        name="productId"
                        className="py-2"
                    />
                </div>

                <div className="mt-[58.26px] w-full flex justify-end">
                    <Button title="Check" />
                </div>
            </div>
        </form>
    );
};

export default CheckAuthenicityForm;
