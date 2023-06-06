"use client";

import React from "react";

import { COMPANY } from "@/types/schema";
import { IResponseRO } from "@/lib/services";
import { getUrlBase } from "@/lib/utils";
import { UtilisateurForm } from "@/components/forms/utilisateur";

const URL_BASE = getUrlBase();

interface Param {
  label: string;
  path: string;
}

const listeParams: Param[] = [
  { label: "Sites", path: "/admin/sites" },
  { label: "Sociétés", path: "/admin/societes" },
  { label: "Utilisateurs", path: "/admin/utilisateurs" },
  { label: "Secteurs", path: "/admin/secteurs" },
  { label: "Atéliers", path: "/admin/ateliers" }
];

async function getClientCompanies({
  pageIndex,
  pageSize
}: {
  pageIndex: number;
  pageSize: number;
}) {
  const url = `${URL_BASE}/api/companies?pageIndex=${pageIndex}&pageSize=${pageSize}`;
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
      <div className="flex max-w-[1200px] flex-col items-start gap-2">
        <h1 className="text-1xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl mb-10">
          Paramétrage <br className="hidden sm:inline" />
        </h1>
        <div className="flex flex-wrap max gap-4">
          <button onClick={() => getClientCompanies}>GET COMPANIES</button>
          <br />
          {listeParams.map((param) => {
            return <div key={param.path}>Param {param.label}</div>;
          })}
        </div>
        <br />
        <UtilisateurForm />
      </div>
    </section>
  );
}
