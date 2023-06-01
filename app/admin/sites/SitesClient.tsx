"use client";

import { useRouter } from "next/navigation";

import { SITE_RO } from "@/types/data";
import { formatSiteId } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  sites: SITE_RO[];
};

export default function SitesClient({ sites }: Props) {
  const router = useRouter();

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[1200px] flex-col items-start gap-2">
        <h1 className="text-1xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Liste des sites <br className="hidden sm:inline" />
        </h1>

        <div className="flex flex-wrap max gap-4">
          {sites
            ? sites.map((site: SITE_RO) => {
                return (
                  <Card
                    key={site.IdSite}
                    className="w-[350px]  cursor-pointer"
                    onClick={() =>
                      router.push(`/admin/sites/${formatSiteId(site.IdSite)}`)
                    }
                  >
                    <CardHeader>
                      <CardTitle>{site.LibSite}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Site ID {site.IdSite}
                          </p>
                          <p className="text-sm font-medium leading-none">
                            Code RH {site.CodeSiteRh}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Code BG {site.CodeSiteBg}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            : "NO data"}
        </div>
      </div>
    </section>
  );
}
