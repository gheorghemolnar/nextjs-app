import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ControlsListing from './components/listing/controlesListing';
import MainLayout from './layouts/MainLayout';
import Ateliers from './pages/Ateliers/Ateliers';
import Controles from './pages/Controles/Controles';
import ErrorPage from './pages/ErrorPage';
import NoMatch from './pages/NoMatch';
import Utilisateurs from './pages/Params/Utilisateurs';
import Secteur from './pages/Secteurs/Secteurs';
import Welcome from './tmp/welcome';

const router = createBrowserRouter([
    {
        path         : '/',
        element      : <MainLayout />,
        errorElement : <ErrorPage />,
        children     : [
            {
                path    : '/',
                element : <Welcome />
            },
            {
                path    : 'controles/:controleId/secteur/:secteurId/liste',
                element : <ControlsListing />
            },
            {
                path    : 'controles/:controleId/secteur/:secteurId',
                element : <Secteur />
            },
            {
                path    : 'controles/:controleId/',
                element : <Controles />
                //loader: controlesLoader,
            },
            {
                path    : 'params/ateliers',
                element : <Ateliers />
            },
            {
                path    : 'params/secteurs',
                element : <Utilisateurs />
            },
            {
                path    : 'params/secteurs',
                element : <Utilisateurs />
            },
            {
                path    : '*',
                element : <NoMatch />
            }
        ]
    }
]);

/*
function App() {
    return (
        <div>
            <AtelierForm />
            <p className="text-green-500 text-xl text-center">BONJOUR</p>
            <div className="flex justify-center">
                <div className="w-80 xl:max-w-lg">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                Is it accessible?
                            </AccordionTrigger>
                            <AccordionContent>
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is it styled?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It comes with default styles that matches
                                the other components' aesthetic.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is it animated?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It's animated by default, but you can
                                disable it if you prefer.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    ); 
}
*/

export default function App() {
    return (
        <RouterProvider
            router={router}
            fallbackElement={<p>Loading .... </p>}
        />
    );
}
