import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { cn } from '@big/ui';

import Breadcrumbs from '@backoffice/components/breadcrumb';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
    const [collapsed, setSidebarCollapsed] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const bgColor = 'bg-brandmain';

    return (
        <div
            className={cn(
                {
                    [bgColor]                      : true,
                    'grid text-black min-h-screen' : true,
                    'grid-cols-sidebar'            : !collapsed,
                    'grid-cols-sidebar-collapsed'  : collapsed,
                    'transition-[grid-template-columns] duration-300 ease-in-out':
                        true
                },
                'h-full'
            )}
        >
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setSidebarCollapsed}
                shown={showSidebar}
            />
            <div className="">
                <Navbar
                    onMenuButtonClick={() =>
                        setShowSidebar((previous) => !previous)
                    }
                />
                {/*                 <div __className="grid grid-cols-1">
                </div> */}
                <Breadcrumbs />
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
