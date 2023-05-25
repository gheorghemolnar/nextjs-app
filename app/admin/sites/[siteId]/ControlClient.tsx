"use client"

import React from "react"

import { CONTROL_RO } from "@/types/data"
import Listing from "@/components/ui/listing/listing"

type Props = {
  //TODO: fix this
  site: any
  controls: CONTROL_RO[]
}
export default function ControlClient({ site, controls }: Props) {
  console.log("🚀 >>>>> ControlClient ~ siteId:", site)
  console.log("🚀 >>>>> ControlClient ~ controls:", controls)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[1200px] flex-col items-start gap-2">
        <h1 className="text-xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {site.siteLabel} <br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[700px] text-md text-muted-foreground">
          ID site : {site.siteId} / Code RH: {site.code_RH} / Code BG:{" "}
          {site.code_BG}
        </p>
      </div>
      <Listing data={controls} />
    </section>
  )
}
