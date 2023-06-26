import { Link, useParams } from 'react-router-dom';

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@big/client';
import { STATISTIQUE_CONTROLE_SECTEUR, STATS_TOTAUX } from '@big/types';
import { Card, CardContent, CardHeader, CardTitle } from '@big/ui';

import { useListStatistiqueControleByGrilleSecteur } from '@backoffice/api/statistique-controle';
import { extractStats } from '@backoffice/lib/utils';

export default function Secteur() {
    const parameters = useParams();
    // const location = useLocation();
    // const pages = location.pathname.split('/');

    const { typeControle, secteurId } = parameters;
    const sectorName = '';
    let ateliers: STATISTIQUE_CONTROLE_SECTEUR[] = [];

    console.log('🚀 Secteur >:', { typeControle, secteurId });

    if (typeControle && secteurId) {
        const {
            data
            //    isLoading, isError, isSuccess
        } = useListStatistiqueControleByGrilleSecteur({
            typeControle,
            secteurId,
            pageIndex : DEFAULT_PAGE_INDEX,
            pageSize  : DEFAULT_PAGE_SIZE
        });
        const dataSorted: STATISTIQUE_CONTROLE_SECTEUR[] = data.sort(
            (a, b) => a.atelier.ordreAff - b.atelier.ordreAff
        );

        ateliers = dataSorted;
    }
    console.log('🚀 ~ file: Secteur.tsx:29 ~ Secteur ~ ateliers:', ateliers);

    return (
        <div className="grid grid-cols-1 gap-2 m-4">
            Mes Contrôles - {`${typeControle}`.toUpperCase()} - {sectorName} -
            ATELIERS
            <div className="flex flex-column gap-4 m-2">
                {ateliers?.length &&
                    ateliers.map(
                        (
                            {
                                atelier: { libAtelier },
                                nombreControle,
                                statistiques
                            },
                            index
                        ) => {
                            const stats: STATS_TOTAUX =
                                extractStats(statistiques);
                            return (
                                <Link key={index} to={`liste`}>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                {libAtelier}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                <span
                                                    className={
                                                        stats.NC > 0
                                                            ? 'text-red-700'
                                                            : ''
                                                    }
                                                >
                                                    {stats.NC} NC
                                                </span>{' '}
                                                / {nombreControle}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                0.23%
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        }
                    )}
            </div>
        </div>
    );
}
