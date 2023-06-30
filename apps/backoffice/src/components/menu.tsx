/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
import {
    BookOpen,
    BookOpenCheckIcon,
    ConciergeBellIcon,
    FileDigitIcon,
    FilesIcon,
    LayersIcon,
    LayoutGrid,
    NfcIcon,
    Radio,
    ShieldIcon,
    SmartphoneNfcIcon,
    SparkleIcon
} from 'lucide-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import {
    cn,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from '@big/ui';

interface MenuSecItem {
    name: string;
    link: string;
    badge?: {
        text: string;
        count: number;
    };
    icon: ReactNode;
}

interface MenuItem {
    name: string;
    link?: string;
    badge?: {
        text: string;
        count: number;
    };
    icon: ReactNode;
    items?: MenuSecItem[];
}

export const mesCommunications: MenuItem[] = [
    {
        name  : 'Mes Communications',
        icon  : <Radio className="mr-2" />,
        items : [
            {
                name  : 'Communication PST Groupe',
                link  : 'communication/pst-groupe',
                badge : {
                    text  : '',
                    count : 3
                },
                icon: <NfcIcon className="mr-2 h-4 w-4" />
            },
            {
                name  : 'Communication PST Site',
                link  : 'communication/pst-site',
                badge : {
                    text  : '',
                    count : 8
                },
                icon: <SmartphoneNfcIcon className="mr-2 h-4 w-4" />
            },
            {
                name : 'Communication Atelier',
                link : 'communication/atelier',
                icon : <NfcIcon className="mr-2 h-4 w-4" />
            }
        ]
    }
];

export const mesDocuments: MenuItem[] = [
    {
        name  : 'Mes Documents',
        icon  : <FilesIcon className="mr-2" />,
        items : [
            {
                name  : 'Cahiers des charges',
                link  : 'mes-docs/cahiers-de-charges',
                badge : {
                    text  : '',
                    count : 7
                },
                icon: <BookOpen className="mr-2 h-4 w-4" />
            },
            {
                name  : 'Fiches techniques',
                link  : 'mes-docs/fiches-techniques',
                badge : {
                    text  : 'New',
                    count : 25
                },
                icon: <FileDigitIcon className="mr-2 h-4 w-4" />
            },
            {
                name : 'Planning Visites / Audits',
                link : '/mes-docs/planning-visites-audits',
                icon : <BookOpenCheckIcon className="mr-2 h-4 w-4" />
            }
        ]
    }
];

export const mesControles: MenuItem[] = [
    {
        name  : 'Mes Contrôles',
        icon  : <LayoutGrid className="mr-2" />,
        items : [
            {
                name  : 'Matière',
                link  : 'controles/m',
                badge : {
                    text  : '',
                    count : 43
                },
                icon: <LayersIcon className="mr-2 h-4 w-4" />
            },
            {
                name  : 'Nettoyage',
                link  : 'controles/n',
                badge : {
                    text  : '',
                    count : 15
                },
                icon: <SparkleIcon className="mr-2 h-4 w-4" />
            },
            {
                name : 'Sécurité',
                link : 'controles/s',
                icon : <ShieldIcon className="mr-2 h-4 w-4" />
            },
            {
                name : 'Réception',
                link : 'controles/r',
                icon : <ConciergeBellIcon className="mr-2 h-4 w-4" />
            }
        ]
    }
];

const administration: MenuItem[] = [
    {
        name  : 'Paramétrage',
        icon  : <LayoutGrid className="mr-2" />,
        items : [
            {
                name : 'Ateliers',
                link : 'params/ateliers',
                icon : <LayoutGrid className="mr-2 h-4 w-4" />
            },
            {
                name  : 'Secteurs',
                link  : 'params/secteurs',
                badge : {
                    text  : '',
                    count : 7
                },
                icon: <LayoutGrid className="mr-2 h-4 w-4" />
            },
            {
                name : 'Utilisateurs',
                link : 'params/utilisateurs',
                icon : <LayoutGrid className="mr-2 h-4 w-4" />
            },
            {
                name : 'Profils',
                link : 'params/profils',
                icon : <LayoutGrid className="mr-2 h-4 w-4" />
            },
            {
                name : 'Param Sites',
                link : 'params/paramssite',
                icon : <LayoutGrid className="mr-2 h-4 w-4" />
            },
            {
                name : 'Grilles groupe',
                link : 'params/grillesgroupe',
                icon : <LayoutGrid className="mr-2 h-4 w-4" />
            }
        ]
    }
];

function generateMenu(
    collapsed: boolean,
    prefix: string,
    menuItems: MenuItem[]
): ReactNode[] {
    const menu = menuItems.map((section: MenuItem, index: number) => {
        return (
            <Collapsible key={`${prefix}-${index}`}>
                <CollapsibleTrigger>
                    <div className="flex">
                        {section?.icon ? (
                            collapsed ? (
                                <HoverCard>
                                    <HoverCardTrigger>
                                        {section.icon}
                                    </HoverCardTrigger>
                                    <HoverCardContent
                                        side="right"
                                        className="w-65"
                                    >
                                        {section.items &&
                                            section.items.map(
                                                (
                                                    item: MenuSecItem,
                                                    indexSec: number
                                                ) => {
                                                    return (
                                                        <Link
                                                            key={`${prefix}-${index}-${indexSec}`}
                                                            className="flex gap-1 items-center rounded-sm hover:bg-orange-300 hover:text-white"
                                                            to={item.link}
                                                        >
                                                            {item?.icon
                                                                ? item.icon
                                                                : ''}
                                                            {item.name}
                                                        </Link>
                                                    );
                                                }
                                            )}
                                    </HoverCardContent>
                                </HoverCard>
                            ) : (
                                section.icon
                            )
                        ) : (
                            ''
                        )}
                        {!collapsed && (
                            <span className="hidden data-[state=closed]-xs:block  ml-3 md:block font-bold">
                                {section.name}
                            </span>
                        )}
                    </div>
                </CollapsibleTrigger>
                {!collapsed && (
                    <CollapsibleContent className="sm:block md:grid grid-cols-1 gap-y-1 ml-3">
                        {section.items &&
                            section.items.map(
                                (item: MenuSecItem, indexSec: number) => {
                                    return (
                                        <Link
                                            key={`${prefix}-${index}-${indexSec}`}
                                            className="flex items-center gap-2 rounded-sm hover:bg-orange-300 hover:text-white"
                                            to={item.link}
                                        >
                                            {item?.icon ? item.icon : ''}
                                            {item.name}
                                        </Link>
                                    );
                                }
                            )}
                    </CollapsibleContent>
                )}
            </Collapsible>
        );
    });

    return menu;
}

type Properties = {
    collapsed: boolean;
};

export function AccordionDemo({ collapsed }: Properties) {
    return (
        <div
            className={cn({
                'my-2 flex flex-col gap-2' : true,
                'items-stretch'            : !collapsed,
                'items-center'             : collapsed
            })}
            //className="grid grid-cols-1 gap-y-1"
        >
            {generateMenu(collapsed, 'ctrl', mesControles)}
            {generateMenu(collapsed, 'doc', mesDocuments)}
            {generateMenu(collapsed, 'com', mesCommunications)}
            {generateMenu(collapsed, 'adm', administration)}
        </div>
    );
}
