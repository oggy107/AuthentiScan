import {
    FC,
    useState,
    Dispatch,
    SetStateAction,
    ChangeEvent,
    FormEvent,
} from "react";
import { toast } from "react-toastify";

import dropDownIcon from "../assets/icons/drop-down.svg";
import Button from "./Button";
import Input from "./Input";
import useGetVerifiedManufacturers from "../hooks/useGetVerifiedManufacturers";
import { Manufacturer } from "../types";
import selectedIcon from "../assets/icons/selected.svg";

interface DropDownProps {
    selected: Manufacturer | undefined;
    setSelected: Dispatch<SetStateAction<Manufacturer | undefined>>;
    verifiedManufacturers: readonly Manufacturer[] | undefined;
}

const DropDown: FC<DropDownProps> = ({
    selected,
    setSelected,
    verifiedManufacturers,
}) => {
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const toggleDropDown = () => {
        setDropDownOpen((prev) => !prev);
    };

    const handleSelection = (manufacturer: Manufacturer) => {
        setSelected(manufacturer);
    };

    return (
        <div className="w-full relative">
            <div className="mb-1">Select Manufacturer</div>
            <div
                onClick={toggleDropDown}
                className="w-full px-3.5 py-2.5 rounded-lg shadow border border-gray-300 justify-start items-center gap-2 inline-flex hover:border-purple-300"
            >
                <div
                    className={`w-full h-6 ${
                        selected ? "text-black" : "text-gray-500"
                    }`}
                >
                    {selected ? selected.name : "Select Manufacturer"}
                </div>
                <span>
                    <img
                        className={`transition-all ${
                            dropDownOpen ? "rotate-180" : ""
                        }`}
                        src={dropDownIcon}
                        alt="dropdown button"
                    />
                </span>
                <div
                    className={`w-full bg-white rounded-lg shadow border border-gray-100 absolute left-0 bottom-0 translate-y-[102%] transition-all overflow-y-scroll no-scrollbar ${
                        dropDownOpen ? "max-h-[135px]" : "h-0 border-none"
                    }`}
                >
                    {verifiedManufacturers?.map((manufacturer, index) => (
                        <div
                            className="px-[14px] py-[10px] hover:bg-slate-100 text-gray-900 flex justify-between"
                            onClick={() => handleSelection(manufacturer)}
                            key={index}
                        >
                            <div>{manufacturer.name}</div>
                            {selected && selected.id === manufacturer.id && (
                                <div>
                                    <img src={selectedIcon} alt="selected" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CheckAuthenicityForm: FC = () => {
    const { verifiedManufacturers } = useGetVerifiedManufacturers();
    const [selectedManufacturer, setSelectedManufacturer] =
        useState<Manufacturer>();
    const [productId, setProductId] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name == "productId") {
            setProductId(event.target.value);
        }
    };

    const hanldeSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!selectedManufacturer) {
            toast.error("Please Select Manufacturer");
        }

        console.log("hehe", selectedManufacturer, productId);
    };

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
