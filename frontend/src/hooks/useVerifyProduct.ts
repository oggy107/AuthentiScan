import { useContractRead } from "wagmi";

import config from "./config";

const useVerifyProduct = (manufacturerId: `0x${string}`, productId: string) => {
    const { data, isError, error, isLoading, isSuccess } = useContractRead({
        address: `0x${config.authentiscanContract.address}`,
        abi: config.authentiscanContract.abi,
        functionName: "verifyProduct",
        args: [manufacturerId, productId],
    });

    return {
        verifiedProduct: data,
        isError,
        error,
        isLoading,
        isSuccess,
    };
};

export default useVerifyProduct;
