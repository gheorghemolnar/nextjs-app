import { Card, CardContent, CardHeader, CardTitle } from "@big/ui";
import { CONTROL_TYPES, SECTEUR, getControles } from "@backoffice/lib/data";
import { Example1, Overview } from "@backoffice/tmp/overview";
import { Link, useParams } from "react-router-dom";

type Props = {};

function Controles({}: Props) {
  const params = useParams();
  let secteurs: SECTEUR[] = [];

  if (params?.controleId)
    secteurs = getControles(params?.controleId as CONTROL_TYPES);

  console.log("🚀 ~ file: Controles.tsx:14 ~ Controles ~ secteurs:", secteurs);

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex flex-column gap-4 m-4">
        CONTROLES
        {secteurs.map(({ codeSecteur, name, nc, total, comm }, index) => {
          return (
            <Link key={index} to={`/controles/matiere/secteur/${codeSecteur}`}>
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

export default Controles;
