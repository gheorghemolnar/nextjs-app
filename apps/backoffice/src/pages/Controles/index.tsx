import { Link, Outlet, useParams } from 'react-router-dom';

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@big/client';
import { STATISTIQUE_CONTROLE, STATS_TOTAUX } from '@big/types';
import { Card, CardContent, CardHeader, CardTitle, cn } from '@big/ui';

import { useListStatistiqueControleByGrille } from '@backoffice/api/statistique-controle';
import { extractStats, sortArrayByKey } from '@backoffice/lib/utils';

function Controles() {
    const { typeControle = '', secteurId = '' } = useParams();
    const { data, isLoading } = useListStatistiqueControleByGrille({
        typeControle,
        pageIndex : DEFAULT_PAGE_INDEX,
        pageSize  : DEFAULT_PAGE_SIZE
    });

    const secteurs: STATISTIQUE_CONTROLE[] =
        sortArrayByKey<STATISTIQUE_CONTROLE>(data, 'secteur.ordreAff');

    console.log('🚀 Controles > Secteurs > isLoading >', isLoading);

    return (
        <>
            {!secteurId && (
                <div className="grid grid-cols-1 gap-2 m-4">
                    Matière {`${typeControle}`.toUpperCase()} - SECTEURS
                    <div className="flex flex-wrap gap-4 m-2">
                        {secteurs.map(
                            (
                                {
                                    nombreControle,
                                    secteur: { libSecteur, codeSecteur },
                                    statistiques
                                },
                                index
                            ) => {
                                const stats: STATS_TOTAUX =
                                    extractStats(statistiques);

                                return (
                                    <Link
                                        key={index}
                                        to={`secteurs/${codeSecteur}`}
                                    >
                                        <Card
                                            className={cn({
                                                'border-red-600':
                                                    codeSecteur === secteurId
                                            })}
                                        >
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">
                                                    {libSecteur}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">
                                                    <span
                                                        className={
                                                            stats.NC > 0 ||
                                                            stats.NV > 0
                                                                ? 'text-brand'
                                                                : ''
                                                        }
                                                    >
                                                        {stats?.NC
                                                            ? `${stats.NC} NC`
                                                            : (stats.NV
                                                            ? `${stats.NV} NV`
                                                            : '--')}
                                                    </span>{' '}
                                                    / {nombreControle}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    0.12%
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

export default Controles;
