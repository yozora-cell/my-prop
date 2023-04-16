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
import { card, spring, tokenIcon } from "../assets";

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
            <section className="w-full flex flex-col space-y-4 justify-start relative rounded-lg mt-4">
                {/* <div>
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
                </div> */}
                <p className="text-2xl font-bold">Establish a Zuzalu IRL community</p>
                <p className="break-words">Zuzalu supports the facilitation of more diverse global Zuzalu communities on a local level. We are seeking local hosts/teams to establish stable offline physical spaces for communities of 20-50 residents. Proposal applications for funding up to $200,000 are welcome.</p>
            </section>

            <section className="w-full flex flex-1 justify-start md:justify-end items-center mt-4 space-x-4 md:space-x-10 text-xs md:text-lg">
                <div className="flex flex-col justify-start">
                    <span className="text-purple-500">Remaining Funding</span>
                    <span>950,000 USD</span>
                </div>
                <div className="flex flex-col justify-start">
                    <span>Funding</span>
                    <div className="flex items-center md:space-x-2">
                        <span>1,000,000 USD</span>
                        {/* <span>x</span>
                        <span>5</span> */}
                    </div>
                </div>
                {/* <div className="flex flex-col justify-start">
                    <span>Snapshot</span>
                    <span>16900257</span>
                </div> */}
                <div className="flex flex-col justify-start">
                    <span>Proposals</span>
                    <span>6</span>
                </div>
            </section>

            <section className="w-full  justify-center mt-4 hidden md:flex">
                <div className="w-[75%] flex flex-col p-4 space-y-4">
                    <CardSection title="✨ Community Living for Artists in Tuscany, Italy" description="Community living for artists in Tuscany with art exhibitions, studios, and cultural exchange." image="https://zuzalu.city/49.png" address="17.eth " endedTime="1 days ago" current="15%" atLeast="25%" />
                    <CardSection title="✨ Mountain Top Community Living in the Andes of Peru" description="Peru: Mountain top community living in the Andes with outdoor activities and ecotourism." image="https://zuzalu.city/49.png" address="17.eth" endedTime="1 days ago" current="25%" atLeast="50%" />
                    <CardSection title="✨ Co-living Space for Digital Nomads in Bali, Indonesia" description="Co-living space for digital nomads in Bali with high-speed wireless network and innovation." image="https://zuzalu.city/49.png" address="17.eth" endedTime="1 days ago" current="20%" atLeast="25%" />
                    <CardSection title="✨ Eco-Village in Dali, Yunnan Province, China" description="Establish an eco-village in Dali, China with off-grid living, sustainable agriculture, and educational programs focused on environmental protection and sustainability." image="https://zuzalu.city/49.png" address="17.eth" endedTime="13 days ago" current="45%" atLeast="55%" />
                    <CardSection title="✨ Community Living in Ghana" description="Establish a communal living space in Ghana with shared economy, self-sufficiency, and educational programs focused on intentional living and community building." image="https://zuzalu.city/49.png" address="17.eth" endedTime="1 days ago" current="50%" atLeast="60%" />
                    <CardSection title="✨ Flux Democracy Community in Georgia" description="A unique community with communal living, shared economy, and Flux Democracy governance model, promoting democratic participation and community building." image="https://zuzalu.city/49.png" address="17.eth" endedTime="1 days ago" current="55%" atLeast="85%" />
                </div>
                <div className="w-[25%] p-4">
                    <div className="p-4 rounded-lg border border-solid border-gray-300">
                        <div className="flex space-x-4">
                            <div className="rounded-full border border-solid border-gray-300 w-11 h-11 flex justify-center items-center">
                                <svg className="w-6 h-6" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19a2 2 0 002-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66a.996.996 0 000 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36a.996.996 0 000-1.41L14.16 2.3a.975.975 0 00-1.4-.01z"></path></svg>
                            </div>
                            <div className="flex flex-col justify-start">
                                <span>Voting ended</span>
                                <span className="text-baseColor">21 votes cast for 39 props!</span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-baseColor">Winners are highlighted in green.</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full justify-center py-4 flex flex-col md:hidden space-y-4">
                <div className="p-4 rounded-lg border border-solid border-gray-300">
                    <div className="flex space-x-4">
                        <div className="rounded-full border border-solid border-gray-300 w-11 h-11 flex justify-center items-center">
                            <svg className="w-6 h-6" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19a2 2 0 002-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66a.996.996 0 000 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36a.996.996 0 000-1.41L14.16 2.3a.975.975 0 00-1.4-.01z"></path></svg>
                        </div>
                        <div className="flex flex-col justify-start">
                            <span>Voting ended</span>
                            <span className="text-baseColor">21 votes cast for 39 props!</span>
                        </div>
                    </div>
                    <div className="mt-2">
                        <span className="text-baseColor">Winners are highlighted in green.</span>
                    </div>
                </div>
                <CardSection title="✨ Community Living for Artists in Tuscany, Italy" description="Community living for artists in Tuscany with art exhibitions, studios, and cultural exchange." image="https://zuzalu.city/49.png" address="17.eth " endedTime="1 days ago" current="15%" atLeast="25%" />
                <CardSection title="✨ Mountain Top Community Living in the Andes of Peru" description="Peru: Mountain top community living in the Andes with outdoor activities and ecotourism." image="https://zuzalu.city/49.png" address="17.eth" endedTime="1 days ago" current="25%" atLeast="50%" />
                <CardSection title="✨ Co-living Space for Digital Nomads in Bali, Indonesia" description="Co-living space for digital nomads in Bali with high-speed wireless network and innovation." image="https://zuzalu.city/49.png" address="17.eth" endedTime="1 days ago" current="20%" atLeast="25%" />
                <CardSection title="✨ Eco-Village in Dali, Yunnan Province, China" description="Establish an eco-village in Dali, China with off-grid living, sustainable agriculture, and educational programs focused on environmental protection and sustainability." image="https://zuzalu.city/49.png" address="17.eth" endedTime="13 days ago" current="45%" atLeast="55%" />
                <CardSection title="✨ Community Living in Ghana" description="Establish a communal living space in Ghana with shared economy, self-sufficiency, and educational programs focused on intentional living and community building." image="https://zuzalu.city/49.png" address="17.eth" endedTime="1 days ago" current="50%" atLeast="60%" />
                <CardSection title="✨ Flux Democracy Community in Georgia" description="A unique community with communal living, shared economy, and Flux Democracy governance model, promoting democratic participation and community building." image="https://zuzalu.city/49.png" address="17.eth" endedTime="1 days ago" current="55%" atLeast="85%" />
            </section>
        </div>
    );
}

interface CardSectionProps {
    title: string;
    description: string;
    image: string;
    address: string;
    endedTime: string;
    current: string;
    atLeast: string;
}

const CardSection = ({ title, description, image, address, endedTime, current, atLeast }: CardSectionProps) => {

    return (
        <>
            <div className="md:flex flex-col p-2 bg-white border border-solid border-green-300 rounded-lg text-base md:text-lg hidden">
                <div className="flex justify-between">
                    <div className="flex flex-col space-y-4">
                        <div>
                            <span className="text-base md:text-2xl text-green-300">{title}</span>
                        </div>
                        <div className="text-box">
                            {description}
                        </div>
                    </div>
                    <div className="w-[7.5rem] h-[7.5rem] rounded-md">
                        <img crossOrigin="anonymous" className="w-full h-full object-contain" src={image} alt="" />
                    </div>
                </div>

                <span className="bg-[#f5f5f5] w-full h-[.0625rem] opacity-50 my-2"></span>

                <div className="flex justify-between items-center py-4">
                    <div className="flex justify-start items-center space-x-2">
                        <div className="border border-solid border-gray-300 rounded-full w-5 h-5">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" height="20" width="20"><rect x="0" y="0" rx="0" ry="0" height="20" width="20" transform="translate(0.08174120677913385 -2.6252029314959056) rotate(284.2 10 10)" fill="#c71423"></rect><rect x="0" y="0" rx="0" ry="0" height="20" width="20" transform="translate(7.664690804035856 9.651401246919585) rotate(179.5 10 10)" fill="#f77801"></rect><rect x="0" y="0" rx="0" ry="0" height="20" width="20" transform="translate(0.9116606157691695 -17.004470969742144) rotate(416.5 10 10)" fill="#01678c"></rect><rect x="0" y="0" rx="0" ry="0" height="20" width="20" transform="translate(-17.726298208504716 -15.136064785798045) rotate(297.2 10 10)" fill="#1566f2"></rect></svg>
                        </div>
                        <span>{address}</span>
                        <span>·</span>
                        <span>{endedTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {/* <div className="w-5 h-5 flex justify-center items-center">
                        <svg className="w-5 h-5" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19a2 2 0 002-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66a.996.996 0 000 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36a.996.996 0 000-1.41L14.16 2.3a.975.975 0 00-1.4-.01z"></path></svg>
                    </div> */}
                        {/* <span>{proposals}</span> */}
                        <span className="text-green-300">PROGRESS</span>

                        <div className="flex-1 min-w-[15rem] max-w-[50rem] process-box w-ff relative">
                            <div className={`process-0 w-[14%]`}></div>
                            <div className={`process-1 w-[26%]`}></div>
                            <div className="mt-4">
                                <span className="text-black">6.88% of the Total Support</span>
                                <span className="text-baseColor">(at least 13% needed)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:hidden flex flex-col space-y-4 p-2 bg-white border border-solid border-green-300 rounded-lg text-base md:text-lg ">
                <div>
                    <span className="text-base md:text-2xl font-bold text-green-300">{title}</span>
                </div>
                <div className="text-box">
                    {description}
                </div>
                <div className="w-full h-[7.5rem] rounded-md">
                    <img crossOrigin="anonymous" className="w-full h-full object-contain" src={image} alt="" />
                </div>
                <div className="flex justify-start items-center space-x-2">
                    <div className="border border-solid border-gray-300 rounded-full w-5 h-5">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" height="20" width="20"><rect x="0" y="0" rx="0" ry="0" height="20" width="20" transform="translate(0.08174120677913385 -2.6252029314959056) rotate(284.2 10 10)" fill="#c71423"></rect><rect x="0" y="0" rx="0" ry="0" height="20" width="20" transform="translate(7.664690804035856 9.651401246919585) rotate(179.5 10 10)" fill="#f77801"></rect><rect x="0" y="0" rx="0" ry="0" height="20" width="20" transform="translate(0.9116606157691695 -17.004470969742144) rotate(416.5 10 10)" fill="#01678c"></rect><rect x="0" y="0" rx="0" ry="0" height="20" width="20" transform="translate(-17.726298208504716 -15.136064785798045) rotate(297.2 10 10)" fill="#1566f2"></rect></svg>
                    </div>
                    <span>{address}</span>
                    <span>·</span>
                    <span>{endedTime}</span>
                </div>
                <span className="text-green-300 text-sm">PROGRESS</span>
                <div className="flex items-center space-x-2">
                    <div className="flex-1 min-w-[15rem] max-w-[50rem] process-box w-ff relative">
                        <div className={`process-0 w-[14%]`}></div>
                        <div className={`process-1 w-[26%]`}></div>
                    </div>
                </div>
                <div className="mt-4 text-sm">
                    <span className="text-black">6.88% of the Total Support</span>
                    <span className="text-baseColor">(at least 13% needed)</span>
                </div>
            </div>
        </>


    )
}
