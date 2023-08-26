import { readContract } from "@wagmi/core";

import config from "./config";
import { Product } from "../types";

interface VerifiyProductReturnType {
    isSuccess: boolean;
    isError: boolean;
    error: Error | undefined;
    product: Product | undefined;
}

type VerifiyProduct = (
    manufacturerId: `0x${string}`,
    productId: string
) => Promise<VerifiyProductReturnType>;

const verifyProduct: VerifiyProduct = async (
    manufacturerId: `0x${string}`,
    productId: string
) => {
    const retData: VerifiyProductReturnType = {
        isSuccess: false,
        isError: true,
        error: undefined,
        product: undefined,
    };

    try {
        const product = await readContract({
            address: `0x${config.authentiscanContract.address}`,
            abi: config.authentiscanContract.abi,
            functionName: "verifyProduct",
            args: [manufacturerId, productId],
        });

        retData.isSuccess = true;
        retData.isError = false;
        retData.product = product;

        return retData;
    } catch (error) {
        console.error("[CUSTOM]: ", error);
        if (error instanceof Error) {
            retData.error = error;
        } else {
            retData.error = new Error("Unknown Error");
        }

        return retData;
    }
};

export default verifyProduct;
