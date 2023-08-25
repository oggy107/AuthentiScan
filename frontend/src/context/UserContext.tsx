import {
    createContext,
    FC,
    PropsWithChildren,
    useState,
    useContext,
    useEffect,
} from "react";
import { useAccount } from "wagmi";

import useGetManufacturer from "../hooks/useGetManufacturer";
import { Manufacturer } from "../types";

interface Profile {
    name: string;
    logo: string;
}

interface UserContextI {
    manufacturer: Manufacturer | undefined;
    setManufacturer: (manufacturer: Manufacturer) => void;
    profile: Profile | null;
    setProfile: (profile: Profile | null) => void;
}

const UserContextDefault: UserContextI = {
    manufacturer: undefined,
    setManufacturer: () => {},
    profile: null,
    setProfile: () => {},
};

const UserContext = createContext<UserContextI>(UserContextDefault);

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [manufacturer, setManufacturer] = useState<Manufacturer | undefined>(
        undefined
    );
    const [profile, setProfile] = useState<Profile | null>(null);

    const { address } = useAccount();
    const data = useGetManufacturer(address ? address : "0x");

    useEffect(() => {
        if (data.isSuccess) {
            setManufacturer(data.manufacturer);

            if (data.manufacturer) {
                setProfile({
                    logo: data.manufacturer.logo,
                    name: data.manufacturer.name,
                });
            }
        } else {
            setManufacturer(undefined);
            setProfile(null);
        }
    }, [data.isSuccess]);

    return (
        <UserContext.Provider
            value={{ manufacturer, setManufacturer, profile, setProfile }}
        >
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    return useContext(UserContext);
};

export { useUser, UserContextProvider };
