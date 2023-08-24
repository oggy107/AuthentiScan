import { FC, useEffect } from "react";

// import useRegisterManufacturer from "../hooks/useRegisterManufacturer";
import RegistrationProgress from "../components/RegistrationProgress";
import RegistrationForm from "../components/RegistrationForm";
import RegistrationWelcome from "../components/RegistrationWelcome";
import { StageContextProvider, useStage } from "../context/StageContext";

const RegisterStageContextWrapper: FC = () => {
    const stageContext = useStage();
    const { stage, setStage } = stageContext!;

    useEffect(() => {
        setStage("welcome");
    });

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
