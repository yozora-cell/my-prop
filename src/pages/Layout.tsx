import copy from "copy-to-clipboard";
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { ethers } from "ethers";
import { lazy, Suspense, useRef, useState } from "react";
import Header from "../components/Header";
import { notification } from "../components/Notiofication";

const Home = lazy(() => import('../pages/Home'));
const Graph = lazy(() => import('./Graph'));
const Events = lazy(() => import('./Events'));
const Tokens = lazy(() => import('./Tokens'));

const provider: any = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/rbeUGLWOu1aehsuKbaNw_yhVKFXXdwbp');

export default function Layout() {

    const header = useRef<HTMLDivElement>(null);
    const home = useRef<HTMLDivElement>(null);

    const [showModal, setShowModal] = useState(false);

    const changeInfoModal = () => {
        setShowModal(!showModal);
    }

    const clearData = () => {
        // @ts-ignore
        home.current!.clearData();
    }

    const handleConnect = () => {
        // @ts-ignore
        header.current!.handleConnect();
    }

    return (
        <>
            <BrowserRouter>
                <div className="container mx-auto px-4">
                    <Header onRef={header} clearData={clearData} provider={provider} />
                    <Switch>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Route exact path="/" render={(props) => <Home {...props} onRef={home} provider={provider} handleConnect={handleConnect} />} />
                            <Route exact path="/graph" render={(props) => <Graph {...props} provider={provider} />} />
                            <Route exact path="/events" render={(props) => <Events {...props} provider={provider} />} />
                            {/* <Route exact path="/tokens" render={(props) => <Tokens {...props}  />} /> */}
                        </Suspense>
                    </Switch>
                    {/* <footer>
                        <section className="sticky inset-x-0 bottom-8">
                            <div className="flex justify-center items-center p-2 text-2xl font-bold space-x-4">
                                <img onClick={() => {
                                    window.open('https://discord.gg/9bt7uqGuJS', '_blank')
                                }} src={discord} alt="" className="w-8 h-8 object-contain cursor-pointer" />
                                <img onClick={() => {
                                    window.open('https://www.notion.so/socialmoney/Loopss-15a3634708754d729b345f386d80dc9d', '_blank')
                                }} src={notion} alt="" className="w-8 h-8 object-contain cursor-pointer" />
                            </div>
                        </section>
                    </footer> */}
                </div>
            </BrowserRouter>
        </>

    );
}
