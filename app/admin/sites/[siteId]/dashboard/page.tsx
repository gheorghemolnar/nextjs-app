import React from "react";

import { ATELIER, SECTORS } from "@/types/data";
import { CONTROL } from "@/types/schema";
import ClientOnly from "@/components/ui/clientOnly";
import getControls from "@/app/actions/controls";

import DashboardClient from "./DashboardClient";

function consolidateData(controls: CONTROL[]): SECTORS {
  const consolidation = controls?.reduce((acc: any, control: CONTROL) => {
    const keySecteur = `${control.CodeSecteur.padStart(2, "0")}`;
    const status = control.ResultCont!;

    if (status) {
      if (!acc[keySecteur]) {
        acc[keySecteur] = {
          count: 1,
          label: control.LibSecteur,
          [status]: 1,
          ateliers: [
            {
              id: control.IdAtelier,
              label: control.LibAtelier,
              [status]: 1
            }
          ]
        };
      } else {
        acc[keySecteur]["count"] += 1;

        if (!acc[keySecteur][status]) {
          acc[keySecteur][status] = 1;
        } else {
          acc[keySecteur][status] += 1;
        }

        const indexAtelier = acc[keySecteur]["ateliers"].findIndex(
          (atelier: ATELIER) => atelier.id === control.IdAtelier
        );

        if (indexAtelier === -1) {
          acc[keySecteur]["ateliers"].push({
            id: control.IdAtelier,
            label: control.LibAtelier,
            [status]: 1
          });
        } else {
          if (!acc[keySecteur]["ateliers"][indexAtelier][status]) {
            acc[keySecteur]["ateliers"][indexAtelier][status] = 1;
          } else {
            acc[keySecteur]["ateliers"][indexAtelier][status] += 1;
          }
        }
      }
    } else {
      console.log(control.IdControle);
    }

    return acc;
  }, {});

  return consolidation;
}

export default async function page({
  params: { siteId }
}: {
  params: { siteId: string };
}) {
  const { data: controls } = await getControls({
    siteId,
    pageIndex: 0,
    pageSize: 30
  });

  let sectors: SECTORS = {};
  if (controls) sectors = consolidateData(controls);

  return (
    <ClientOnly>
      <DashboardClient sectors={sectors} />
    </ClientOnly>
  );
}
