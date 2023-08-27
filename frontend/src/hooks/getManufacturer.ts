import { readContract } from "@wagmi/core";

import config from "./config";
import { Manufacturer } from "../types";

interface getManufacturerReturnType {
    isSuccess: boolean;
    isError: boolean;
    error: Error | undefined;
    manufacturer: Manufacturer | undefined;
}

type GetManufacturer = (
    id: `0x${string}`
) => Promise<getManufacturerReturnType>;

const getManufacturer: GetManufacturer = async (id: `0x${string}`) => {
    const retData: getManufacturerReturnType = {
        isSuccess: false,
        isError: true,
        error: undefined,
        manufacturer: undefined,
    };

    try {
        const manufacturer = await readContract({
            address: `0x${config.authentiscanContract.address}`,
            abi: config.authentiscanContract.abi,
            functionName: "getManufacturer",
            args: [id],
        });
        retData.isSuccess = true;
        retData.isError = false;
        retData.manufacturer = manufacturer;

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

export default getManufacturer;
