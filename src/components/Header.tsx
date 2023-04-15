import { LanguageIcon } from '@heroicons/react/24/outline';
import { ethers } from 'ethers';
import { useImperativeHandle, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import WalletButton from './WalletButton';

export interface IAppProps {
    clearData: () => void;
    onRef: any;
    provider: ethers.providers.Web3Provider
}

export default function Header(props: IAppProps) {

    const wallet = useRef<HTMLDivElement>(null);

    const [active, setActive] = useState(0);

    useImperativeHandle(props.onRef, () => {
        return {
            handleConnect: handleConnect,
        }
    })

    const clearData = () => {
        props.clearData();
    }

    const handleConnect = () => {
        // @ts-ignore
        wallet.current!.handleConnect();
    }

    const handlePage = (index: number) => {
        setActive(index);
    }

    return (
        <>
            <div className="flex items-center justify-start md:hidden mt-2 pl-2 space-x-2">
                <span className="text-xl font-bold">
                    |σ|
                </span>
            </div>
            <section className='flex justify-between items-center md:mt-4'>
                <div className="flex flex-col justify-center items-start">
                    <span className="text-xl font-bold hidden md:block">
                        |σ|
                    </span>
                    <span>
                        Public infrastructure by Nouns DAO
                    </span>
                    {/* <NavLink to='/' onClick={() => handlePage(0)} className={`cursor-pointer ${active === 0 ? 'underline' : ''}`}>Dashboard</NavLink>
                    <NavLink to='/graph' onClick={() => handlePage(1)} className={`cursor-pointer ${active === 1 ? 'underline' : ''}`}>Graph</NavLink>
                    <NavLink to='/events' onClick={() => handlePage(2)} className={`cursor-pointer ${active === 2 ? 'underline' : ''}`}>Events</NavLink>
                    <NavLink to='/tokens' onClick={() => handlePage(3)} className={`cursor-pointer ${active === 3 ? 'underline' : ''}`}>Send</NavLink> */}
                </div>
                <div className="flex items-center space-x-2 md:space-x-4">
                    <span className='font-bold'>FAQ</span>
                    <span>|</span>
                    <LanguageIcon className="w-6 h-6" />
                    <button className='min-w-[5.125rem] lg:min-w-button bg-zuzalu order-0 border-2 flex justify-center items-center outline-none px-2 lg:px-6 py-2 font-poppins font-bold text-sm lg:text-lg rounded-xl leading-[24px] hover:bg-gray-50 transition-all'>
                        Create a round
                    </button>
                    <WalletButton onRef={wallet} clearData={clearData} provider={props.provider} />
                </div>
            </section>
        </>

    );
}
