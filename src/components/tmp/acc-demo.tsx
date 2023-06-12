import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  UsersIcon,
  type IconNode,
  type LucideIcon,
  type Icon,
} from "lucide-react";

import { Link } from "react-router-dom";

interface MenuItem {
  name: string;
  link?: string;
  badge?: {
    text: string;
    count: number;
  };
  icon: Icon;
  items?: MenuItem[];
}

const mesControles: MenuItem[] = [
  {
    name: "Mes Contrôles",
    icon: <LayoutGrid />,
    items: [
      {
        name: "Matière",
        link: "/controles/matiere",
        badge: {
          text: "",
          count: 43,
        },
        icon: <LayersIcon className="mr-2 h-4 w-4" />,
      },
      {
        name: "Nettoyage",
        link: "/controles/nettoyage",
        badge: {
          text: "",
          count: 15,
        },
        icon: <SparkleIcon className="mr-2 h-4 w-4" />,
      },
      {
        name: "Réception",
        link: "/controles/reception",
        icon: <ConciergeBellIcon className="mr-2 h-4 w-4" />,
      },
      {
        name: "Sécurité",
        link: "/controles/securite",
        icon: <ShieldIcon className="mr-2 h-4 w-4" />,
      },
    ],
  },
];

export function AccordionDemo() {
  return (
    <div className="grid grid-cols-1 gap-y-1">
      {mesControles.map((control: MenuItem) => {
        const IconSection = control?.icon;
        return (
          <Collapsible>
            <CollapsibleTrigger>
              <div className="flex">
                {<IconSection className="mr-3" />}
                <span className="ml-3 hidden md:block">{control.name}</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="grid grid-cols-1 gap-y-1 ml-3">
              {control.items &&
                control.items.map((item: MenuItem) => {
                  const IconSSection = item?.icon;
                  return (
                    <Link className="flex" to={item.link}>
                      {IconSSection && <IconSSection className="mr-2" />}
                      {item.name}
                    </Link>
                  );
                })}
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}

/* import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const navigation = [
  {
    name: "Level 01",
    items: [
      { name: "Level 11", link: "/" },
      { name: "Level 12", link: "/abc" },
    ],
  },
  {
    name: "Level 02",
    items: [
      { name: "Level 21", link: "/bbb" },
      { name: "Level 22", link: "/ddd" },
    ],
  },
];

export function AccordionDemo() {
  return (
    <DropdownMenu>
      {navigation.map((section) => {
        return (
          <DropdownMenuGroup>
            <span>{Selection.name}</span>
            <DropdownMenuItem>
              {section.items.map((item) => (
                <DropdownMenuItem>
                  <a href={item.link}></a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        );
      })}
    </DropdownMenu>
  );
} */

/* import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="multiple" className="w-1/2">
      <AccordionItem value="item-1">
        <AccordionTrigger>M</AccordionTrigger>
        <AccordionContent>
          <ul>
            <li>Link 01</li>
            <li>Link 02</li>
            <li>Link 03</li>
            <li>Link 04</li>
            <li>Link 05</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
 */
