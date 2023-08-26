import { useContractRead, useWalletClient } from "wagmi";

import config from "./config";

const useGetUnverifiedManufacturers = () => {
    const { data: walletClient } = useWalletClient();

    const { data, isError, error, isLoading, isSuccess } = useContractRead({
        address: `0x${config.verifyContract.address}`,
        abi: config.verifyContract.abi,
        functionName: "getUnverifiedManufacturers",
        account: walletClient?.account,
    });

    return {
        unverifiedManufacturers: data,
        isError,
        error,
        isLoading,
        isSuccess,
    };
};

export default useGetUnverifiedManufacturers;
