import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Route } from "../types";
import Button from "./Button";
import partyPopperR from "../assets/icons/partyPopper-r.svg";
import partyPopperL from "../assets/icons/partyPopper-l.svg";

const RegistrationWelcome: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex px-[100px] py-10">
            <div className="flex flex-grow justify-center items-center border-2 border-dashed border-blue-900 relative">
                <div className="flex flex-col items-center px-[74px] py-[35px] border-2 border-dashed border-pink-600">
                    <div className="text-center text-4xl font-bold">
                        Registered Successfully
                    </div>
                    <div className="my-[50px] text-zinc-700 text-lg font-normal">
                        You verification is under process. We will notify you
                        when it's done.
                    </div>
                    <Button
                        title="Go to Dashboard"
                        onclick={() => navigate(Route.HOME)}
                    />
                    <br />
                </div>
                <img
                    className="absolute left-0 bottom-0 w-[275px]"
                    src={partyPopperR}
                    alt="party popper"
                />
                <img
                    className="absolute bottom-0 right-0 w-[275px]"
                    src={partyPopperL}
                    alt="party popper"
                />
            </div>
        </div>
    );
};

export default RegistrationWelcome;
