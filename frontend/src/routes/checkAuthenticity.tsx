import { FC } from "react";
import txtlogo from "../assets/logoFull-dark.svg";
import CheckAuthenicityForm from "../components/CheckAuthenicityForm";

const Info: FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div>
                <div>
                    <span>
                        <img src={txtlogo} alt="Authentiscan" />
                    </span>
                </div>
                <div className="mt-[74.19px] w-[345px]">
                    <div className="text-gray-500 text-base font-normal ">
                        AuthentiScan Let you easily verify your products using
                        blockchain technology.
                    </div>
                    <br />
                    <span className=" text-gray-700 text-base font-normal">
                        It’s easy as 1 2 3:
                    </span>{" "}
                    <br />
                    <div className="text-gray-500 text-base font-normal ">
                        Select manufacturer <br />
                        Enter Product unique id <br /> Hit check button <br />{" "}
                        <br />
                        and we will search the whole universe for your product
                        authenticity.
                    </div>
                </div>
            </div>
        </div>
    );
};

const CheckAuthenticity: FC = (): JSX.Element => {
    return (
        <div className="flex flex-grow mt-[70px] mb-[155px]">
            <div className="w-full h-full grid grid-cols-2 ">
                <Info />
                <CheckAuthenicityForm />
            </div>
        </div>
    );
};

export default CheckAuthenticity;
