import { FC } from "react";

import companyIcon from "../assets/icons/mdi_company.svg";
import rocketLogo from "../assets/icons/rocket.svg";
import tickLogo from "../assets/icons/subway_tick.svg";
import { useStage } from "../context/StageContext";

const Progress: FC = () => {
    const stageContext = useStage();
    const { stage } = stageContext!;

    return (
        <div className="w-full h-[75px] relative">
            <div className="w-full h-[0px] top-[26px] absolute border border-blue-900"></div>
            <div className="w-full h-[75px] left-[10px] flex justify-around">
                <div className="w-[58px] h-[75px] relative">
                    <div className="w-12 h-12 left-[8px] top-0 absolute">
                        <div className="w-12 h-12 left-0 top-0 absolute bg-white rounded-full shadow flex justify-center">
                            {stage == "details" ? (
                                <img
                                    className="w-[60%] object-contain"
                                    src={companyIcon}
                                    alt="company"
                                />
                            ) : (
                                <img
                                    className="w-[60%] object-contain"
                                    src={tickLogo}
                                    alt="company"
                                />
                            )}
                        </div>
                    </div>
                    <div
                        className={`left-0 top-[44px] absolute text-xs font-normal leading-[30.60px] ${
                            stage != "details" && "text-stone-400"
                        }`}
                    >
                        Fill Details
                    </div>
                </div>
                <div className="w-[52px] h-[75px] relative ">
                    <div className="w-12 h-12 left-[2px] top-0 absolute">
                        <div className="w-12 h-12 left-0 top-0 absolute bg-white rounded-full shadow flex justify-center">
                            <img
                                className={`w-[60%] object-contain ${
                                    stage != "welcome" && "opacity-60"
                                }`}
                                src={rocketLogo}
                                alt="rocket"
                            />
                        </div>
                    </div>
                    <div
                        className={`left-0 top-[44px] absolute text-xs font-normal leading-[30.60px] ${
                            stage != "welcome" && "text-stone-400"
                        }`}
                    >
                        Welcome
                    </div>
                </div>
            </div>
        </div>
    );
};

const Details: FC = () => {
    return (
        <div className="w-full mt-[72px]">
            <div className="w-[318px] text-blue-900 text-4xl font-bold">
                Insert company Details
            </div>
            <div className="w-[245.63px] text-neutral-700 text-base font-normal mt-[45px]">
                AuthentiScan provides easy solutions for you to register your
                products on the blockchain.{" "}
            </div>
            <div className="w-[245.63px] mt-[45px]">
                <span className="text-neutral-700 text-base font-normal">
                    Please fill up the company details to get started.
                    <br />
                </span>
                <span className="text-blue-600 text-base font-normal">
                    Need Help{" "}
                </span>
                <span className="text-neutral-700 text-base font-normal">
                    ?
                </span>
            </div>
        </div>
    );
};

const RegistractionProgress: FC = () => {
    return (
        <div className="mt-[90px] mx-[58px]">
            <Progress />
            <Details />
        </div>
    );
};

export default RegistractionProgress;
