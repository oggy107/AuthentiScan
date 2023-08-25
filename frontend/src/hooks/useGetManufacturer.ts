import { useContractRead } from "wagmi";

import config from "./config";

const useGetManufacturer = (id: `0x${string}`) => {
    const { data, isError, error, isLoading, isSuccess } = useContractRead({
        address: `0x${config.authentiscanContract.address}`,
        abi: config.authentiscanContract.abi,
        functionName: "getManufacturer",
        args: [id],
    });

    return {
        manufacturer: data,
        isError,
        error,
        isLoading,
        isSuccess,
    };
};

export default useGetManufacturer;
