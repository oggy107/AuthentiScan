import { useContractWrite } from "wagmi";

import config from "./config";

const useVote = () => {
    const { write, isError, error, isLoading, isSuccess } = useContractWrite({
        address: `0x${config.verifyContract.address}`,
        abi: config.verifyContract.abi,
        functionName: "vote",
    });

    /**
     * cast vote for manufacturer
     * @param id id of the manufacturer to verify
     */
    const castVote = (id: `0x${string}`) => {
        write({
            args: [id],
        });
    };

    return {
        castVote,
        isError,
        error,
        isLoading,
        isSuccess,
    };
};

export default useVote;
