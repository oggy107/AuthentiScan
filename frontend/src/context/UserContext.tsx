import {
    createContext,
    FC,
    PropsWithChildren,
    useState,
    useContext,
    useEffect,
} from "react";
import { useAccount } from "wagmi";

import getManufacturer from "../hooks/getManufacturer";
import { Manufacturer } from "../types";

interface Profile {
    name: string;
    logo: string;
}

interface UserContextI {
    manufacturer: Manufacturer | undefined;
    setManufacturer: (manufacturer: Manufacturer) => void;
    forceUpdate: () => void;
    profile: Profile | null;
    setProfile: (profile: Profile | null) => void;
}

const UserContextDefault: UserContextI = {
    manufacturer: undefined,
    setManufacturer: () => {},
    forceUpdate: () => {},
    profile: null,
    setProfile: () => {},
};

const UserContext = createContext<UserContextI>(UserContextDefault);

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [manufacturer, setManufacturer] = useState<Manufacturer | undefined>(
        undefined
    );

    const [update, setUpdate] = useState(0);
    const forceUpdate = () => {
        setUpdate((prev) => prev + 1);
    };

    const [profile, setProfile] = useState<Profile | null>(null);

    const { address } = useAccount();

    useEffect(() => {
        if (address) {
            getManufacturer(address).then(({ manufacturer, isError }) => {
                if (!isError) {
                    setManufacturer(manufacturer);
                    if (manufacturer) {
                        setProfile({
                            logo: manufacturer.logo,
                            name: manufacturer.name,
                        });
                    } else {
                        setProfile(null);
                    }
                } else {
                    setManufacturer(undefined);
                    setProfile(null);
                }
            });
        }
    }, [address, update]);

    return (
        <UserContext.Provider
            value={{
                manufacturer,
                setManufacturer,
                forceUpdate,
                profile,
                setProfile,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    return useContext(UserContext);
};

export { useUser, UserContextProvider };
