export enum Route {
    home = "/",
    register = "/register",
    about = "/about",
    how_it_works = "/how-it-works",
}

export interface ProgressProps {
    stage: "details" | "welcome";
}
