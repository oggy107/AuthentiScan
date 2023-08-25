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
