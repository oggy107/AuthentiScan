import { useContractRead } from "wagmi";

import config from "./config";

const useGetVerifiedManufacturers = () => {
    const { data, isError, error, isLoading, isSuccess } = useContractRead({
        address: `0x${config.authentiscanContract.address}`,
        abi: config.authentiscanContract.abi,
        functionName: "getVerifiedManufacturers",
    });

    return {
        verifiedManufacturers: data,
        isError,
        error,
        isLoading,
        isSuccess,
    };
};

export default useGetVerifiedManufacturers;
