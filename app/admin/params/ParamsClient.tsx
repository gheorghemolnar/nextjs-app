"use client";

import React from "react";
import Link from "next/link";

const URL_BASE = process.env.URL_BASE;

interface Param {
  label: string;
  path: string;
}

export default function ParamsClient({
  listeParams
}: {
  listeParams: Param[];
}) {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[1200px] flex-col items-center gap-2">
        <h1 className="text-1xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl mb-10">
          Paramétrage
        </h1>

        <div className="flex flex-wrap max gap-4">
          <br />
          {listeParams.map((param) => {
            return (
              <div key={param.path}>
                <Link href={param.path}>{param.label}</Link>
              </div>
            );
          })}
        </div>
        <br />
      </div>
    </section>
  );
}
