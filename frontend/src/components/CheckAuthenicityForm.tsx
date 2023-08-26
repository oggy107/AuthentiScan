import { FC } from "react";
import DropDown from "../assets/icons/drop-down.svg";
import useGetManufacturer from "../hooks/useGetManufacturer";

const CheckAuthenicityForm: FC = () => {
    return (
        <form className="p-5 mt-[20px] mx-[90px]">
            <div className="mt-[80px] ml-[70px] w-[386px] h-[429px]">
                <div className="text-black text-4xl font-bold text-center w-[377px] h-[63px]">
                    Check Authenticity
                </div>
                <div className="text-gray-700 mt-[25px] text-center">
                    Select manufacturer and product unique id to check the
                    authenticity of your product.
                </div>

                <div className="mt-[69px]">
                    <DropDown
                        selected={selectedManufacturer}
                        setSelected={setSelectedManufacturer}
                        verifiedManufacturers={verifiedManufacturers}
                    />
                </div>

                <div className="mt-[26px]">
                    <div className="text-black text-base font-normal">
                        Enter Product ID
                    </div>

                    <div>
                        <input
                            className="pl-4 w-[383.45px] h-[43.74px] bg-purple-500 bg-opacity-5 rounded-lg border border-gray-300"
                            type="number"
                        />
                    </div>
                </div>

                <div className="mt-[58.26px] flex justify-end">
                    <div className="w-[176px] h-[43px] bg-blue-900 rounded-[7px] flex items-center justify-center">
                        <button className="text-white text-base font-normal text-center">
                            CHECK
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CheckAuthenicityForm;
