import clsx from "clsx";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import {useSearchParams} from "react-router-dom"

const MainLayout = () => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [URLSearchParams] = useSearchParams()

  let x = "bg-brand1main"
  if (URLSearchParams.has("v") && URLSearchParams.get("v") === "1") {
    x = "bg-brand2main"
  }
  


  return (
    <div
      className={clsx({
        //"grid bg-zinc-100 text-black min-h-screen": true,
        //"grid bg-[#D0E3D5] text-black min-h-screen": true,
        //"grid bg-[#FBF9CB] text-black min-h-screen": true,
        [x]: true,
        "grid text-black min-h-screen": true,
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setSidebarCollapsed}
        shown={showSidebar}
      />
      <div className="">
        <Navbar onMenuButtonClick={() => setShowSidebar((prev) => !prev)} />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
