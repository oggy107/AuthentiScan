import {
    createContext,
    FC,
    PropsWithChildren,
    useState,
    useContext,
} from "react";

import { Route } from "../types";

interface NavLink {
    name: string;
    route: Route;
}

interface Profile {
    name: string;
    logo: string;
}

const DefaultNavLinks: Array<NavLink> = [
    {
        name: "Home",
        route: Route.HOME,
    },
    {
        name: "About Us",
        route: Route.ABOUT,
    },
    {
        name: "How It Works",
        route: Route.HOW_IT_WORKS,
    },
    {
        name: "Register",
        route: Route.REGISTER,
    },
];

interface HeaderContextI {
    navLinks: Array<NavLink>;
    setNavLinks: (navLinks: Array<NavLink>) => void;
    profile: Profile | null;
    setProfile: (profile: Profile | null) => void;
}

const HeaderContextDefault: HeaderContextI = {
    navLinks: DefaultNavLinks,
    setNavLinks: () => {},
    profile: null,
    setProfile: () => {},
};

const HeaderContext = createContext<HeaderContextI>(HeaderContextDefault);

const HeaderContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [navLinks, setNavLinks] = useState<Array<NavLink>>(DefaultNavLinks);
    const [profile, setProfile] = useState<Profile | null>(null);

    return (
        <HeaderContext.Provider
            value={{ navLinks, setNavLinks, profile, setProfile }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

const useHeader = () => {
    return useContext(HeaderContext);
};

export { useHeader, HeaderContextProvider };
