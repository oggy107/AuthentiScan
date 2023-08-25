interface VMExeption {
    Exception: string;
    ExceptionMessage: string;
}

interface WalletError {
    Error: string;
    ErrorMessage: string;
}

interface RegistrationErrorsI {
    ManufacturerAlreadyRegistered: VMExeption;
    ManufacturerNotRegistered: VMExeption;
}

export const RegistrationVMExceptions: RegistrationErrorsI = {
    ManufacturerAlreadyRegistered: {
        Exception:
            "VM Exception while processing transaction: revert Manufacturer already registerd",
        ExceptionMessage: "Manufacturer already registerd",
    },
    ManufacturerNotRegistered: {
        Exception:
            "VM Exception while processing transaction: revert Manufacturer is not registered. Please register manufacturer first",
        ExceptionMessage: "Manufacturer not registered",
    },
};

interface WalletErrorsI {
    WalletUserRejected: WalletError;
}

export const WalletErrors: WalletErrorsI = {
    WalletUserRejected: {
        Error: "MetaMask Tx Signature: User denied transaction signature",
        ErrorMessage: "User denied transaction",
    },
};
