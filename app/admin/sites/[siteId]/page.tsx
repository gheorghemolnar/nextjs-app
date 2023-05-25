import { useRouter } from "next/navigation"

import ClientOnly from "@/components/ui/clientOnly"
import getControls from "@/app/actions/getControls"

import ControlClient from "./ControlClient"

type Props = { params: { siteId: string } }

export default async function Page({ params: { siteId } }: any) {
  console.log("🚀 Page props:", siteId)

  const { data: controls } = await getControls()
  console.log("🚀 > Page ~ controls:", siteId, "======>", controls)

  if (!controls || (controls && controls.length === 0)) {
    return (
      <ClientOnly>
        {/*         <EmptyState
          title="No Reservation found"
          subtitle="Looks like you have no reservations on your properties."
        /> */}
        SITES: NO CONTROLS
      </ClientOnly>
    )
  }
  // console.log("🚀>>> Page ~ data:", controls.length)

  const site = mapping[`siteId_${siteId}`]

  return (
    <ClientOnly>
      <ControlClient controls={controls} site={site} />
    </ClientOnly>
  )
}
type SITE = {
  siteId: number
  siteLabel: string
  code_BG: string
  code_RH: string
}

const mapping: { [key: string]: SITE } = {
  siteId_1: {
    siteId: 1,
    siteLabel: "Quimperlé",
    code_RH: "001",
    code_BG: "01",
  },

  siteId_2: {
    siteId: 2,
    siteLabel: "Castres",
    code_RH: "003",
    code_BG: "03",
  },

  siteId_3: {
    siteId: 3,
    siteLabel: "Evron",
    code_RH: "014",
    code_BG: "14",
  },

  siteId_4: {
    siteId: 4,
    siteLabel: "Cherré",
    code_RH: "030",
    code_BG: "30",
  },

  siteId_5: {
    siteId: 5,
    siteLabel: "Anglet",
    code_RH: "148",
    code_BG: "48",
  },

  siteId_6: {
    siteId: 6,
    siteLabel: "Cholet",
    code_RH: "071",
    code_BG: "71",
  },

  siteId_7: {
    siteId: 7,
    siteLabel: "Le Neubourg",
    code_RH: "035",
    code_BG: "35",
  },

  siteId_9: {
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
