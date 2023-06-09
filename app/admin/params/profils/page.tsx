import ClientOnly from "@/components/ui/clientOnly";
import getParamsList from "@/app/actions/paramsList";

import ParamsClient from "./ParamsClient";

const URL_BASE = process.env.URL_BASE;

async function getProfilesList({
  pageIndex,
  pageSize
}: {
  pageIndex: number;
  pageSize: number;
}) {
  const url = `${URL_BASE}/api/utilisateurs?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  const response = await fetch(url);

  console.log("🚀 Param > PROFIL >  ~ response:", response);
}

export default async function page() {
  const listeParams = await getParamsList();

  const data = await getProfilesList({ pageIndex: 0, pageSize: 20 });

  return (
    <ClientOnly>
      <ParamsClient listeParams={listeParams} />
    </ClientOnly>
  );
}
