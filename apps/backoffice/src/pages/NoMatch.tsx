import { Link } from 'react-router-dom';

export default function NoMath() {
    return (
        <div
            //className="container mx-auto h-1/2 flex flex-column grow justify-center items-center">
            className="container mx-4 h-1/2"
        >
            <h1 className="text-3xl">Page introuvable</h1>
            <br />
            <br />
            <Link to="/">Retour à l'accueil</Link>
        </div>
    );
}
