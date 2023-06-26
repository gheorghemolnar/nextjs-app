import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import { useMatches } from 'react-router-dom';

export default function Breadcrumbs() {
    const matches = useMatches();
    console.log('🚀 > Breadcrumbs ~ matches:', matches);

    const crumbs = matches
        .filter((match) => Boolean(match.handle?.crumb))
        .map((match) => match.handle.crumb(match.data));

    console.log('🚀 > Breadcrumbs ~ crumbs:', crumbs);
    // get rid of any matches that don't have handle and crumb
    // now map them into an array of elements, passing the loader
    // data to each one

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
                {crumbs.map((crumb) => (
                    <li key={crumb.name}>
                        <div className="flex items-center">
                            <ChevronRightIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                            />
                            {crumb}
                            {/*               <a
                href={crumb.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={crumb.current ? "page" : undefined}
              >
                {crumb.name}
              </a> */}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
