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
        console.log(manufacturer);
        setSelected(manufacturer);
        setDropDownOpen(false);
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
                    className={`w-full bg-white rounded-lg shadow border border-gray-100 absolute left-0 bottom-0 translate-y-[102%] transition-all overflow-hidden ${
                        dropDownOpen ? "max-h-[200px]" : "h-0 border-none"
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
    // const { verifiedManufacturers } = useGetVerifiedManufacturers();
    const verifiedManufacturers = [
        {
            companyAddress: "Rome, Palazzo della Civiltà Italiana.",
            email: "fendi@gmail.com",
            id: "0x95cED938F7991cd0dFcb48F0a06a40FA1_fendi",
            isVerified: true,
            logo: "https://w7.pngwing.com/pngs/747/213/png-transparent-fendi-logo-icon.png",
            name: "Fendi",
            regTime: 1693050375n,
            registrarId: "jack1212112",
            registrarName: "jack",
            registrationNo: "24824727",
            taxId: "824823482",
        },
        {
            companyAddress: "Rome, Palazzo della Civiltà Italiana.",
            email: "fendi@gmail.com",
            id: "0x95cED938F7991cd0dFcb48F0a06a40_gucci",
            isVerified: true,
            logo: "https://w7.pngwing.com/pngs/747/213/png-transparent-fendi-logo-icon.png",
            name: "Gucci",
            regTime: 1693050375n,
            registrarId: "jack1212112",
            registrarName: "jack",
            registrationNo: "24824727",
            taxId: "824823482",
        },
        {
            companyAddress: "Rome, Palazzo della Civiltà Italiana.",
            email: "fendi@gmail.com",
            id: "0x95cED938F7991cd0dFcb48F0a06a40FA_prada",
            isVerified: true,
            logo: "https://w7.pngwing.com/pngs/747/213/png-transparent-fendi-logo-icon.png",
            name: "Prada",
            regTime: 1693050375n,
            registrarId: "jack1212112",
            registrarName: "jack",
            registrationNo: "24824727",
            taxId: "824823482",
        },
        {
            companyAddress: "Rome, Palazzo della Civiltà Italiana.",
            email: "fendi@gmail.com",
            id: "0x95cED938F7991cd0dFcb48F0a06a40FA_tesla",
            isVerified: true,
            logo: "https://w7.pngwing.com/pngs/747/213/png-transparent-fendi-logo-icon.png",
            name: "Tesla",
            regTime: 1693050375n,
            registrarId: "jack1212112",
            registrarName: "jack",
            registrationNo: "24824727",
            taxId: "824823482",
        },
        {
            companyAddress: "Rome, Palazzo della Civiltà Italiana.",
            email: "fendi@gmail.com",
            id: "0x95cED938F7991cd0dFcb48F0a06a40FA_samsumg",
            isVerified: true,
            logo: "https://w7.pngwing.com/pngs/747/213/png-transparent-fendi-logo-icon.png",
            name: "Samsung",
            regTime: 1693050375n,
            registrarId: "jack1212112",
            registrarName: "jack",
            registrationNo: "24824727",
            taxId: "824823482",
        },
        {
            companyAddress: "Rome, Palazzo della Civiltà Italiana.",
            email: "fendi@gmail.com",
            id: "0x95cED938F7991cd0dFcb48F0a06a40FA_apple",
            isVerified: true,
            logo: "https://w7.pngwing.com/pngs/747/213/png-transparent-fendi-logo-icon.png",
            name: "Apple",
            regTime: 1693050375n,
            registrarId: "jack1212112",
            registrarName: "jack",
            registrationNo: "24824727",
            taxId: "824823482",
        },
    ];
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
        <form
            onSubmit={hanldeSubmit}
            className="p-5 mt-[20px] mx-[90px] w-full h-full flex items-center justify-center"
        >
            <div className="w-[50%]">
                <div className="text-4xl font-bold text-center">
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
                    <Input
                        lable="Enter Product Id"
                        name="productId"
                        className="py-2"
                        required
                        value={productId}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-[58.26px] w-full flex justify-end">
                    <Button title="Check" type="submit" />
                </div>
            </div>
        </form>
    );
};

export default CheckAuthenicityForm;
