import { Web3Button, useWeb3ModalTheme } from "@web3modal/react";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";

import { Route } from "../types";
import logoFull from "../assets/logoFull.png";

const Header: FC = (): JSX.Element => {
    const { theme, setTheme } = useWeb3ModalTheme();

    useEffect(() => {
        setTheme({
            themeMode: "light",
            themeVariables: {
                "--w3m-background-border-radius": "20px",
                "--w3m-container-border-radius": "20px",
            },
        });
    }, [theme, setTheme]);

    return (
        <div className="w-full h-[70px] bg-gradient-to-r from-[#001589] to-[#F32786] flex justify-between items-center px-[60px] py-[15px]">
            {/* <div className="text-2xl font-bold text-white">AuthentiScan</div> */}
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
                <li className="text-white text-sm font-normal capitalize">
                    <Link to={Route.register}>Register</Link>
                </li>
                <Web3Button />
            </ul>
        </div>
    );
};

export default Header;
