import { LanguageIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { ethers } from 'ethers';
import { useImperativeHandle, useRef, useState } from 'react';
import WalletButton from './WalletButton';
import WalletButton2 from './WalletButton_bak';
import InfoModal from './InfoModal';


export interface IAppProps {
    clearData: () => void;
    onRef: any;
    provider: ethers.providers.Web3Provider
}

export default function Header(props: IAppProps) {

    const wallet = useRef<HTMLDivElement>(null);

    const [active, setActive] = useState(0);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useImperativeHandle(props.onRef, () => {
        return {
            handleConnect: handleConnect,
        }
    })

    const clearData = () => {
        props.clearData();
    }

    const handleMenu = () => {
        setShow(!show);
    }

    const changeInfoModal = () => {
        setShowModal(!showModal);
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
            <div className="w-full flex items-center justify-between md:hidden mt-2 pl-2 space-x-2">
                <span className="text-xl font-bold ">
                    |σ|
                </span>
                <Bars3Icon onClick={handleMenu} className='w-6 h-6 object-contain'></Bars3Icon>
            </div>
            {
                show ?
                    (
                        <section className='w-full flex flex-col justify-center items-center space-y-4'>
                            <span className='font-bold'>FAQ</span>
                            <LanguageIcon className="w-6 h-6" />
                            <button onClick={changeInfoModal} className='w-full  bg-zuzalu order-0 border-2 flex justify-center items-center outline-none px-2 lg:px-6 py-2 font-poppins font-bold text-sm lg:text-lg rounded-xl leading-[24px] hover:bg-gray-50 transition-all'>
                                Create a round
                            </button>
                            <WalletButton onRef={wallet} clearData={clearData} provider={props.provider} />
                            <WalletButton2 onRef={wallet} clearData={clearData} provider={props.provider} />
                        </section>

                    )
                    : null
            }
            <section className='md:flex justify-between items-center md:mt-4 hidden'>
                <div className="flex flex-col justify-center items-start font-bold">
                    <span className="text-xl font-bold hidden md:block">
                        |σ|
                    </span>
                    <span>
                        Public infrastructure by Nouns DAO
                    </span>
                </div>
                <div className="flex items-center space-x-4">
                    <span className='font-bold'>FAQ</span>
                    <span>|</span>
                    <LanguageIcon className="w-12 h-full object-contain" />
                    <button onClick={changeInfoModal} className='w-full min-w-[5.125rem] lg:min-w-button bg-zuzalu order-0 border-2 flex justify-center items-center outline-none py-2 font-poppins font-bold text-sm lg:text-lg rounded-xl leading-[24px] hover:bg-gray-50 transition-all'>
                        Create a round
                    </button>
                    <WalletButton onRef={wallet} clearData={clearData} provider={props.provider} />
                    <WalletButton2 onRef={wallet} clearData={clearData} provider={props.provider} />
                </div>
            </section>

            <InfoModal showModal={showModal} changeInfoModal={changeInfoModal}></InfoModal>
        </>

    );
}
