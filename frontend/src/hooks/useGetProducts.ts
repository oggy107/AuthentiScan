import { useContractRead, useWalletClient } from "wagmi";

import config from "./config";

const useGetProducts = () => {
    const { data: walletClient } = useWalletClient();

    const { data, isError, error, isLoading, isSuccess } = useContractRead({
        address: `0x${config.authentiscanContract.address}`,
        abi: config.authentiscanContract.abi,
        functionName: "getProducts",
        account: walletClient?.account,
    });

    return {
        products: data,
        isError,
        error,
        isLoading,
        isSuccess,
    };
};

export default useGetProducts;
