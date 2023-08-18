import { Web3Button, useWeb3ModalTheme } from "@web3modal/react";
import { FC, useEffect } from "react";

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
        <div className="w-full h-[5rem] bg-gradient-to-r from-blue-700 from-40% to-red-400 flex justify-between items-center p-3">
            <div className="text-2xl font-bold text-white">AuthentiScan</div>
            <Web3Button />
        </div>
    );
};

export default Header;
