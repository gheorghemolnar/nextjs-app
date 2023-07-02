import { ChevronRightIcon, HomeIcon } from 'lucide-react';

//TODO: Delete this part
// const pages = [
//     { name: 'Contrôles', href: '/controles', current: false },
//     { name: 'Matière', href: '/controles/matiere', current: false },
// ];

// eslint-disable-next-line unicorn/prevent-abbreviations
export type BreadcrumbsProps = {
    name: string;
    href: `/${string}`;
    current: boolean;
}[];

const Breadcrumbs: React.FC<BreadcrumbsProps> = (properties) => {
    return (
        <nav className="flex p-10" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
                <li>
                    <div>
                        <a
                            href="/"
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <HomeIcon
                                className="h-5 w-5 flex-shrink-0"
                                aria-hidden="true"
                            />
                            <span className="sr-only">Accueil</span>
                        </a>
                    </div>
                </li>
                {properties.map((property) => (
                    <li key={property.name}>
                        <div className="flex items-center">
                            <ChevronRightIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                            />
                            <a
                                href={property.href}
                                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                aria-current={
                                    property.current ? 'page' : undefined
                                }
                            >
                                {property.name}
                            </a>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export { Breadcrumbs };
