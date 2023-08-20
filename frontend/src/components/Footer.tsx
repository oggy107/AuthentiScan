import { FC } from "react";
import { Link } from "react-router-dom";

import { Route } from "../types";
import logoFull from "../assets/logoFull.png";

import tw from "../assets/icons/1.svg";
import fb from "../assets/icons/2.svg";
import insta from "../assets/icons/3.svg";
import gh from "../assets/icons/4.svg";

const Footer: FC = (): JSX.Element => {
    return (
        <div className="w-full h-[155px] bg-gradient-to-r from-[#001589] to-[#F30775] flex justify-center items-center">
            <div className="w-full h-full flex flex-col pl-[115px] pr-[116.47px] pt-9 justify-center items-center gap-[30px]">
                <div className="w-full flex justify-between">
                    <div>
                        <img src={logoFull} alt="logo" />
                    </div>
                    <ul className="flex items-center gap-[30px]">
                        <li className="text-white text-sm font-normal capitalize">
                            <Link to={Route.home}>Home</Link>
                        </li>
                        <li className="text-white text-sm font-normal capitalize">
                            <Link to={Route.about}>About Us</Link>
                        </li>
                        <li className="text-white text-sm font-normal capitalize">
                            <Link to={Route.how_it_works}>How it works</Link>
                        </li>
                    </ul>
                    <ul className="flex items-center gap-[30px]">
                        <li>
                            <img
                                className="w-[30px] hover:scale-150 transition-all duration-300 ease-in-out cursor-pointer"
                                src={tw}
                                alt="twitter"
                            />
                        </li>
                        <li>
                            <img
                                className="w-[30px] hover:scale-150 transition-all duration-300 ease-in-out cursor-pointer"
                                src={fb}
                                alt="facebook"
                            />
                        </li>
                        <li>
                            <img
                                className="w-[30px] hover:scale-150 transition-all duration-300 ease-in-out cursor-pointer"
                                src={insta}
                                alt="insta"
                            />
                        </li>
                        <li>
                            <img
                                className="w-[30px] hover:scale-150 transition-all duration-300 ease-in-out cursor-pointer"
                                src={gh}
                                alt="github"
                            />
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col">
                    <div className="text-white text-sm leading-tight font-normal">
                        © Copyright 2022, All Rights Reserved by AuthentiScan
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
