import { Link, Outlet, useParams } from 'react-router-dom';

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@big/client';
import { STATISTIQUE_CONTROLE_SECTEUR, STATS_TOTAUX } from '@big/types';
import { Card, CardContent, CardHeader, CardTitle, cn } from '@big/ui';

import { useListStatistiqueControleByGrilleSecteur } from '@backoffice/api/statistique-controle';
import { extractStats, sortArrayByKey } from '@backoffice/lib/utils';

export default function Secteur() {
    const { typeControle, secteurId = '', atelierId = '' } = useParams();

    const sectorName = '';
    let ateliers: STATISTIQUE_CONTROLE_SECTEUR[] = [];

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
        const dataSorted: STATISTIQUE_CONTROLE_SECTEUR[] =
            sortArrayByKey<STATISTIQUE_CONTROLE_SECTEUR>(
                data,
                'atelier.ordreAff'
            );

        ateliers = dataSorted;
    }

    return (
        <>
            {!atelierId && (
                <div className="grid grid-cols-1 gap-2 m-4">
                    Mes Contrôles - {`${typeControle}`.toUpperCase()} -{' '}
                    {sectorName} - ATELIERS
                    <div className="flex flex-wrap gap-4 m-2">
                        {ateliers?.length &&
                            ateliers.map(
                                (
                                    {
                                        atelier: { libAtelier, codeAtelier },
                                        nombreControle,
                                        statistiques
                                    },
                                    index
                                ) => {
                                    const stats: STATS_TOTAUX =
                                        extractStats(statistiques);
                                    return (
                                        <Link
                                            key={index}
                                            to={`ateliers/${codeAtelier}`}
                                        >
                                            <Card
                                                className={cn({
                                                    'border-red-600':
                                                        atelierId ===
                                                        codeAtelier
                                                })}
                                            >
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                    <CardTitle className="text-sm font-medium">
                                                        {libAtelier}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-2xl font-bold">
                                                        <span
                                                            className={
                                                                stats?.NC ||
                                                                stats?.NV > 0
                                                                    ? 'text-red-700'
                                                                    : ''
                                                            }
                                                        >
                                                            {stats?.NC
                                                                ? `${stats.NC} NC`
                                                                : (stats.NV
                                                                ? `${stats.NV} NV`
                                                                : '0')}
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
            )}
            <Outlet />
        </>
    );
}
