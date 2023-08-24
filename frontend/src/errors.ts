interface VMExeption {
    Exception: string;
    ExceptionMessage: string;
}

interface RegistrationErrorsI {
    ManufacturerAlreadyRegistered: VMExeption;
}

export const RegistrationVMExceptions: RegistrationErrorsI = {
    ManufacturerAlreadyRegistered: {
        Exception:
            "VM Exception while processing transaction: revert Manufacturer already registerd",
        ExceptionMessage: "Manufacturer already registerd",
    },
};
