import { FC } from "react";
import { Link } from "react-router-dom";

import { Route } from "../types";

const Footer: FC = (): JSX.Element => {
    return (
        <div className="w-full h-[185px] bg-gradient-to-r from-[#001589] to-[#F30775] flex justify-center items-center">
            <div className="w-full flex flex-col pl-[115px] pr-[116.47px] pt-16 justify-end items-center gap-[41.90px]">
                <div className="w-full flex justify-between">
                    <div className="text-2xl font-bold text-white">
                        AuthentiScan
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
                        <li>fb</li>
                        <li>in</li>
                        <li>gh</li>
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
