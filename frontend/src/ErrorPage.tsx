import { FC } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { HeaderContextProvider } from "./context/HeaderContext";
import { UserContextProvider } from "./context/UserContext";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";

const Error: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-grow">
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-[60%] h-[60%] rounded-[5px] border border-blue-900 relative">
                    <div className="w-[140px] h-[38px] text-center text-blue-900 text-3xl font-bold bg-white absolute top-[-19px] left-5">
                        ERROR
                    </div>
                    <div className="w-[300px] h-[220px] text-center text-pink-600 text-[150px] bg-white absolute left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        404
                    </div>
                    <div className="h-full flex flex-col justify-center items-center">
                        <div className="w-[354px] h-[43px] text-blue-900 text-3xl font-semibold">
                            Something Gone Wrong!
                        </div>
                        <div className="text-neutral-700 text-base font-norma">
                            The webpage you are trying to found does not exist
                        </div>
                        <Button
                            className="mt-20"
                            title="Go Back"
                            onclick={() => {
                                navigate(-1);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ErrorPage: FC = () => {
    return (
        <div className="w-full h-screen min-h-[700px] flex flex-col font-poppins min-w-[1600px]">
            <UserContextProvider>
                <HeaderContextProvider>
                    <Header />
                    <Error />
                    <Footer />
                </HeaderContextProvider>
            </UserContextProvider>
        </div>
    );
};

export default ErrorPage;
