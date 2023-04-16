import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from "react";
import Header from "../components/Header";

const Home = lazy(() => import('../pages/Home'));
const Events = lazy(() => import('./Events'));


export default function Layout() {

    return (
        <>
            <BrowserRouter>
                <div className="container mx-auto px-4">
                    <Header />
                    <Switch>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Route exact path="/" render={(props) => <Home {...props} />} />
                            <Route exact path="/events" render={(props) => <Events {...props} />} />
                        </Suspense>
                    </Switch>
                </div>
            </BrowserRouter>
        </>

    );
}
