import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import { cn } from '@big/ui';

import Breadcrumbs from '@backoffice/components/breadcrumb';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
    const [collapsed, setSidebarCollapsed] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [URLSearchParameters] = useSearchParams();

    let bagColor = 'bg-brand1main';
    if (URLSearchParameters.has('v') && URLSearchParameters.get('v') === '1') {
        bagColor = 'bg-brand2main';
    }

    return (
        <div
            className={cn(
                {
                    //"grid bg-zinc-100 text-black min-h-screen": true,
                    //"grid bg-[#D0E3D5] text-black min-h-screen": true,
                    //"grid bg-[#FBF9CB] text-black min-h-screen": true,
                    [bagColor]                     : true,
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
