import { FC, useEffect } from "react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";

import { useHeader } from "../context/HeaderContext";
import useGetManufacturer from "../hooks/useGetManufacturer";
import { Route } from "../types";
import { RegistrationVMExceptions } from "../errors";
import verifiedLogo from "../assets/icons/verified.svg";

const VerifiedMessage: FC = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-[60%]  text-center">
                <span className="text-zinc-700 text-base font-normal">
                    Congratulations! You are a verified manufacturer on
                    AuthentiScan now.
                    <br />
                    <br />
                    You can now register products on our platfrom
                </span>
            </div>
        </div>
    );
};

const NotVerifiedMessage: FC = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-[60%]  text-center">
                <span className="text-zinc-700 text-base font-normal">
                    Your verification is under process
                    <br />
                    <br />
                    Once complete you will be able to register products on our
                    platfrom
                </span>
            </div>
        </div>
    );
};

interface Manufacturer {
    id: `0x${string}`;
    isVerified: boolean;
    name: string;
    registrationNo: string;
    logo: string;
    companyAddress: string;
    email: string;
    registrarName: string;
    registrarId: string;
    taxId: string;
    regTime: bigint;
}

interface ManufacturerDetailsProps {
    manufacturer: Manufacturer;
}

const ManufacturerDetails: FC<ManufacturerDetailsProps> = ({
    manufacturer,
}) => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-[80%] h-[90%] flex flex-col justify-between py-7">
                <div className="flex items-center gap-10">
                    <div className="w-[130.32px] h-[130.32px] rounded-full border border-zinc-500 flex items-center p-3">
                        <img src={manufacturer.logo} alt={manufacturer.name} />
                    </div>
                    <div>
                        {manufacturer.isVerified && (
                            <img src={verifiedLogo} alt="verified" />
                        )}
                        <div className="font-bold text-[21px]">
                            {manufacturer.name}
                        </div>
                        <div className="text-neutral-700 text-s">
                            <div>{manufacturer.email}</div>
                            <br />
                            <div>
                                Registration No: {manufacturer.registrationNo}
                            </div>
                            <div>Wallet id: {manufacturer.id}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 p-3">
                        <div className="text-lg font-medium">
                            Registrar name:
                        </div>
                        <div>{manufacturer.registrarName}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3">
                        <div className="text-lg font-medium">Registrar id:</div>
                        <div>{manufacturer.registrarId}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3">
                        <div className="text-lg font-medium">Address:</div>
                        <div>{manufacturer.companyAddress}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3">
                        <div className="text-lg font-medium">
                            Registration date:
                        </div>
                        <div>{String(manufacturer.regTime)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Profile: FC = () => {
    const { setNavLinks } = useHeader();
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
    }, [isError, isSuccess]);

    return (
        <div className="flex flex-grow">
            {manufacturer ? (
                <div className="w-full h-full grid grid-cols-2">
                    {manufacturer.isVerified ? (
                        <VerifiedMessage />
                    ) : (
                        <NotVerifiedMessage />
                    )}
                    <ManufacturerDetails manufacturer={manufacturer} />
                </div>
            ) : (
                <div className="w-full h-full">Not Registred</div>
            )}
        </div>
    );
};

export default Profile;
