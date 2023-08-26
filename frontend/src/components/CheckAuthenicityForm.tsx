import { FC, useState } from "react";

import dropDownIcon from "../assets/icons/drop-down.svg";
import Button from "./Button";
import Input from "./Input";

const DropDown: FC = () => {
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const toggleDropDown = () => {
        setDropDownOpen((prev) => !prev);
    };

    return (
        <div className="w-full relative">
            <div className="mb-1">Select Manufacturer</div>
            <div className="w-full px-3.5 py-2.5 rounded-lg shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                <div className="w-full h-6 text-gray-500">
                    Select Manufacturer
                </div>
                <span onClick={toggleDropDown}>
                    <img
                        className={`transition-all ${
                            dropDownOpen ? "rotate-180" : ""
                        }`}
                        src={dropDownIcon}
                        alt="dropdown button"
                    />
                </span>
                <div
                    className={`w-full bg-white rounded-lg shadow border border-gray-100 absolute left-0 bottom-0 translate-y-[102%] transition-all overflow-hidden ${
                        dropDownOpen ? "h-[100px]" : "h-0"
                    }`}
                >
                    <div>cool</div>
                    <div>cool</div>
                    <div>cool</div>
                    <div>cool</div>
                    <div>cool</div>
                </div>
            </div>
        </div>
    );
};

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

                <div className="mt-[69px]">
                    <DropDown />
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
