import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom';

import ControlsListing from './components/listing/controlesListing';
import MainLayout from './layouts/MainLayout';
import Controles from './pages/Controles';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Ateliers from './pages/Params/Ateliers';
import Secteurs from './pages/Params/Secteurs';
import Utilisateurs from './pages/Params/Utilisateurs';
import Secteur from './pages/Secteur';

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
                handle="Mes Contrôles"
                element={<Controles />}
            >
                <Route
                    path="secteurs/:secteurId"
                    handle="Secteur"
                    element={<Secteur />}
                >
                    <Route
                        path="ateliers/:atelierId"
                        handle="Atelier"
                        element={<ControlsListing />}
                    />
                </Route>
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
