import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RegistrationProgress from "../components/RegistrationProgress";
import RegistrationForm from "../components/RegistrationForm";
import RegistrationWelcome from "../components/RegistrationWelcome";
import { StageContextProvider, useStage } from "../context/StageContext";
import { Route } from "../types";
import { useUser } from "../context/UserContext";

const RegisterStageContextWrapper: FC = () => {
    const stageContext = useStage();
    const { stage } = stageContext!;

    const navigate = useNavigate();

    const { manufacturer } = useUser();

    useEffect(() => {
        if (manufacturer) {
            navigate(Route.PROFILE);
        }
    }, [manufacturer]);

    return (
        <div className="flex flex-grow">
            <div className="w-full h-full grid grid-cols-4">
                <div className="min-w-[360px] shadow-2xl">
                    <RegistrationProgress />
                </div>
                <div className="col-span-3">
                    {stage == "details" ? (
                        <RegistrationForm />
                    ) : (
                        <RegistrationWelcome />
                    )}
                </div>
            </div>
        </div>
    );
};

const Register: FC = (): JSX.Element => {
    return (
        <StageContextProvider>
            <RegisterStageContextWrapper />
        </StageContextProvider>
    );
};

export default Register;
