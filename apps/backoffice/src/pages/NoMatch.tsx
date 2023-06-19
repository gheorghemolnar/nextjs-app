import { Link } from "react-router-dom";

export default function NoMath() {
  return (
    <div className="container mx-auto h-1/2 flex flex-column grow justify-center items-center">
      <h1 className="text-lg">Page introuvable</h1>
      <br/><br/>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}
