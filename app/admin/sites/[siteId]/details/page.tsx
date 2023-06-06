import { SITE } from "@/types/data";
import ClientOnly from "@/components/ui/clientOnly";

import SiteClient from "./SiteClient";

type Props = { params: { siteId: string } };

const pageSizeDefault = 10;
const pageIndexDefault = 0;

export default function Page({ params: { siteId } }: Props) {
  /*
  const payload = {
    siteId: paramSiteId,
    pageIndex: pageIndexDefault,
    pageSize: pageSizeDefault,
  }

  const {
    data: controls,
    numberOfRecords,
    errorMessage,
  } = await getControls(payload)
 
  if (!controls || (controls && controls.length === 0)) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservation found"
          subtitle="Looks like you have no reservations on your properties."
        />
        SITES: NO CONTROLS
      </ClientOnly>
    )
  }
  */

  const site = mapping[`siteId_${siteId}`];

  return (
    <ClientOnly>
      <SiteClient site={site} />
    </ClientOnly>
  );
}

/** TODO: TO BE DELETED !!! */
const mapping: { [key: string]: SITE } = {
  siteId_01: {
    siteId: 1,
    siteLabel: "Quimperlé",
    code_RH: "001",
    code_BG: "01"
  },

  siteId_03: {
    siteId: 3,
    siteLabel: "Castres",
    code_RH: "003",
    code_BG: "03"
  },

  siteId_14: {
    siteId: 14,
    siteLabel: "Evron",
    code_RH: "014",
    code_BG: "14"
  },

  siteId_30: {
    siteId: 30,
    siteLabel: "Cherré",
    code_RH: "030",
    code_BG: "30"
  },

  siteId_48: {
    siteId: 48,
    siteLabel: "Anglet",
    code_RH: "148",
    code_BG: "48"
  },

  siteId_71: {
    siteId: 71,
    siteLabel: "Cholet",
    code_RH: "071",
    code_BG: "71"
  },

  siteId_35: {
    siteId: 35,
    siteLabel: "Le Neubourg",
    code_RH: "035",
    code_BG: "35"
  }
};
