import {
    createContext,
    FC,
    PropsWithChildren,
    useState,
    useContext,
} from "react";

import { NavLink } from "../types";
import { DefaultNavLinks } from "../config";

interface HeaderContextI {
    navLinks: Array<NavLink>;
    setNavLinks: (navLinks: Array<NavLink>) => void;
}

const HeaderContextDefault: HeaderContextI = {
    navLinks: DefaultNavLinks,
    setNavLinks: () => {},
};

const HeaderContext = createContext<HeaderContextI>(HeaderContextDefault);

const HeaderContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [navLinks, setNavLinks] = useState<Array<NavLink>>(DefaultNavLinks);

    return (
        <HeaderContext.Provider value={{ navLinks, setNavLinks }}>
            {children}
        </HeaderContext.Provider>
    );
};

const useHeader = () => {
    return useContext(HeaderContext);
};

export { useHeader, HeaderContextProvider };
