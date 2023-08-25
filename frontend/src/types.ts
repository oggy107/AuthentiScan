export enum Route {
    HOME = "/",
    REGISTER = "/register",
    ABOUT = "/about",
    HOW_IT_WORKS = "/how-it-works",
    PROFILE = "/profile",
    ADD_PRODUCTS = "/add-products",
    VIEW_PRODUCTS = "/view-products",
    CHECK_AUTHENTICITY = "/check-authenticity",
}

export interface ProgressProps {
    stage: "details" | "welcome";
}

export interface NavLink {
    name: string;
    route: Route;
}

export interface Manufacturer {
    id: `0x${string}`;
    isVerified: boolean;
    name: string;
    registrationNo: string;
    logo: string;
    companyAddress: string;
    email: string;
    registrarName: string;
    registrarId: string;
    taxId: string;
    regTime: bigint;
}
