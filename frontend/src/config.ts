import { NavLink, Route } from "./types";

export const DefaultNavLinks: Array<NavLink> = [
    {
        name: "Home",
        route: Route.HOME,
    },
    {
        name: "About Us",
        route: Route.ABOUT,
        hashRouter: true,
    },
    {
        name: "How It Works",
        route: Route.HOW_IT_WORKS,
        hashRouter: true,
    },
    {
        name: "Check Authenticity",
        route: Route.CHECK_AUTHENTICITY,
    },
    {
        name: "Register",
        route: Route.REGISTER,
    },
];
