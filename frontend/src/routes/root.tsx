import { FC } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { HeaderContextProvider } from "../context/HeaderContext";

const Root: FC = (): JSX.Element => {
    return (
        <div className="w-full h-screen min-h-[700px] flex flex-col font-poppins min-w-[1600px]">
            <HeaderContextProvider>
                <Header />
                <Outlet />
                <Footer />
            </HeaderContextProvider>
        </div>
    );
};

export default Root;
