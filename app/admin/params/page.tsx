import ClientOnly from "@/components/ui/clientOnly";
import getParamsList from "@/app/actions/paramsList";

import ParamsClient from "./ParamsClient";

export default async function PageIndex() {
  const listeParams = await getParamsList();

  return (
    <ClientOnly>
      <ParamsClient listeParams={listeParams} />
    </ClientOnly>
  );
}
