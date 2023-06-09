"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { NavItem } from "@/types/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

interface MainNavProps {
  items?: NavItem[];
}
interface MenuItem {
  title: string;
  href: string;
  description: string;
}

const mesCommunications: MenuItem[] = [
  {
    title: "Communication PST Groupe",
    href: "/communication/pst-groupe",
    description: "Communication PST Groupe"
  },
  {
    title: "Communication PST Site",
    href: "/communication/pst-site",
    description: "Communication PST Site"
  },
  {
    title: "Communication Atelier",
    href: "/communication/atelier",
    description: "Communication Atelier"
  }
];
const mesRessourcesHumaine: MenuItem[] = [
  {
    title: "Accueil",
    href: "/rh/accueil",
    description: "RH Accueil"
  },
  {
    title: "Ré-accueil",
    href: "/rh/re-accueil",
    description: "Ré-accueil"
  },
  {
    title: "Fiche de poste",
    href: "/rh/fiche-poste",
    description: "Fiche de poste"
  },
  {
    title: "Consultation module / CP",
    href: "/rh/consulation-modulation-cp",
    description: "Consultation module / CP"
  },
  {
    title: "Indicateurs RH",
    href: "/rh/indicateurs-rh",
    description: "Indicateurs RH"
  }
];

const mesDocuments: MenuItem[] = [
  {
    title: "Cahiers des charges",
    href: "/mes-docs/cahiers-de-charges",
    description: "Cahiers des charges"
  },
  {
    title: "Fiches techniques",
    href: "/mes-docs/fiches-techniques",
    description: "Fiches techniques"
  },
  {
    title: "Planning Visites / Audits",
    href: "/mes-docs/planning-visites-audits",
    description: "Planning Visites / Audits"
  }
];

const administration: MenuItem[] = [
  {
    title: "Secteurs",
    href: "/admin/params/secteurs",
    description: "Secteurs"
  },
  {
    title: "Ateliers",
    href: "/admin/params/ateliers",
    description: "Ateliers"
  },
  {
    title: "Utilisateurs",
    href: "/admin/params/utilisateurs",
    description: "Utilisateurs"
  },
  {
    title: "Profils",
    href: "/admin/params/profils",
    description: "Profils"
  },
  {
    title: "Param Sites",
    href: "/admin/params/paramssites",
    description: "Param Sites"
  },
  {
    title: "Grilles groupe",
    href: "/admin/params/grillesgroupe",
    description: "Grilles groupe"
  }
];

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        {/*
          <Icons.logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
            </span>
          */}
        <Image src="/logo5.png" alt="logo bigard" width={100} height={40} />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Accueil
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Mes Contrôles</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem href="/docs" title="Matière">
                  Matière
                </ListItem>
                <ListItem href="/docs/installation" title="Nettoyage">
                  Nettoyage
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Réception">
                  Réception
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Sécurité">
                  Sécurité
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Mes Ressources Humaines
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {mesRessourcesHumaine.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Mes Communications</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {mesCommunications.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Mes Documents</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {mesDocuments.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Administration</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {administration.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {/*
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
      */}
    </div>
  );
}

/*
        <NavigationMenu>
          <NavigationMenuList>
            {items?.map((item, index) => {
              if (item?.children)
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger>
                      Administration
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {item?.children.map((child, indexChild) => (
                          <ListItem
                            key={`${index}=${indexChild}-${child.title}`}
                            title={child.title}
                            href={`${item.path}/${child.href}`}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              else
                return (
                  <NavigationMenuItem key={index}>
                    <Link href={item.href} legacyBehavior passHref>
                      {item.title}
                    </Link>
                  </NavigationMenuItem>
                );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      ) : null}
*/
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {/*           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p> */}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
