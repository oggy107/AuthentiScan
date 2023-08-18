import { FC } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Root: FC = (): JSX.Element => {
    return (
        <div className="w-full h-screen min-h-[700px] flex flex-col font-poppins">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;
