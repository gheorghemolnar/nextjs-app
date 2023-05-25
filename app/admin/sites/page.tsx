import { SITE_RO } from "@/types/data"
import { siteConfig } from "@/config/site"
import ClientOnly from "@/components/ui/clientOnly"
import getSites from "@/app/actions/getSites"

import SitesClient from "./SitesClient"

export default async function IndexPage() {
  const { data: sites } = await getSites()

  if (!sites || (sites && sites.length === 0)) {
    return (
      <ClientOnly>
        {/*         <EmptyState
          title="No Reservation found"
          subtitle="Looks like you have no reservations on your properties."
        /> */}
        NO DATAAAAA
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <SitesClient sites={sites} />
    </ClientOnly>
  )
}

{
  /*          <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ size: "lg" })}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          GitHub
        </Link> */
}
