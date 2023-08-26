import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import verifiedLogo from "../assets/icons/verified.svg";
import tickLogo from "../assets/icons/subway_tick_non_filled.svg";
import unverifiedLogoFilled from "../assets/icons/alert-fill.svg";
import unverifiedLogo from "../assets/icons/alert.svg";
import duck from "../assets/animation_duck.gif";
import { useUser } from "../context/UserContext";
import { Manufacturer } from "../types";
import { Route } from "../types";

const VerifiedMessage: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full flex items-center justify-center shadow border border-green-600 relative">
            <div className="w-[279px] h-[58px] bg-green-600 rounded-l-full absolute right-0 top-[15%] flex items-center justify-start gap-3 pl-5">
                <img src={tickLogo} alt="verified" />
                <div className="text-white text-4xl font-bold">Verified</div>
            </div>
            <div className="w-[60%] text-center text-xl">
                <span className="text-zinc-700">
                    Congratulations! You are a verified manufacturer on
                    AuthentiScan now.
                    <br />
                    <br />
                    <span className="font-semibold">
                        Register Your First Product{" "}
                        <a
                            className="text-blue-600 cursor-pointer"
                            onClick={() => navigate(Route.ADD_PRODUCTS)}
                        >
                            Here
                        </a>
                    </span>
                </span>
            </div>
        </div>
    );
};

const NotVerifiedMessage: FC = () => {
    return (
        <div className="w-full flex items-center justify-center shadow border border-red-600 relative">
            <div className="w-[279px] h-[58px] bg-red-600 rounded-l-full absolute right-0 top-[15%] flex items-center justify-start gap-3 pl-5">
                <img src={unverifiedLogoFilled} alt="unverified" />
                <div className="text-white text-4xl font-bold">Unverefied</div>
            </div>
            <div className="w-[60%] text-center text-xl">
                <span className="text-zinc-700">
                    Your verification is under process
                    <div className="w-full h-full flex flex-col items-center mt-2">
                        <img src={duck} alt="duck" />
                    </div>
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
        <div className="w-full flex items-center justify-center col-span-2">
            <div className="w-[80%] h-[90%] flex flex-col justify-between py-7">
                <div className="flex items-center gap-10">
                    <div className="w-[130.32px] h-[130.32px] rounded-full border border-zinc-500 flex items-center p-3">
                        <img src={manufacturer.logo} alt={manufacturer.name} />
                    </div>
                    <div>
                        <div className="font-bold text-[21px] flex gap-2">
                            {manufacturer.name}
                            {manufacturer.isVerified ? (
                                <img src={verifiedLogo} alt="verified" />
                            ) : (
                                <img src={unverifiedLogo} alt="unverified" />
                            )}
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
    const navigate = useNavigate();

    useEffect(() => {
        if (!manufacturer) {
            navigate(Route.REGISTER);
        }
    }, [manufacturer]);

    return (
        <div className="flex flex-grow mt-[70px] mb-[155px]">
            {manufacturer && (
                <div className="w-full h-full grid grid-cols-3">
                    {manufacturer.isVerified ? (
                        <VerifiedMessage />
                    ) : (
                        <NotVerifiedMessage />
                    )}
                    <ManufacturerDetails manufacturer={manufacturer} />
                </div>
            )}
        </div>
    );
};

export default Profile;
