import {
    createContext,
    FC,
    PropsWithChildren,
    useState,
    useContext,
} from "react";

import { NavLink } from "../types";
import { DefaultNavLinks } from "../config";

interface Profile {
    name: string;
    logo: string;
}

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
