import { writeContract, waitForTransaction } from "@wagmi/core";

import config from "./config";

interface RegisterManufacturerReturnType {
    isSuccess: boolean;
    isError: boolean;
    error: Error | undefined;
}

/**
 * Register manufacturer
 * @param name name of the manufacturer
 * @param registrationNo registration number
 * @param logo logo (url)
 * @param address company address
 * @param email official company email
 * @param registrarName registrar name
 * @param registrarId reistrar id
 * @param taxId tax id
 */
const registerManufacturer = async (
    name: string,
    registrationNo: string,
    logo: string,
    address: string,
    email: string,
    registrarName: string,
    registrarId: string,
    taxId: string
) => {
    const retData: RegisterManufacturerReturnType = {
        isSuccess: false,
        isError: true,
        error: undefined,
    };

    try {
        const { hash } = await writeContract({
            address: `0x${config.authentiscanContract.address}`,
            abi: config.authentiscanContract.abi,
            functionName: "registerManufacturer",
            args: [
                name,
                registrationNo,
                logo,
                address,
                email,
                registrarName,
                registrarId,
                taxId,
            ],
        });

        const data = await waitForTransaction({ hash });

        if (data.status == "success") {
            retData.isSuccess = true;
            retData.isError = false;
        } else {
            retData.error = new Error("Reverted");
        }

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

export default registerManufacturer;
