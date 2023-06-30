import { ChevronRightIcon } from 'lucide-react';
import { Link, useMatches, useParams } from 'react-router-dom';

import { STATISTIQUE_CONTROLE } from '@big/types';

import { useQueryClient } from '@tanstack/react-query';

export type RouterHandleParameter = {
    paramName: string;
    prefix?: string;
};

export default function Breadcrumbs() {
    const parameters = useParams();
    const matches = useMatches();
    const queryClient = useQueryClient();
    const mappingSecteurs: { [k: string]: string } = {
        m : 'Matière',
        n : 'Nettoyage',
        s : 'Sécurité',
        r : 'Réception'
    };
    let queryData = [];

    if (parameters?.typeControle) {
        const queriesDataTemporary = queryClient.getQueriesData<
            STATISTIQUE_CONTROLE[]
        >(['statistiquesControlesGrille', { typeControle: 'm' }]);

        // test if the query has data
        if (queriesDataTemporary[0] && queriesDataTemporary[0][1]?.length) {
            const [[_, dataTemporary = []]] = queriesDataTemporary;

            queryData = dataTemporary;
            for (const item of queryData) {
                mappingSecteurs[item.secteur.codeSecteur] =
                    item.secteur.libSecteur;
            }
        }
    }

    const crumbs = matches.filter((match) => match?.handle);

    return (
        <nav className="flex p-10" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
                {crumbs.map((crumb) => {
                    let key = '';
                    let label = '';

                    if (crumb.handle && typeof crumb.handle === 'string') {
                        label = crumb.handle;
                    } else if (typeof crumb.handle === 'object') {
                        key = (crumb.handle as RouterHandleParameter).paramName;
                        label =
                            (crumb.handle as RouterHandleParameter)?.prefix ??
                            '';
                        const parameterValue = parameters[key];
                        if (queryData.length > 0 && parameterValue) {
                            label += mappingSecteurs[parameterValue];
                        }
                    }

                    return (
                        <li key={crumb.id}>
                            <div className="flex items-center">
                                <Link to={crumb.pathname}>{label}</Link>
                                <ChevronRightIcon
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                    aria-hidden="true"
                                />
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
