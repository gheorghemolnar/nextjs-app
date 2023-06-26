import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom';

//import ControlsListing from './components/listing/controlesListing';
import MainLayout from './layouts/MainLayout';
//import Ateliers from './pages/Ateliers';
import Controles from './pages/Controles';
import ErrorPage from './pages/ErrorPage';
// import NoMatch from './pages/NoMatch';
//import Utilisateurs from './pages/Params/Utilisateurs';
import Secteur from './pages/Secteur';
//import Secteurs from './pages/Secteurs';
import Welcome from './tmp/welcome';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
            <Route index element={<Welcome />} />
            <Route path="controles/:typeControle" element={<Controles />}>
                <Route path="secteurs/:secteurId" element={<Secteur />} />
            </Route>
        </Route>
    )
    /*    
    {
        element      : <MainLayout />,
        errorElement : <ErrorPage />,
        path         : '/',
        children     : [
            {
                index   : true,
                element : <Welcome />,
            },
            {
                path     : 'controles/:typeControle',
                element  : <Controles />,
                children : [

                    {
                        index   : true,
                        element : <div>LeagueStandings</div>,
                    },

                    {
                        path    : "secteurs/:secteurId",
                        element : <div>TEST TEST TESST</div>//<Secteur />,
                    }
                ],
            },
            {
                path    : 'controles/:typeControle/secteur/:secteurId/liste',
                element : <ControlsListing />,
            }, 
            {
                path    : 'controles/:typeControle/secteur/:secteurId',
                element : <Secteur />,
            },
            {
                path     : '/controles',
                element  : <div>CONTROLES LIST </div>,
                children : [
                    {
                        path    : 'secteurs/:secteurId',
                        element : <Secteur />,
                    },
                    {
                        path    : ':typeControle',
                        element : <Controles />,
                        
                         children: [{
                                path    : 'secteurs/:secteurId',
                                element : <Secteur />,
            
                            },
                        ]
                    },
                ]
            },
             {
                path     : 'controles/:typeControle',
                element  : <Controles />,
                //handle   : ({ crumb: (data: any) => { console.log("DATA>", data); return <Link to="controles/:typeControle">Controles</Link> } }),
                children : [{
                        path    : 'secteurs/:secteurId',
                        element : <Secteur />,
    
                    },
                ]
            },

            {
                path    : '/params/ateliers',
                element : <Ateliers />,
            },
            {
                path    : '/params/secteurs',
                element : <Secteurs />,
            },
            {
                path    : '/params/utilisateurs',
                element : <Utilisateurs />,
            },
            {
                path    : '*',
                element : <NoMatch />
            }
        ]
    }
*/
);

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
