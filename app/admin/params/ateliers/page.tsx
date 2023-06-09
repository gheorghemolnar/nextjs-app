import ClientOnly from "@/components/ui/clientOnly";
import getParamsList from "@/app/actions/paramsList";

import ParamsClient from "./ParamsClient";

const URL_BASE = process.env.URL_BASE;

async function getAteliersList({
  pageIndex,
  pageSize
}: {
  pageIndex: number;
  pageSize: number;
}) {
  const url = `${URL_BASE}/api/ateliers?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  const response = await fetch(url);
}

export default async function page() {
  const listeParams = await getParamsList();

  const data = await getAteliersList({ pageIndex: 0, pageSize: 20 });

  return (
    <ClientOnly>
      <ParamsClient listeParams={listeParams} />
    </ClientOnly>
  );
}
