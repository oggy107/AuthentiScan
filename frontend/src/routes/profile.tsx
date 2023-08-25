import { FC, useEffect } from "react";

import { useHeader } from "../context/HeaderContext";
import { Route } from "../types";

const Profile: FC = () => {
    const { setNavLinks } = useHeader();

    useEffect(() => {
        setNavLinks([
            {
                name: "Home",
                route: Route.HOME,
            },
            {
                name: "Profile",
                route: Route.PROFILE,
            },
            {
                name: "Add Products",
                route: Route.ADD_PRODUCTS,
            },
            {
                name: "View Products",
                route: Route.VIEW_PRODUCTS,
            },
        ]);
    }, []);

    return (
        <div className="flex flex-grow">
            <div className="w-full h-ful">profile</div>
        </div>
    );
};

export default Profile;
