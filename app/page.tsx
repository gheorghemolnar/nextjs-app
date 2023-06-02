import ClientOnly from "@/components/ui/clientOnly";
import getSites from "@/app/actions/getSites";

import SitesClient from "./admin/sites/SitesClient";

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

/* 
export default async function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          BigExploit
        </h1>
       <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Service Informatique - Bigard
        </p> 
      </div>
             <div className="flex gap-4">A COMPLETER</div>
    </section>
  );
}
 */
