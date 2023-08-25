export enum Route {
    HOME = "/",
    REGISTER = "/register",
    ABOUT = "/about",
    HOW_IT_WORKS = "/how-it-works",
}

export interface ProgressProps {
    stage: "details" | "welcome";
}
