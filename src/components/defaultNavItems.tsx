import React from "react";
import { CalendarIcon, FolderIcon, HomeIcon, UsersIcon } from "lucide-react";
// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
export const defaultNavItems: NavItem[] = [
  {
    label: "Accueil",
    href: "/",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Mes Contrôles",
    href: "/controles",
    icon: <UsersIcon className="w-6 h-6" />,
  },
  {
    label: "Mes Documents",
    href: "/documents",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    label: "Mes Ressources RH",
    href: "/rh",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
];
