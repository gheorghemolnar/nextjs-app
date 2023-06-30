import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom';

import { STATISTIQUE_CONTROLE, STATS_TOTAUX } from '@big/types';
import { Card, CardContent, CardHeader, CardTitle, cn } from '@big/ui';

import { useListStatistiqueControleByGrille } from '@backoffice/api/statistique-controle';
import { extractStats, sortArrayByKey } from '@backoffice/lib/utils';

function Controles() {
    const startPeriode = '2023-06-01T00:00:00.000Z';
    const endPeriode = '2023-06-30T00:00:00.000Z';
    const [searchParameters] = useSearchParams();
    const { resultatCtrl = '' } = Object.fromEntries(searchParameters);

    const queryString = searchParameters.toString();
    const { typeControle = '', idSecteur = '' } = useParams();
    const { data, isLoading } = useListStatistiqueControleByGrille({
        typeControle,
        startPeriode,
        endPeriode,
        resultatCtrl
    });
    const secteurs: STATISTIQUE_CONTROLE[] =
        (data?.length &&
            sortArrayByKey<STATISTIQUE_CONTROLE>(data, 'secteur.ordreAff')) ||
        [];

    console.log('🚀 Controles > Secteurs > isLoading >', isLoading);

    return (
        <>
            {!idSecteur && (
                <div className="grid grid-cols-1 gap-2 m-4">
                    {/* <h1 className="font-bold pl-2">SECTEURS</h1> */}
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
                                        to={`secteurs/${codeSecteur}/details?${queryString}`}
                                    >
                                        <Card
                                            className={cn({
                                                'border-red-600':
                                                    codeSecteur === idSecteur
                                            })}
                                        >
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">
                                                    <p className="text-xs text-muted-foreground">
                                                        Secteur
                                                    </p>
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
