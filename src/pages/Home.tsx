import { useEthers, useTokenBalance } from "@usedapp/core";
import { useEffect, useImperativeHandle, useState } from "react";
import { DocumentDuplicateIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ethers } from "ethers";
import copy from "copy-to-clipboard";
import { notification } from "../components/Notiofication";
import { CONTRACT_ADDRESS } from "../constants/config";
import { getTrust } from "../config/api";
import EnsOffline from "../components/EnsOffline";
import Ens from "../components/Ens";
import { handleAddToken } from "../utils/web3utils"

import { card, spring, exchange, discord, notion } from "../asserts";
import { Link, NavLink } from "react-router-dom";

let initFlag = false;

interface IAppProps {
    handleConnect: () => void;
    onRef: any;
    provider: ethers.providers.Web3Provider
}

interface ITrust {
    fromAddress: string;
    toAddress: string;
    trustType: number;
    value: number;
    ens: string;
}

export default function Home(props: IAppProps) {

    const { account } = useEthers();

    const [dataType, setDataType] = useState(0);

    const [trustType, setTrustType] = useState(0);

    const [holdList, setHoldList] = useState<ITrust[]>([]);

    const [holderList, setHolderList] = useState<ITrust[]>([]);

    const [active, setActive] = useState(3);

    const stakingBalance = useTokenBalance(CONTRACT_ADDRESS, account)

    useImperativeHandle(props.onRef, () => {
        return {
            clearData: clearData,
        }
    })

    const handlePage = (index: number) => {
        setActive(index);
    }

    /**
     * @description:  connect wallet
     * @return {*}
     */
    const handleConnect = () => {
        props.handleConnect();
    }

    /**
     * @description: change data type
     * @param {number} type
     * @return {*}
     */
    const handleHold = async (type: number) => {
        setTrustType(type);
    }

    /**
     * @description: clear data
     * @return {*}
     */
    const clearData = () => {
        setDataType(0);
        setHoldList([]);
        setHolderList([]);
    }


    /**
     * @description: init trust data 
     * @return {*}
     */
    const initData = async () => {
        if (account) {
            getTrust(account, 0).then((res: ITrust[]) => {
                setHolderList(res)
            }).catch(err => {
                console.log(err);
            });
            getTrust(account, 1).then((res: ITrust[]) => {
                setHoldList(res)
            }).catch(err => {
                console.log(err);
            });
        }
    }


    useEffect(() => {
        if (account) {
            if (!initFlag) {
                // initData();
                initFlag = true;
            }
            if (trustType === 0) {
                getTrust(account, 1).then(res => {
                    setHoldList(res)
                    if (res.length === 0) {
                        setDataType(2)
                    } else {
                        setDataType(1)
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
            if (trustType === 1) {
                getTrust(account, 0).then(res => {
                    setHolderList(res)
                    if (res.length === 0) {
                        setDataType(2)
                    } else {
                        setDataType(1)
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        } else {
            setDataType(0)
        }
    }, [account, trustType]);

    return (
        <div className="relative">
            <section className="w-full relative rounded-lg mt-4 flex space-x-4">
                {/* <div className="w-60 h-60 max-h-[25vh] bg-card bg-no-repeat bg-contain relative rounded-lg hidden md:block"></div> */}
                <img className="w-60 h-60 object-contain relative rounded-lg hidden md:block" src="https://addressform-image-prod.s3.us-east-2.amazonaws.com/6f7d22fe31ea47f8a2a2414a9856aefb/nouny%2520clock%2520logo%2520yellow%2520copy.jpg" alt="" />
                <div className="flex flex-col items-start justify-start">
                    <div className="flex flex-1 justify-start items-center space-x-2">
                        <span className="text-2xl font-bold">The Noun Square House</span>
                        <span className="text-gray-500">|</span>
                        <span className="font-bold">0x7c2...911a</span>
                    </div>
                    <div className="flex flex-1 justify-start items-center space-x-2 font-bold">
                        <span>3</span>
                        <span className="text-baseColor">Rounds</span>
                        <span>·</span>
                        <span>102</span>
                        <span className="text-baseColor">Proposals</span>
                    </div>
                    <span className="tracking-wide leading-6">
                        At The Noun Square, we produce daily Nounish media including our flagship Noun O’ Clock Twitter Spaces. It is part of our mission to empower artists and builders from the community through creator contests and Prop House rounds. Learn more about The Noun Square
                        <a className="text-pink-500" href="https://twitter.com/thenounsquare" target="_blank" rel="noreferrer"> here</a>
                    </span>
                </div>
            </section>

            <section className="w-full relative mt-8 flex justify-between items-center">
                <div className="flex justify-start space-x-4">
                    {/* <NavLink to='/' onClick={() => handlePage(0)} className={``}> */}
                    <div onClick={() => handlePage(0)} className={` cursor-pointer flex items-center  ${active === 0 ? 'border-b-2 border-solid border-black' : 'text-gray-600'} `}>
                        <span>Active</span>
                        <div className="bg-gray-100 rounded-md">
                            <span className="py-1 px-2">0</span>
                        </div>
                    </div>
                    {/* </NavLink> */}
                    {/* <NavLink to='/tokens' onClick={() => handlePage(3)} className={``}> */}
                    <div onClick={() => handlePage(3)} className={` cursor-pointer flex items-center  ${active === 3 ? 'border-b-2 border-solid border-black' : 'text-gray-600'} `}>
                        <span>All rounds</span>
                        <div className="bg-gray-100 rounded-md">
                            <span className="py-1 px-2">3</span>
                        </div>
                    </div>
                    {/* </NavLink> */}
                </div>
                <div className="max-w-[10rem] md:max-w-fit">
                    <div className="relative mt-2 flex items-center">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search rounds"
                            className="block w-full bg-gray-200 rounded-lg border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 items-center">
                            <MagnifyingGlassIcon className="w-4 h-4 object-contain"></MagnifyingGlassIcon>
                        </div>
                    </div>
                </div>
            </section>

            {
                active === 3 ? (
                    <section className="w-full grid grid-cols-1 md:grid-cols-2 place-content-center gap-4 mt-4">
                        <Link to='/events'>
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
                                        <span className="text-baseColor">Funding</span>
                                        <div className="flex items-center space-x-2">
                                            <span>0.40 ETH</span>
                                            <span>x</span>
                                            <span>5</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <span className="text-baseColor">Round ended</span>
                                        <span>4 days ago</span>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <span className="text-baseColor">Proposals</span>
                                        <span>39</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to='/events'>
                            <div className="flex flex-col p-2 space-y-4 border border-solid rounded-lg" >
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold">Round 2</span>
                                    <div className="bg-gray-100 rounded-md">
                                        <span className="py-1 px-2">Eeded</span>
                                    </div>
                                </div>
                                <div className="text-box ">
                                    To complement our weekly art contests on The Noun Square, we are launching our second Prop House Round to fund ideas that will grow the TNS community and strengthen the platform we are building. Any ideas to help us Proliferate Nouns, improve our media offerings on YouTube & TikTok etc, or otherwise grow our audience, are welcome. Anyone with an ETH address can submit.
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col justify-start">
                                        <span className="text-baseColor">Funding</span>
                                        <div className="flex items-center space-x-2">
                                            <span>1 ETH</span>
                                            <span>x</span>
                                            <span>10</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <span className="text-baseColor">Round ended</span>
                                        <span>4 mos ago</span>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <span className="text-baseColor">Proposals</span>
                                        <span>28</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to='/events'>
                            <div className="flex flex-col p-2 space-y-4 border border-solid rounded-lg" >
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold">Round 1</span>
                                    <div className="bg-gray-100 rounded-md">
                                        <span className="py-1 px-2">Eeded</span>
                                    </div>
                                </div>
                                <div className="text-box ">
                                    To complement the art contests we have been hosting weekly on The Noun Square, we are launching our first Prop House Round to fund ideas that will grow the TNS community and strengthen the platform we are building together. Any ideas to help us Proliferate Nouns, improve our media offerings, grow our audience, etc. are welcome, and anyone with an ETH address can submit.
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col justify-start">
                                        <span className="text-baseColor">Funding</span>
                                        <div className="flex items-center space-x-2">
                                            <span>2 ETH</span>
                                            <span>x</span>
                                            <span>5</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <span className="text-baseColor">Round ended</span>
                                        <span>6 days ago</span>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <span className="text-baseColor">Proposals</span>
                                        <span>35</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </section>
                ) :
                    (
                        <div className="w-full h-full min-h-[10rem] flex justify-center items-center text-3xl">
                            No rounds available
                        </div>
                    )
            }
        </div>
    );
}
