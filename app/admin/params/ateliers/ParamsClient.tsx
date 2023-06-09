"use client";

import React from "react";
import Link from "next/link";

import { COMPANY } from "@/types/schema";
import { IResponseRO } from "@/lib/services";
import { getUrlBase } from "@/lib/utils";
import AtelierForm from "@/components/forms/atelier";

const URL_BASE = getUrlBase();

interface Param {
  label: string;
  path: string;
}

async function getClientCompanies({
  pageIndex,
  pageSize
}: {
  pageIndex: number;
  pageSize: number;
}) {
  const url = `${URL_BASE}/api/utilisateurs?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  const response = await fetch(url);
  const result: IResponseRO<COMPANY> = await response.json();

  return result;
}

export default function ParamsClient({
  listeParams
}: {
  listeParams: Param[];
}) {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[1200px] flex-col items-center gap-2">
        <div className="text-2xl font-extrabold">Ateliers</div>
        <br />
        <AtelierForm />
      </div>
    </section>
  );
}
