"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { BellRing } from "lucide-react";

import { SECTORS } from "@/types/data";
import { CONTROL_STATUS } from "@/types/schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

type Props = {
  sectors: SECTORS;
};

export default function DashboardClient({ sectors }: Props) {
  const router = useRouter();
  const { siteId } = useParams();
  const hasData = Object.keys(sectors).length > 0;

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[1200px] flex-col items-start gap-2">
        <h1 className="text-1xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Mes Contrôles <br className="hidden sm:inline" />
        </h1>
        <div className="flex flex-wrap max gap-4 mt-10">
          {hasData
            ? Object.keys(sectors)
                .sort()
                .map((key: string) => {
                  const sector = sectors[key];

                  return (
                    <Card key={key} className={cn("w-[380px]")}>
                      <CardHeader>
                        <CardTitle>Secteur: {sector.label}</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        {sector.ateliers.map((atelier) => {
                          if (atelier[CONTROL_STATUS.NC] > 0) {
                            return (
                              <div
                                key={atelier.id}
                                className=" flex items-center space-x-4 rounded-md border p-4"
                              >
                                <div className="flex-1 space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                    <b>Atelier:</b> {atelier.label} :
                                    {` ${atelier[CONTROL_STATUS.NC]} NC / ${
                                      atelier[CONTROL_STATUS.C]
                                    }`}
                                  </p>
                                </div>
                                <BellRing />
                              </div>
                            );
                          } else {
                            return (
                              <div
                                key={atelier.id}
                                className=" flex items-center space-x-4 rounded-md border p-4"
                              >
                                <div className="flex-1 space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                    <b>Atelier:</b> {atelier.label} : 0 NC /{" "}
                                    {` ${atelier[CONTROL_STATUS.C]}`}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={() =>
                            router.push(`/admin/sites/${siteId}/details`)
                          }
                          className="w-full"
                        >
                          Consulter
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })
            : "Données à venir"}
        </div>
      </div>
    </section>
  );
}
