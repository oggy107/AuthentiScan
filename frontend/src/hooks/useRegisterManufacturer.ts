import { useContractWrite } from "wagmi";

import config from "./config";

const useRegisterManufacturer = () => {
    const { write, isError, error, isLoading, isSuccess } = useContractWrite({
        address: `0x${config.authentiscanContract.address}`,
        abi: config.authentiscanContract.abi,
        functionName: "registerManufacturer",
    });

    /**
     * Register manufacuturer
     * @param name name of the manufacturer
     */
    const register = (name: string) => {
        write({ args: [name] });
    };

    return {
        register,
        write,
        isError,
        error,
        isLoading,
        isSuccess,
        isEnabled: Boolean(write),
    };
};

export default useRegisterManufacturer;
