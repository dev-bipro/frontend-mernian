import { Outlet } from "react-router-dom";
import Flex from "./Flex";
import SideBar from "./sideBar/SideBar";
import NavBar from "./navBar/NavBar";

function RootLayout() {
  return (
    <>
      {/* <NavBar /> */}
      <Flex className="flex gap-5">
        <div className="w-1/5 text-white">
          <SideBar />
        </div>
        <div>
          <Outlet />
        </div>
      </Flex>
    </>
  );
}

export default RootLayout;
