import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom';

import Listing from './components/listings';
import MainLayout from './layouts/MainLayout';
import Controles from './pages/Controles';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Ateliers from './pages/Params/Ateliers';
import Secteurs from './pages/Params/Secteurs';
import Utilisateurs from './pages/Params/Utilisateurs';
import Signin from './pages/Signin';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            handle="Accueil"
            element={<MainLayout />}
            errorElement={<ErrorPage />}
        >
            <Route index element={<Home />} />
            <Route
                path="controles/:typeControle"
                handle={{
                    paramName : 'typeControle',
                    prefix    : 'Mon Contrôle : '
                }}
                element={<Controles />}
            >
                <Route
                    path="secteurs/:idSecteur/details"
                    handle={{ paramName: 'idSecteur', prefix: 'Secteur : ' }}
                    element={<Listing />}
                />
                {/*
                <Route
                    path="secteurs/:idSecteur"
                    handle={{ paramName: 'idSecteur', prefix: "Secteur : " }}
                    element={<Secteur />}
                >
                     <Route
                        path="ateliers/:idAtelier"
                        handle="Atelier"
                        element={<Listing />}
                    />
                </Route>
                */}
            </Route>
            <Route
                path="/params/ateliers"
                handle="Params Ateliers"
                element={<Ateliers />}
            />
            <Route
                path="/params/secteurs"
                handle="Params Secteurs"
                element={<Secteurs />}
            />
            <Route
                path="/params/utilisateurs"
                handle="Params Utilisateurs"
                element={<Utilisateurs />}
            />
            <Route path="/login" handle="Connexion" element={<Signin />} />
            <Route path="*" element={<NoMatch />} />
        </Route>
    )
);
export default function App() {
    return (
        <RouterProvider
            router={router}
            fallbackElement={<p>Loading .... </p>}
        />
    );
}
