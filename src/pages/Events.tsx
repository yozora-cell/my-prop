import { DocumentDuplicateIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useEthers, useTokenBalance } from "@usedapp/core";
import copy from "copy-to-clipboard";
import { ethers } from "ethers";
import Ens from "../components/Ens";
import { CONTRACT_ADDRESS } from "../constants/config";
import { notification } from "../components/Notiofication";
import detectEthereumProvider from '@metamask/detect-provider'
import Select from "../components/Select";
import EventEditor from "../components/EventEditor";
import { useEffect, useState } from "react";
import EventDetail from "../components/EventDetail";
import { getEventDetail, getEventList } from "../config/api";
import dayjs from "dayjs";
import { card, spring, tokenIcon } from "../asserts";

interface IAppProps {
    provider: ethers.providers.Web3Provider
}

interface IEvent {
    atAmount: number,
    deadline: number,
    name: string,
    id: number,
}

const params = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Avilable Sign Up' },
    { id: 2, name: 'Stop Sign Up' }
]

let eventDetail: any = null;

export default function Events(props: IAppProps) {

    const { account } = useEthers();

    const stakingBalance = useTokenBalance(CONTRACT_ADDRESS, account)

    const [showInfoModal, setShowInfoModal] = useState(false);

    const [showDtailModal, setShowDtailModal] = useState(false);

    const [selected, setSelected] = useState(0);

    const [eventList, setEventList] = useState<IEvent[]>([])

    const [iAmIn, setIAmIn] = useState(false)

    const [iCreated, setICreated] = useState(false)

    const changeInfoModal = () => {
        setShowInfoModal(!showInfoModal);
    };

    const changeDetailModal = () => {
        setShowDtailModal(!showDtailModal);
    };

    const handleDetailModal = (id: number) => {
        // fetch data
        getEventDetail(id).then(res => {
            eventDetail = res;
            setShowDtailModal(!showDtailModal);
        }).catch(err => {
            console.log('err: ', err);
        })
    }


    /**
    * @description: detect wallet 
    * @param {any} provider provider
    * @return {*}
    */
    const delectWallet = (provider: any): boolean => {
        if (provider) {
            if (provider !== window.ethereum) {
                notification("Do you have multiple wallets installed?");
                return false;
            } else {
                // 优先级更高
                if (provider.isMathWallet) {
                    console.log('Ready to connect to MathWallet.');
                    return true;
                }
                if (provider.isMetaMask) {
                    console.log('Ready to connect to MetaMask.');
                    return true;
                }
                notification("Please install MetaMask!");
                return false;
            }
        } else {
            notification("Please install MetaMask!");
            return false;
        }
    }

    /**
    * @description: add token 
    * @return {*}
    */
    const handleAddToken = async () => {
        if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
            notification("Please add 0xB1aC1c0f2E7E467f10Df232E82CC65e2CA4Cb0d2 to your mobile wallet", 'top-center', 3)
            return
        }
        const provider: any = await detectEthereumProvider()
        if (delectWallet(provider)) {
            if (account) {
                provider.sendAsync({
                    method: 'metamask_watchAsset',
                    params: {
                        "type": "ERC20",
                        "options": {
                            "address": "0xB1aC1c0f2E7E467f10Df232E82CC65e2CA4Cb0d2",
                            "symbol": "Loopss.me",
                            "decimals": 18,
                            "image": tokenIcon,
                        },
                    },
                    id: Math.round(Math.random() * 100000),
                }, (err: any, added: any) => {
                    if (err || 'error' in added) {
                        notification("There was a problem adding the token.")
                        console.error(err);
                        return
                    }
                    notification("Token added!", "1")
                })
            } else {
                notification("Please connect your wallet first")
            }
        }
    }

    useEffect(() => {
        // getEventList(selected, iCreated ? account : undefined, iAmIn ? account : undefined).then(res => {
        //     setEventList(res)
        // })
    }, [selected, iAmIn, iCreated, account])


    return (
        <div>
            <section className="w-full flex flex-col justify-start relative rounded-lg mt-4">
                <div>
                    <span className="group block flex-shrink-0">
                        <div className="flex items-center">
                            <div>
                                <img
                                    className="inline-block h-9 w-9 rounded-full"
                                    src="https://addressform-image-prod.s3.us-east-2.amazonaws.com/6f7d22fe31ea47f8a2a2414a9856aefb/nouny%2520clock%2520logo%2520yellow%2520copy.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">The Noun Square</p>
                                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                            </div>
                        </div>
                    </span>
                </div>
                <div className="text-pink-500">
                    <span>Mar 28, 2023 - Apr 4, 2023</span>
                </div>
                <p>Hack Week Content Creation Challenge</p>
                <p className="break-words">As part of Nouns Hack Week, The Noun Square is hosting a 1-week Content Creation Challenge. We are seeking any kind of engaging Nounish content ideas: Short animations, YouTube or TikTok videos, Thoughtful Twitter threads, interesting Medium articles, etc... Any kind of Nounish content can be submitted for consideration. TNS Core Team and Nouncillors will vote together for the winners. Happy Hacking!</p>
            </section>

            <section className="w-full flex flex-1 justify-end items-center mt-2 space-x-10">
                <div className="flex flex-col justify-start">
                    <span className="text-purple-500">Round ended</span>
                    <span>4 days ago</span>
                </div>
                <div className="flex flex-col justify-start">
                    <span>Funding</span>
                    <div className="flex items-center space-x-2">
                        <span>0.40 ETH</span>
                        <span>x</span>
                        <span>5</span>
                    </div>
                </div>
                <div className="flex flex-col justify-start">
                    <span>Snapshot</span>
                    <span>16900257</span>
                </div>
                <div className="flex flex-col justify-start">
                    <span>Proposals</span>
                    <span>39</span>
                </div>
            </section>

            <section className="w-full flex justify-center items-center mt-4 bg-gray-400">
                <div className="w-[75%] flex flex-col space-y-4">

                </div>
                <div className="w-[25%]">
                    <div className="p-4 rounded-lg border border-solid border-gray-300">
                        <div className="flex space-x-4">
                            <div className="rounded-full border border-solid border-gray-300 w-11 h-11 flex justify-center items-center">
                                <svg className="w-6 h-6" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19a2 2 0 002-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66a.996.996 0 000 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36a.996.996 0 000-1.41L14.16 2.3a.975.975 0 00-1.4-.01z"></path></svg>
                            </div>
                            <div className="flex flex-col justify-start">
                                <span>Voting ended</span>
                                <span>21 votes cast for 39 props!</span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <span>Winners are highlighted in green.</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

const cardSection = () => {

    return (
        <div className="flex flex-col p-2 space-y-4 border border-solid rounded-lg" >
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Hack Week Content Creation Challenge</span>
                <div className="bg-gray-100 rounded-md">
                    <span className="py-1 px-2">Eeded</span>
                </div>
            </div>
            <div className="text-box">
                As part of Nouns Hack Week, The Noun Square is hosting a 1-week Content Creation Challenge. We
                are seeking any kind of engaging Nounish content ideas: Short animations, YouTube or TikTok videos,
                Thoughtful Twitter threads, interesting Medium articles, etc... Any kind of Nounish content can be
                submitted for consideration. TNS Core Team and Nouncillors will vote together for the winners. Happy Hacking!
            </div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col justify-start">
                    <span>Funding</span>
                    <div className="flex items-center space-x-2">
                        <span>0.40 ETH</span>
                        <span>x</span>
                        <span>5</span>
                    </div>
                </div>
                <div className="flex flex-col justify-start">
                    <span>Round ended</span>
                    <span>4 days ago</span>
                </div>
                <div className="flex flex-col justify-start">
                    <span>Proposals</span>
                    <span>39</span>
                </div>
            </div>
        </div>
    )
}
