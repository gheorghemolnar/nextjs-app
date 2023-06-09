interface Param {
  label: string;
  path: string;
}
const listeParams: Param[] = [
  /*   { label: "Sites", path: "/admin/sites" },
  { label: "Sociétés", path: "/admin/societes" }, */
  { label: "Utilisateurs", path: "/admin/params/utilisateurs" },
  { label: "Secteurs", path: "/admin/params/secteurs" },
  { label: "Atéliers", path: "/admin/params/ateliers" },
  { label: "Profils", path: "/admin/params/profils" },
  { label: "Params site", path: "/admin/params/paramssite" },
  { label: "Grilles groupe", path: "/admin/params/grillesgroupe" }
];

export default async function getParamsList(): Promise<Param[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(listeParams), 1000);
  });
}
