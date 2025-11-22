import { Outlet } from "react-router-dom";
import DropdownMenu from "../Components/DropdownMenu/DropdownMenu";
import AiChat from "../Components/AiChat/AiChat";

function NavBarLayout() {
    return (
        <>
            <DropdownMenu />
            <Outlet />
            <AiChat />
        </>
    );
}

export default NavBarLayout;
