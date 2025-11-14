import { Outlet } from "react-router-dom";
import DropdownMenu from "../Components/DropdownMenu/DropdownMenu";

function NavBarLayout() {
    return (
        <>
            <Outlet />
            <DropdownMenu />;
        </>
    );
}

export default NavBarLayout;
