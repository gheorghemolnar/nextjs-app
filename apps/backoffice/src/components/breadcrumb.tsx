import { ChevronRightIcon } from 'lucide-react';
import { Link, useMatches } from 'react-router-dom';

export default function Breadcrumbs() {
    const matches = useMatches();
    const crumbs = matches.filter((match) => match?.handle);

    return (
        <nav className="flex p-10" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
                {crumbs.map((crumb) => (
                    <li key={crumb.id}>
                        <div className="flex items-center">
                            <Link to={crumb.pathname}>
                                {crumb.handle as string}
                            </Link>
                            <ChevronRightIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
