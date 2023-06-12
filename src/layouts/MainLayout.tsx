import clsx from "clsx";
import { PropsWithChildren, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }: PropsWithChildren) => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <div
        className={clsx({
          "grid bg-zinc-100 min-h-screen": true,
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
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
