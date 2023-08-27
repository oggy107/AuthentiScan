import { Web3Button, useWeb3ModalTheme } from "@web3modal/react";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

import { useHeader } from "../context/HeaderContext";
import logoFull from "../assets/logoFull-light.svg";
import { Route } from "../types";
import { useUser } from "../context/UserContext";
import { DefaultNavLinks } from "../config";

const Header: FC = (): JSX.Element => {
    const { setTheme } = useWeb3ModalTheme();
    const navigate = useNavigate();

    const { navLinks, setNavLinks } = useHeader();

    const { manufacturer, profile } = useUser();

    useEffect(() => {
        if (manufacturer) {
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
        } else {
            setNavLinks(DefaultNavLinks);
        }
    }, [manufacturer]);

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
        <div className="w-full h-[70px] bg-gradient-to-r from-[#001589] to-[#F32786] flex justify-between items-center px-[60px] py-[15px] fixed z-10">
            <div>
                <Link to={Route.HOME}>
                    <img src={logoFull} alt="logo" />
                </Link>
            </div>
            <ul className="flex items-center gap-[30px]">
                {navLinks.map((navLink, index) => (
                    <li
                        className="text-white text-sm font-normal capitalize"
                        key={index}
                    >
                        {navLink.hashRouter ? (
                            <NavHashLink to={navLink.route} smooth>
                                {navLink.name}
                            </NavHashLink>
                        ) : (
                            <Link to={navLink.route}>{navLink.name}</Link>
                        )}
                    </li>
                ))}
                {profile && (
                    <div
                        className="h-8 flex justify-between items-center gap-1 cursor-pointer"
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
