import { Link, useParams } from 'react-router-dom';

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@big/client';
import { STATISTIQUE_CONTROLE, STATS_TOTAUX } from '@big/types';
import { Card, CardContent, CardHeader, CardTitle } from '@big/ui';

import { useListStatistiqueControleByGrille } from '@backoffice/api/statistique-controle';
import { extractStats } from '@backoffice/lib/utils';
import { Example1, Overview } from '@backoffice/tmp/overview';

function Controles() {
    const { typeControle = '' } = useParams();
    const {
        data
        //    isLoading, isSuccess, isError
    } = useListStatistiqueControleByGrille({
        typeControle,
        pageIndex : DEFAULT_PAGE_INDEX,
        pageSize  : DEFAULT_PAGE_SIZE
    });

    const secteurs: STATISTIQUE_CONTROLE[] = data.sort(
        (a, b) => a.secteur.ordreAff - b.secteur.ordreAff
    );

    console.log('🚀 Controles > Secteurs:', secteurs);

    return (
        <div className="grid grid-cols-1 gap-2 m-4">
            Mes Contrôles - {`${typeControle}`.toUpperCase()} - SECTEURS
            <div className="flex flex-column gap-4 m-2">
                {secteurs.map(
                    (
                        {
                            nombreControle,
                            secteur: { libSecteur, codeSecteur },
                            statistiques
                        },
                        index
                    ) => {
                        const stats: STATS_TOTAUX = extractStats(statistiques);

                        return (
                            <Link key={index} to={`secteurs/${codeSecteur}`}>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {libSecteur}
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
                                            0.12%
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    }
                )}
            </div>
            <div className="flex flex-row">
                <Overview /> <Example1 />
            </div>
        </div>
    );
}

export default Controles;
