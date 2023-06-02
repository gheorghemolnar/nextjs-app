import ClientOnly from "@/components/ui/clientOnly";
import getSites from "@/app/actions/getSites";

import SitesClient from "./SitesClient";

export default async function IndexPage() {
  const { data: sites = [] } = await getSites();

  /*
  if (!sites || (sites && sites.length === 0)) {
    return (
      <ClientOnly>
        {         <EmptyState
          title="No Reservation found"
          subtitle="Looks like you have no reservations on your properties."
        />}
        NO DATA AVAILABLE
      </ClientOnly>
    )
  }
  */

  return (
    <ClientOnly>
      <SitesClient sites={sites} />
    </ClientOnly>
  );
}
