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

interface ProductRegistrationErrorsI {
    ProductAlreadyRegistered: VMExeption;
}

export const ProductRegistrationErrors: ProductRegistrationErrorsI = {
    ProductAlreadyRegistered: {
        Exception:
            "VM Exception while processing transaction: revert Can not register multiple products with same id",
        ExceptionMessage: "Product already registered",
    },
};

interface TrustedEntitiesErrorsI {
    NotOwner: VMExeption;
    AlreadyTrusted: VMExeption;
}

export const TrustedEntitiesErrors: TrustedEntitiesErrorsI = {
    NotOwner: {
        Exception:
            "VM Exception while processing transaction: revert Ownable: caller is not the owner",
        ExceptionMessage: "Only owner can perform this action",
    },
    AlreadyTrusted: {
        Exception:
            "VM Exception while processing transaction: revert This entity is already trusted",
        ExceptionMessage: "This entity is already trusted",
    },
};

interface AccessErrorsI {
    NotVerified: VMExeption;
    EntityNotTrusted: VMExeption;
}

export const AccessErrors: AccessErrorsI = {
    NotVerified: {
        Exception:
            "VM Exception while processing transaction: revert Only verified Manufacturers can call this method",
        ExceptionMessage: "You are not yet verified",
    },
    EntityNotTrusted: {
        Exception:
            "VM Exception while processing transaction: revert This enity is not trusted",
        ExceptionMessage: "You are not a trusted entity",
    },
};
