import { FC } from "react";
import verifiedLogo from "../assets/icons/verified.svg";

import { useUser } from "../context/UserContext";
import { Manufacturer } from "../types";

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
    const { manufacturer } = useUser();

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
