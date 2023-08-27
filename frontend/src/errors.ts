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
        Exception: "Manufacturer already registerd",
        ExceptionMessage: "Manufacturer already registerd",
    },
    ManufacturerNotRegistered: {
        Exception:
            "Manufacturer is not registered. Please register manufacturer first",
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
        Exception: "Can not register multiple products with same id",
        ExceptionMessage: "Product already registered",
    },
};

interface TrustedEntitiesErrorsI {
    NotOwner: VMExeption;
    AlreadyTrusted: VMExeption;
}

export const TrustedEntitiesErrors: TrustedEntitiesErrorsI = {
    NotOwner: {
        Exception: "Ownable: caller is not the owner",
        ExceptionMessage: "Only owner can perform this action",
    },
    AlreadyTrusted: {
        Exception: "This entity is already trusted",
        ExceptionMessage: "This entity is already trusted",
    },
};

interface AccessErrorsI {
    NotVerified: VMExeption;
    EntityNotTrusted: VMExeption;
}

export const AccessErrors: AccessErrorsI = {
    NotVerified: {
        Exception: "Only verified Manufacturers can call this method",
        ExceptionMessage: "You are not yet verified",
    },
    EntityNotTrusted: {
        Exception: "This enity is not trusted",
        ExceptionMessage: "You are not a trusted entity",
    },
};

interface ProductVerificationErrorsI {
    ProductNotRegistered: VMExeption;
}

export const ProductVerificationErrors: ProductVerificationErrorsI = {
    ProductNotRegistered: {
        Exception: "Product is not register with by this manufacturer",
        ExceptionMessage: "Product is not registered",
    },
};

interface VoteErrorsI {
    AlreadyVerified: VMExeption;
    AlreadyCastedVote: VMExeption;
}

export const VoteErrors: VoteErrorsI = {
    AlreadyVerified: {
        Exception:
            "This manufacturer is not in unverified pool. Hence you can not cast vote for it",
        ExceptionMessage:
            "This manufacturer is already verified. Try refreshing the page",
    },
    AlreadyCastedVote: {
        Exception: "This entity has already casted a vote",
        ExceptionMessage:
            "You have already casted a vote for this manufacturer",
    },
};
