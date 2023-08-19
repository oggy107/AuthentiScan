import { FC } from "react";

import useRegisterManufacturer from "../hooks/useRegisterManufacturer";

const Register: FC = (): JSX.Element => {
    const { register, isEnabled, isLoading, isSuccess, isError, error } =
        useRegisterManufacturer();

    // hanlde manufacturer registration
    const handleSubmit = () => {
        register("my new manufacturer");
    };

    return (
        <div className="flex flex-grow">
            <div className="w-full h-full p-3">
                {/* UI goes here */}
                {/* following is just for testing */}
                <button
                    className="bg-red-600 p-3 mt-2 rounded-xl text-white font-bold absolute left-[50%] translate-x-[-50%]"
                    disabled={!isEnabled}
                    onClick={handleSubmit}
                >
                    test register button
                </button>
                {isLoading && <div>Check Wallet</div>}
                {isSuccess && <div>cool</div>}
                {isError && <div>{error?.name}</div>}
                {isError && <div>{error?.message}</div>}
            </div>
        </div>
    );
};

export default Register;
