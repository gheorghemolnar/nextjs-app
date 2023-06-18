import { Link } from "react-router-dom";

export default function NoMath() {
  return (
    <div>
      <h2>Page introuvable !</h2>
      <p>
        <Link to="/">Retour à l'accueil</Link>
      </p>
    </div>
  );
}
