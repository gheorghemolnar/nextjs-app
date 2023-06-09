"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart2Icon,
  BookOpen,
  BookOpenCheckIcon,
  ConciergeBellIcon,
  FileDigitIcon,
  FileTextIcon,
  FilesIcon,
  GridIcon,
  LayersIcon,
  LayoutGrid,
  NfcIcon,
  PlayCircle,
  Radio,
  ShieldIcon,
  SmartphoneNfcIcon,
  SparkleIcon,
  UsersIcon
} from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface MenuItem {
  title: string;
  href: string;
  description: string;
  badge?: {
    text: string;
    count: number;
  };
  icon?: ReactNode;
}

const mesControles: MenuItem[] = [
  {
    title: "Matière",
    href: "/controles/matiere",
    description: "Matière",
    badge: {
      text: "",
      count: 43
    },
    icon: <LayersIcon className="mr-2 h-4 w-4" />
  },
  {
    title: "Nettoyage",
    href: "/controles/nettoyage",
    description: "Nettoyage",
    badge: {
      text: "",
      count: 15
    },
    icon: <SparkleIcon className="mr-2 h-4 w-4" />
  },
  {
    title: "Réception",
    href: "/controles/reception",
    description: "Réception",
    icon: <ConciergeBellIcon className="mr-2 h-4 w-4" />
  },
  {
    title: "Sécurité",
    href: "/controles/securite",
    description: "Sécurité",
    icon: <ShieldIcon className="mr-2 h-4 w-4" />
  }
];

const mesCommunications: MenuItem[] = [
  {
    title: "Communication PST Groupe",
    href: "/communication/pst-groupe",
    description: "Communication PST Groupe",
    badge: {
      text: "",
      count: 3
    },
    icon: <NfcIcon className="mr-2 h-4 w-4" />
  },
  {
    title: "Communication PST Site",
    href: "/communication/pst-site",
    description: "Communication PST Site",
    badge: {
      text: "",
      count: 8
    },
    icon: <SmartphoneNfcIcon className="mr-2 h-4 w-4" />
  },
  {
    title: "Communication Atelier",
    href: "/communication/atelier",
    description: "Communication Atelier",
    icon: <NfcIcon className="mr-2 h-4 w-4" />
  }
];

const mesRessourcesHumaine: MenuItem[] = [
  {
    title: "Accueil",
    href: "/rh/accueil",
    description: "RH Accueil",
    badge: {
      text: "",
      count: 7
    },
    icon: <UsersIcon className="mr-2 h-4 w-4" />
  },
  /*   {
    title: "Ré-accueil",
    href: "/rh/re-accueil",
    description: "Ré-accueil",
    badge: {
      text: "",
      count: 17
    },
    icon: <UsersIcon />
  }, */
  {
    title: "Fiche de poste",
    href: "/rh/fiche-poste",
    description: "Fiche de poste",
    icon: <FileTextIcon className="mr-2 h-4 w-4" />
  },
  {
    title: "Consultation module / CP",
    href: "/rh/consultation-modulation-cp",
    description: "Consultation module / CP",
    icon: <BookOpen className="mr-2 h-4 w-4" />
  },
  {
    title: "Indicateurs RH",
    href: "/rh/indicateurs-rh",
    description: "Indicateurs RH",
    icon: <BarChart2Icon className="mr-2 h-4 w-4" />
  }
];

const mesDocuments: MenuItem[] = [
  {
    title: "Cahiers des charges",
    href: "/mes-docs/cahiers-de-charges",
    description: "Cahiers des charges",
    badge: {
      text: "",
      count: 7
    },
    icon: <BookOpen className="mr-2 h-4 w-4" />
  },
  {
    title: "Fiches techniques",
    href: "/mes-docs/fiches-techniques",
    description: "Fiches techniques",
    badge: {
      text: "New",
      count: 25
    },
    icon: <FileDigitIcon className="mr-2 h-4 w-4" />
  },
  {
    title: "Planning Visites / Audits",
    href: "/mes-docs/planning-visites-audits",
    description: "Planning Visites / Audits",
    icon: <BookOpenCheckIcon className="mr-2 h-4 w-4" />
  }
];

const administration: MenuItem[] = [
  {
    title: "Secteurs",
    href: "/admin/params/secteurs",
    description: "Secteurs",
    badge: {
      text: "",
      count: 7
    },
    icon: <LayoutGrid className="mr-2 h-4 w-4" />
  },
  {
    title: "Ateliers",
    href: "/admin/params/ateliers",
    description: "Ateliers",
    icon: <LayoutGrid className="mr-2 h-4 w-4" />
  },
  {
    title: "Utilisateurs",
    href: "/admin/params/utilisateurs",
    description: "Utilisateurs",
    icon: <LayoutGrid className="mr-2 h-4 w-4" />
  },
  {
    title: "Profils",
    href: "/admin/params/profils",
    description: "Profils",
    icon: <LayoutGrid className="mr-2 h-4 w-4" />
  },
  {
    title: "Param Sites",
    href: "/admin/params/paramssite",
    description: "Param Sites",
    icon: <LayoutGrid className="mr-2 h-4 w-4" />
  },
  {
    title: "Grilles groupe",
    href: "/admin/params/grillesgroupe",
    description: "Grilles groupe",
    icon: <LayoutGrid className="mr-2 h-4 w-4" />
  }
];

export default function SideBar() {
  return (
    <div className="pl-4 __bg-red-100 min-h-full max-w-full text-sm md:text-md">
      <div>
        <Link href="/">
          <Image src="/logo5.png" alt="logo bigard" width={100} height={40} />
        </Link>
        <br />
      </div>
      <div className="menu">
        <div className="menuEntry">
          <h3 className="font-extrabold">Mes Contrôles</h3>
          <ul className="grid w-full gap-3 p-4">
            {mesControles.map((component) => {
              return (
                <li
                  key={component.title}
                  title={component.title}
                  className="font-medium"
                  //href={component.href}
                >
                  <Link href={component.href} className="flex hover:bg-accent">
                    {component?.icon ? component.icon : ""}
                    {component.description}
                    {component?.badge && (
                      <Badge className="ml-1 text-xs color-white-900">
                        {component.badge.count} {component.badge.text}
                      </Badge>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="menuEntry">
          <h3 className="font-extrabold">Mes Ressources Humaines</h3>
          <ul className="grid w-full gap-3 p-4">
            {mesRessourcesHumaine.map((component) => (
              <li
                key={component.title}
                title={component.title}
                className="font-medium"
                //href={component.href}
              >
                <Link href={component.href} className="flex">
                  {component?.icon ? component.icon : ""}
                  {component.description}{" "}
                  {component?.badge && (
                    <Badge variant="secondary" className="text-color">
                      {component.badge.count} {component.badge.text}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="menuEntry">
          <h3 className="font-extrabold">Mes Communications</h3>
          <ul className="grid w-full gap-3 p-4">
            {mesCommunications.map((component) => (
              <li
                key={component.title}
                title={component.title}
                className="font-medium"
                //href={component.href}
              >
                <Link href={component.href} className="flex">
                  {component?.icon ? component.icon : ""}
                  {component.description}{" "}
                  {component?.badge && (
                    <Badge variant="secondary" className="text-color">
                      {component.badge.count} {component.badge.text}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="menuEntry">
          <h3 className="font-extrabold">Mes Documents</h3>
          <ul className="grid w-full gap-3 p-4">
            {mesDocuments.map((component) => (
              <li
                key={component.title}
                title={component.title}
                className="font-medium"
                //href={component.href}
              >
                <Link href={component.href} className="flex">
                  {component?.icon ? component.icon : ""}
                  {component.description}{" "}
                  {component?.badge && (
                    <Badge variant="secondary" className="text-color">
                      {component.badge.count} {component.badge.text}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="menuEntry">
          <h3 className="font-extrabold">Paramétrage</h3>

          <ul className="grid w-full gap-3 p-4">
            {administration.slice(0, 4).map((component) => (
              <li
                key={component.title}
                title={component.title}
                className="font-medium"
                //href={component.href}
              >
                {/*                 <Button
                  onClick={() => navigate(component.href)}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  {component?.icon ? component.icon : ""}
                  {component.description}{" "}
                  {component?.badge && (
                    <>
                      {"  "}
                      <Badge variant="secondary" className="text-color">
                        {component.badge.count} {component.badge.text}
                      </Badge>
                    </>
                  )}
                </Button> */}

                <Link href={component.href} className="flex">
                  {component?.icon ? component.icon : ""}
                  {component.description}{" "}
                  {component?.badge && (
                    <Badge variant="secondary" className="text-color">
                      {component.badge.count} {component.badge.text}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
