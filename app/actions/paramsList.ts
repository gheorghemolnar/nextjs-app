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

export default async function getParamsList(): Promise<Param[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(listeParams), 1000);
  });
}
