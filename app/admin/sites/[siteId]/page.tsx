import { SITE } from "@/types/data"
import ClientOnly from "@/components/ui/clientOnly"

import SiteClient from "./SiteClient"

type Props = { params: { siteId: string } }

const pageSizeDefault = 10
const pageIndexDefault = 0

export default function Page({ params: { siteId } }: Props) {
  /*   const payload = {
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

  const site = mapping[`siteId_${siteId}`]

  return (
    <ClientOnly>
      <SiteClient controls={[]} site={site} />
    </ClientOnly>
  )
}

/** TODO: TO BE DELETED !!! */
const mapping: { [key: string]: SITE } = {
  siteId_01: {
    siteId: 1,
    siteLabel: "Quimperlé",
    code_RH: "001",
    code_BG: "01",
  },

  siteId_02: {
    siteId: 2,
    siteLabel: "Castres",
    code_RH: "003",
    code_BG: "03",
  },

  siteId_03: {
    siteId: 3,
    siteLabel: "Evron",
    code_RH: "014",
    code_BG: "14",
  },

  siteId_04: {
    siteId: 4,
    siteLabel: "Cherré",
    code_RH: "030",
    code_BG: "30",
  },

  siteId_05: {
    siteId: 5,
    siteLabel: "Anglet",
    code_RH: "148",
    code_BG: "48",
  },

  siteId_06: {
    siteId: 6,
    siteLabel: "Cholet",
    code_RH: "071",
    code_BG: "71",
  },

  siteId_07: {
    siteId: 7,
    siteLabel: "Le Neubourg",
    code_RH: "035",
    code_BG: "35",
  },

  siteId_09: {
    siteId: 9,
    siteLabel: "Bond",
    code_RH: "007",
    code_BG: "77",
  },

  siteId_13: {
    siteId: 13,
    siteLabel: "Bond",
    code_RH: "008",
    code_BG: "78",
  },
}
