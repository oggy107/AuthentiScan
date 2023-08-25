import { useContractWrite } from "wagmi";

import config from "./config";

const useAddTrustedEntity = () => {
    const { write, isError, error, isLoading, isSuccess } = useContractWrite({
        address: `0x${config.verifyContract.address}`,
        abi: config.verifyContract.abi,
        functionName: "addTrustedEntity",
    });

    /**
     * Add trusted entity
     * @param id address of trusted entity to add
     */
    const addTrustedEntity = (id: `0x${string}`) => {
        write({
            args: [id],
        });
    };

    return {
        addTrustedEntity,
        isError,
        error,
        isLoading,
        isSuccess,
        isEnabled: Boolean(write),
    };
};

export default useAddTrustedEntity;
