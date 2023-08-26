import {
    FC,
    useState,
    Dispatch,
    SetStateAction,
    ChangeEvent,
    FormEvent,
    useEffect,
} from "react";
import { toast } from "react-toastify";

import dropDownIcon from "../assets/icons/drop-down.svg";
import Button from "./Button";
import Input from "./Input";
import useGetVerifiedManufacturers from "../hooks/useGetVerifiedManufacturers";
import useVerifyProduct from "../hooks/useVerifyProduct";
import { Manufacturer } from "../types";
import selectedIcon from "../assets/icons/selected.svg";
import { AccessErrors, WalletErrors } from "../errors";

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
    const [selectedManufacturer, setSelectedManufacturer] =
        useState<Manufacturer>();
    const [productId, setProductId] = useState<string>("");

    const { verifiedManufacturers } = useGetVerifiedManufacturers();
    const { verifiedProduct, isError, isSuccess, error } = useVerifyProduct(
        "0x2",
        "sf"
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name == "productId") {
            setProductId(event.target.value);
        }
    };

    const handleErrors = (error: Error | null) => {
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
        toast.dismiss();

        if (isError) {
            handleErrors(error);
        }
        if (isSuccess) {
            toast.success("Product Is Authentic");
        }
    }, [isError, isSuccess]);

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
            className="p-5 mt-[20px] mx-[90px] w-full h-full flex items-center"
        >
            <div className="w-[50%] mr-[265px]">
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
