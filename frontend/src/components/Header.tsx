import { Web3Button, useWeb3ModalTheme } from "@web3modal/react";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";

import { useHeader } from "../context/HeaderContext";
import logoFull from "../assets/logoFull.png";

const Header: FC = (): JSX.Element => {
    const { setTheme } = useWeb3ModalTheme();

    const { navLinks } = useHeader();

    useEffect(() => {
        setTheme({
            themeMode: "light",
            themeVariables: {
                "--w3m-background-border-radius": "20px",
                "--w3m-container-border-radius": "20px",
            },
        });
    }, []);

    return (
        <div className="w-full h-[70px] bg-gradient-to-r from-[#001589] to-[#F32786] flex justify-between items-center px-[60px] py-[15px]">
            <div>
                <img src={logoFull} alt="logo" />
            </div>
            <ul className="flex items-center gap-[30px]">
                {navLinks.map((navLink, index) => (
                    <li
                        className="text-white text-sm font-normal capitalize"
                        key={index}
                    >
                        <Link to={navLink.route}>{navLink.name}</Link>
                    </li>
                ))}
                {/* <li className="text-white text-sm font-normal capitalize">
                    <Link to={Route.HOME}>Home</Link>
                </li>
                <li className="text-white text-sm font-normal capitalize">
                    <Link to={Route.ABOUT}>About Us</Link>
                </li>
                <li className="text-white text-sm font-normal capitalize">
                    <Link to={Route.HOW_IT_WORKS}>How it works</Link>
                </li>
                <li className="text-white text-sm font-normal capitalize">
                    <Link to={Route.REGISTER}>Register</Link>
                </li> */}
                <Web3Button />
            </ul>
        </div>
    );
};

export default Header;
