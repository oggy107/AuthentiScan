import { FC } from "react";

// import useRegisterManufacturer from "../hooks/useRegisterManufacturer";
import RegistrationProgress from "../components/RegistrationProgress";
import RegistrationForm from "../components/RegistrationForm";

const Register: FC = (): JSX.Element => {
    // const { register, isEnabled, isLoading, isSuccess, isError, error } =
    //     useRegisterManufacturer();

    // hanlde manufacturer registration
    // const handleSubmit = () => {
    //     register("my new manufacturer");
    // };

    return (
        <div className="flex flex-grow">
            <div className="w-full h-full grid grid-cols-4">
                {/* UI goes here */}
                <div className="min-w-[360px] shadow-2xl">
                    <RegistrationProgress />
                </div>
                <div className="col-span-3">
                    <RegistrationForm />
                </div>
                {/* following is just for testing */}
                {/* <button
                    className="bg-red-600 p-3 mt-2 rounded-xl text-white font-bold absolute left-[50%] translate-x-[-50%]"
                    disabled={!isEnabled}
                    onClick={handleSubmit}
                >
                    test register button
                </button>
                {isLoading && <div>Check Wallet</div>}
                {isSuccess && <div>cool</div>}
                {isError && <div>{error?.name}</div>}
                {isError && <div>{error?.message}</div>} */}
            </div>
        </div>
    );
};

export default Register;
