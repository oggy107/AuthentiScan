import { useContractWrite } from "wagmi";

import config from "./config";

const useRegisterProducts = () => {
    const { write, isError, error, isLoading, isSuccess } = useContractWrite({
        address: `0x${config.authentiscanContract.address}`,
        abi: config.authentiscanContract.abi,
        functionName: "registerProducts",
    });

    /**
     * Register Product
     * @param id unique product id
     * @param name name of the product
     * @param description product description
     * @param MFDDate manufactur date
     * @param EXPDate expiration date. pass empty string if no expiry
     */
    const registerProduct = (
        id: string,
        name: string,
        description: string,
        MFDDate: string,
        EXPDate: string
    ) => {
        write({
            args: [
                [
                    {
                        id,
                        name,
                        description,
                        MFDDate,
                        EXPDate,
                    },
                ],
            ],
        });
    };

    return {
        registerProduct,
        isError,
        error,
        isLoading,
        isSuccess,
        isEnabled: Boolean(write),
    };
};

export default useRegisterProducts;
