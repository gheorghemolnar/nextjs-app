import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { cn } from '@big/ui';

import { AccordionDemo } from '@backoffice/components/menu';

import { DebugSizeIndicator } from './debug-size';

type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

// add NavItem prop to component prop
type Properties = {
    collapsed: boolean;
    navItems?: NavItem[];
    setCollapsed(collapsed: boolean): void;
    shown: boolean;
};

const Sidebar = ({
    collapsed,
    //  navItems = defaultNavItems,
    shown,
    setCollapsed
}: Properties) => {
    const Icon = collapsed ? ChevronsRightIcon : ChevronsLeftIcon;

    const [URLSearchParameters] = useSearchParams();

    let bgColor = 'bg-brand1sidebar';
    if (URLSearchParameters.has('v') && URLSearchParameters.get('v') === '1') {
        bgColor = 'bg-brand2sidebar';
    }
    const navigation = useNavigate();

    return (
        <div
            className={cn({
                //"bg-red-700 text-zinc-50 fixed md:static md:translate-x-0 z-20": false,
                // "bg-[#D0E3D5]": true,
                //"bg-[#89B5B8]": true,
                [bgColor]                                 : true,
                'fixed md:static md:translate-x-0 z-20'   : true,
                'transition-all duration-300 ease-in-out' : true,
                'w-[300px]'                               : !collapsed,
                'w-16'                                    : collapsed,
                '-translate-x-full'                       : !shown
            })}
        >
            <div
                className={cn({
                    'flex flex-col justify-between h-screen sticky inset-0 w-full':
                        true
                })}
            >
                {/* logo and collapse button */}
                <div
                    className={cn({
                        //"flex items-center border-b border-b-indigo-800 transition-none":
                        'flex items-center transition-none' : true,
                        'p-4 justify-between'               : !collapsed,
                        'py-4 justify-center'               : collapsed
                    })}
                >
                    {!collapsed && (
                        <div className="flex w-full justify-center">
                            <img
                                src="/assets/logo.png"
                                className="whitespace-nowrap w-[5em] h-auto"
                                onClick={() => navigation('/')}
                            />
                        </div>
                    )}
                    <button
                        className="grid place-content-center hover:bg-brand rounded-full opacity-0 md:opacity-100"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <Icon className="w-5 h-5" />
                    </button>
                </div>
                <nav className="flex-grow mx-2 mt-6">
                    {<AccordionDemo collapsed={collapsed} />}
                    {/*
                    <div>
                        <ul
                        className={cn({
                            "my-2 flex flex-col gap-2 items-stretch": true,
                        })}
                        >
                        {navItems.map((item, index) => {
                            return (
                            <li
                                key={index}
                                className={cn({
                                "text-indigo-100 hover:bg-indigo-900 flex": true, //colors
                                "transition-colors duration-300": true, //animation
                                "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                                "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                                })}
                            >
                                <Link to={item.href} className="flex gap-2">
                                {item.icon} <span>{!collapsed && item.label}</span>
                                </Link>
                            </li>
                            );
                        })}
                        </ul>
                    </div>
                    */}
                </nav>
                <div
                    className={cn({
                        'grid place-content-stretch p-4 ': true
                    })}
                >
                    <div className="flex gap-4 h-11 overflow-hidden">
                        {/*             
                        <Image
                            src={
                                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            }
                            height={36}
                            width={36}
                            alt="profile image"
                            className="rounded-full"
                        />
                        */}
                        {!collapsed && (
                            <div className="flex flex-col ">
                                <span className=" my-0">Utilisateur</span>
                                {/*
                                    <Link to="/" className="text-indigo-200 text-sm">
                                        View Profile
                                    </Link>
                                */}
                                <DebugSizeIndicator />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
