import { Web3Button, useWeb3ModalTheme } from "@web3modal/react";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useHeader } from "../context/HeaderContext";
import logoFull from "../assets/logoFull.png";
import { Route } from "../types";

const Header: FC = (): JSX.Element => {
    const { setTheme } = useWeb3ModalTheme();
    const navigate = useNavigate();

    const { navLinks, profile } = useHeader();

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
                {profile && (
                    <div
                        className="h-8 flex justify-between items-center gap-1"
                        onClick={() => {
                            navigate(Route.PROFILE);
                        }}
                    >
                        <div className="w-[30px] h-[30px] flex items-center">
                            <img src={profile.logo} alt={profile.name} />
                        </div>
                        <div className="text-white">{profile.name}</div>
                    </div>
                )}
                <Web3Button />
            </ul>
        </div>
    );
};

export default Header;
