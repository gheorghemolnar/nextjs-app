import clsx from "clsx";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSearchParams} from 'react-router-dom'
import { AccordionDemo } from "@backoffice/components/menu";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

// add NavItem prop to component prop
type Props = {
  collapsed: boolean;
  navItems?: NavItem[];
  setCollapsed(collapsed: boolean): void;
  shown: boolean;
};

const Sidebar = ({
  collapsed,
  //  navItems = defaultNavItems,
  shown,
  setCollapsed,
}: Props) => {
  const Icon = collapsed ? ChevronRightIcon : ChevronLeftIcon;

  const [URLSearchParams] = useSearchParams()

  let x = "bg-brand1sidebar"
  if (URLSearchParams.has("v") && URLSearchParams.get("v") === "1") {
    x = "bg-brand2sidebar"
  }

  
  return (
    <div
      className={clsx({
        //"bg-red-700 text-zinc-50 fixed md:static md:translate-x-0 z-20": false,
        // "bg-[#D0E3D5]": true,
        //"bg-[#89B5B8]": true,
        [x]: true,
        "fixed md:static md:translate-x-0 z-20": true,
        "transition-all duration-300 ease-in-out": true,
        "w-[300px]": !collapsed,
        "w-16": collapsed,
        "-translate-x-full": !shown,
      })}
    >
      <div
        className={clsx({
          "flex flex-col justify-between h-screen sticky inset-0 w-full": true,
        })}
      >
        {/* logo and collapse button */}
        <div
          className={clsx({
            //"flex items-center border-b border-b-indigo-800 transition-none":
            "flex items-center transition-none": true,
            "p-4 justify-between": !collapsed,
            "py-4 justify-center": collapsed,
          })}
        >
          {!collapsed && (
            <img
              src="/assets/logo5.png"
              className="whitespace-nowrap w-[5em] h-auto"
            />
          )}
          <button
            className="grid place-content-center hover:bg-indigo-800 rounded-full opacity-0 md:opacity-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-grow mx-2 mt-6">
          {<AccordionDemo collapsed={collapsed} />}
          <div>
            {/*
          <ul
            className={clsx({
              "my-2 flex flex-col gap-2 items-stretch": true,
            })}
          >  
          {navItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className={clsx({
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
          */}
          </div>
        </nav>
        <div
          className={clsx({
            "grid place-content-stretch p-4 ": true,
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
            /> */}
            {!collapsed && (
              <div className="flex flex-col ">
                <span className=" my-0">Utilisateur</span>
                {/*
                <Link to="/" className="text-indigo-200 text-sm">
                  View Profile
                </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
