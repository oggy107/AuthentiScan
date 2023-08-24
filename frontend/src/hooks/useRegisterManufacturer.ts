import { useContractWrite } from "wagmi";

import config from "./config";

const useRegisterManufacturer = () => {
    const { write, isError, error, isLoading, isSuccess } = useContractWrite({
        address: `0x${config.authentiscanContract.address}`,
        abi: config.authentiscanContract.abi,
        functionName: "registerManufacturer",
    });

    /**
     * Register manufacturer
     * @param name name of the manufacturer
     * @param registrationNo registration number
     * @param logo logo (url)
     * @param address company address
     * @param email official company email
     * @param registrarName registrar name
     * @param registrarId reistrar id
     * @param taxId tax id
     */
    const register = (
        name: string,
        registrationNo: string,
        logo: string,
        address: string,
        email: string,
        registrarName: string,
        registrarId: string,
        taxId: string
    ) => {
        write({
            args: [
                name,
                registrationNo,
                logo,
                address,
                email,
                registrarName,
                registrarId,
                taxId,
            ],
        });
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
