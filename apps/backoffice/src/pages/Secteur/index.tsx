import { Link, Outlet, useParams } from 'react-router-dom';

import { STATISTIQUE_CONTROLE_SECTEUR, STATS_TOTAUX } from '@big/types';
import { Card, CardContent, CardHeader, CardTitle, cn } from '@big/ui';

import { useListStatistiqueControleByGrilleSecteur } from '@backoffice/api/statistique-controle';
import { extractStats, sortArrayByKey } from '@backoffice/lib/utils';

export default function Secteur() {
    const {
        typeControle,
        idSecteur = '',
        idAtelier = '',
        resultatCtrl = ''
    } = useParams();
    let ateliers: STATISTIQUE_CONTROLE_SECTEUR[] = [];

    if (typeControle && idSecteur) {
        const {
            data
            //    isLoading, isError, isSuccess
        } = useListStatistiqueControleByGrilleSecteur({
            typeControle,
            idSecteur,
            startPeriode : '2023-06-01T00:00:00.000Z',
            endPeriode   : '2023-06-30T00:00:00.000Z',
            resultatCtrl
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
            <div className="grid grid-cols-1 gap-2 m-4">
                <div className="flex flex-wrap gap-4 m-2">
                    {ateliers?.length > 0
                        ? ateliers.map(
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
                                          //to={`ateliers/${codeAtelier}`}
                                          to={`details`}
                                      >
                                          <Card
                                              className={cn({
                                                  'border-red-600':
                                                      idAtelier === codeAtelier
                                              })}
                                          >
                                              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                  <CardTitle className="text-sm font-medium">
                                                      <p className="text-xs text-muted-foreground">
                                                          Atelier
                                                      </p>
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
                          )
                        : null}
                </div>
            </div>
            <Outlet />
        </>
    );
}
