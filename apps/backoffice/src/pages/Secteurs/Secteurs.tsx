import { Link, useParams } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@big/ui";

type Atelier = {
  name: string;
  nc: number;
  total: number;
  comm: string;
};

type Mapping = { [key: string]: { ateliers: Atelier[] } };

const mapping: Mapping = {
  "1": {
    ateliers: [
      {
        name: "Chaine d'abattage",
        nc: 3,
        total: 120,
        comm: "+20.1% par rapport au dernièr mois",
      },
      {
        name: "Abat Rouge",
        nc: 1,
        total: 420,
        comm: "+6.1% par rapport au dernièr mois",
      },
      {
        name: "Abat Blanc",
        nc: 4,
        total: 620,
        comm: "+19.1% par rapport au dernièr mois",
      },
      {
        name: "Mise en quartier 1/4",
        nc: 1,
        total: 187,
        comm: "+0.1% par rapport au dernièr mois",
      },
    ],
  },
  "2": {
    ateliers: [
      {
        name: "Chaine d'abattage",
        nc: 5,
        total: 350,
        comm: "+20.1% par rapport au dernièr mois",
      },
      {
        name: "Abat Rouge",
        nc: 1,
        total: 110,
        comm: "+6.1% par rapport au dernièr mois",
      },
      {
        name: "Abat Blanc",
        nc: 14,
        total: 820,
        comm: "+19.1% par rapport au dernièr mois",
      },
      {
        name: "Mise en quartier 1/4",
        nc: 0,
        total: 287,
        comm: "+0.1% par rapport au dernièr mois",
      },
    ],
  },
};

export default function Secteur() {
  const params = useParams();
  console.log("🚀 ~ file: Secteur.tsx:75 ~ Secteur ~ params:", params);
  const { secteurId } = useParams();

  let ateliers: Atelier[] = [];
  if (secteurId) ateliers = mapping[secteurId]["ateliers"];

  return (
    <div className="flex gap-4 m-4">
      {ateliers.length &&
        ateliers.map(({ name, nc, total, comm }: Atelier, index) => {
          return (
            <Link key={index} to="/sites/01/details">
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
  );
}
