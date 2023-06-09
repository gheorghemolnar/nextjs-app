import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Example1, Overview } from "@/app/tmp/overview";

const secteurs = [
  {
    name: "1ère transformation Boeuf",
    nc: 9,
    total: 120,
    comm: "+20.1% par rapport au dernièr mois",
    codeSecteur: "1"
  },
  {
    name: "2ème transformation Boeuf",
    nc: 5,
    total: 420,
    comm: "+6.1% par rapport au dernièr mois",
    codeSecteur: "2"
  },
  {
    name: "1ère transformation Porc",
    nc: 13,
    total: 620,
    comm: "+19.1% par rapport au dernièr mois",
    codeSecteur: "3"
  },
  {
    name: "2ème transformation Porc",
    nc: 13,
    total: 620,
    comm: "+19.1% par rapport au dernièr mois",
    codeSecteur: "4"
  },
  {
    name: "3ème transformation",
    nc: 0,
    total: 187,
    comm: "+0.1% par rapport au dernièr mois",
    codeSecteur: "5"
  }
];

export default function page() {
  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex flex-column gap-4 m-4">
        {secteurs.map(({ codeSecteur, name, nc, total, comm }, index) => {
          return (
            /*  <div key={index}>sdsds - {index}</div> */
            <Link
              key={index}
              href={`/controles/matiere/secteur/${codeSecteur}`}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <span className={nc > 0 ? "text-red-700" : ""}>
                      {nc} NC
                    </span>{" "}
                    / {total}
                  </div>
                  <p className="text-xs text-muted-foreground">{comm}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-row">
        <Overview /> <Example1 />
      </div>
    </div>
  );
}
