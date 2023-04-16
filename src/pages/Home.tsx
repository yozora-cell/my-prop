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
import LOGO from "../assets/17_Create_a_logo.png";

import { Link } from "react-router-dom";

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
        // setTrustType(type);
    }

    /**
     * @description: clear data
     * @return {*}
     */
    const clearData = () => {
        // setDataType(0);
        // setHoldList([]);
        // setHolderList([]);
    }


    /**
     * @description: init trust data 
     * @return {*}
     */
    // const initData = async () => {
    //     if (account) {
    //         getTrust(account, 0).then((res: ITrust[]) => {
    //             setHolderList(res)
    //         }).catch(err => {
    //             console.log(err);
    //         });
    //         getTrust(account, 1).then((res: ITrust[]) => {
    //             setHoldList(res)
    //         }).catch(err => {
    //             console.log(err);
    //         });
    //     }
    // }


    // useEffect(() => {
    //     if (account) {
    //         if (!initFlag) {
    //             // initData();
    //             initFlag = true;
    //         }
    //         if (trustType === 0) {
    //             getTrust(account, 1).then(res => {
    //                 setHoldList(res)
    //                 if (res.length === 0) {
    //                     setDataType(2)
    //                 } else {
    //                     setDataType(1)
    //                 }
    //             }).catch(err => {
    //                 console.log(err);
    //             });
    //         }
    //         if (trustType === 1) {
    //             getTrust(account, 0).then(res => {
    //                 setHolderList(res)
    //                 if (res.length === 0) {
    //                     setDataType(2)
    //                 } else {
    //                     setDataType(1)
    //                 }
    //             }).catch(err => {
    //                 console.log(err);
    //             });
    //         }
    //     } else {
    //         setDataType(0)
    //     }
    // }, [account, trustType]);

    return (
        <div className="relative">
            <section className="w-full relative rounded-lg mt-4 flex space-x-4">
                {/* <div className="w-60 h-60 max-h-[25vh] bg-card bg-no-repeat bg-contain relative rounded-lg hidden md:block"></div> */}
                <img className="w-60 h-60 object-contain relative rounded-lg hidden md:block" src={LOGO} alt="profile" />
                <div className="flex flex-col items-start justify-start">
                    <div className="flex flex-1 justify-start items-center space-x-2">
                        <span className="text-2xl font-bold">Zuzu Oracle</span>
                    </div>
                    <div className="flex flex-1 justify-start items-center space-x-2 font-bold">
                        <span>2</span>
                        <span className="text-baseColor">Rounds</span>
                        <span>·</span>
                        <span>159</span>
                        <span className="text-baseColor">Proposals</span>
                    </div>
                    <span className="tracking-wide leading-6">
                        Zuzu is a community capital allocation model based on conviction voting, designed to be highly automated and trust-coordinated, providing a way to extend Zuzalu community capital to thousands of public goods.
                        {/* <a className="text-pink-500" href="https://twitter.com/thenounsquare" target="_blank" rel="noreferrer"> here</a> */}
                    </span>
                </div>
            </section>

            <section className="w-full relative mt-8 flex justify-between items-center">
                <div className="flex justify-start space-x-4">
                    <div onClick={() => handlePage(0)} className={` cursor-pointer flex items-center  ${active === 0 ? 'border-b-2 border-solid border-black' : 'text-gray-600'} `}>
                        <span>Active</span>
                        <div className="bg-gray-100 rounded-md">
                            <span className="py-1 px-2">2</span>
                        </div>
                    </div>
                    <div onClick={() => handlePage(3)} className={` cursor-pointer flex items-center  ${active === 3 ? 'border-b-2 border-solid border-black' : 'text-gray-600'} `}>
                        <span>All rounds</span>
                        <div className="bg-gray-100 rounded-md">
                            <span className="py-1 px-2">3</span>
                        </div>
                    </div>
                </div>
                <div className="max-w-[10rem] md:max-w-fit">
                    <div className="relative mt-2 flex items-center">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search rounds"
                            className="block w-full md:placeholder:text-base placeholder:text-sm bg-gray-200 rounded-lg border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 items-center">
                            <MagnifyingGlassIcon className="w-4 h-4 object-contain"></MagnifyingGlassIcon>
                        </div>
                    </div>
                </div>
            </section>

            {
                active === 3 ? (
                    <section className="w-full grid grid-cols-1 md:grid-cols-2 place-content-center gap-4 py-4">

                        <ProposalsCard
                            title="Establish a Zuzalu IRL community"
                            status={0}
                            description="Zuzalu supports the facilitation of more diverse global Zuzalu communities on a local level. We are seeking local hosts/teams to establish stable offline physical spaces for communities of 30-50 residents. Proposal applications for funding up to $200,000 are welcome."
                            funding="1,000,000 USD"
                            roundEnded="950,000"
                            proposals={6}
                        />

                        <ProposalsCard
                            title="Public Good Hack Festival"
                            status={1}
                            description="We will be hosting the Public Good Hack Festival next week, with a one-week preparation period for participants to submit a complete demo that is related to the Zuzalu community and public goods. The Zuzalu community residents will continuously support the best ideas!"
                            funding="100 ETH"
                            roundEnded="100 ETH"
                            proposals={10}
                        />

                        <ProposalsCard
                            title="Zuzalu Retro Grants"
                            status={0}
                            description="We are hosting the Retro Awards round, designed to recognize and reward outstanding Zuzalubuilders. Please note: to be eligible for retrospective awards, the project must have been completed within the last two months. The maximum allocation per proposal is 0.5 ETH."
                            funding="20 ETH"
                            roundEnded="3 ETH"
                            proposals={110}
                        />

                    </section>
                ) :
                    (
                        // <div className="w-full h-full min-h-[10rem] flex justify-center items-center text-3xl">
                        //     No rounds available
                        // </div>
                        <section className="w-full grid grid-cols-1 md:grid-cols-2 place-content-center gap-4 py-4">

                            <ProposalsCard
                                title="Establish a Zuzalu IRL community"
                                status={0}
                                description="Zuzalu supports the facilitation of more diverse global Zuzalu communities on a local level. We are seeking local hosts/teams to establish stable offline physical spaces for communities of 30-50 residents. Proposal applications for funding up to $200,000 are welcome."
                                funding="1,000,000 USD"
                                roundEnded="950,000"
                                proposals={6}
                            />


                            <ProposalsCard
                                title="Zuzalu Retro Grants"
                                status={0}
                                description="We are hosting the Retro Awards round, designed to recognize and reward outstanding Zuzalubuilders. Please note: to be eligible for retrospective awards, the project must have been completed within the last two months. The maximum allocation per proposal is 0.5 ETH."
                                funding="20 ETH"
                                roundEnded="3 ETH"
                                proposals={110}
                            />
                        </section>
                    )
            }
        </div>
    );
}

interface ProposalsCardProps {
    title: string;
    status: number;
    description: string;
    funding: string;
    roundEnded: string;
    proposals: number;
}

const ProposalsCard = ({ title, status, description, funding, roundEnded, proposals }: ProposalsCardProps) => {


    return (
        <Link to='/events'>
            <div className="flex flex-col p-2 space-y-4 border border-solid rounded-lg" >
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{title}</span>
                    {status === 0 ? (<span className="flex box-green">Active</span>) :
                        status === 1 ? (<span className="flex box-yellow">Pending</span>) : (<span className="flex box-gray">Ended</span>)}
                </div>
                <div className="text-box">
                    {description}
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col justify-start">
                        <span className="text-baseColor">Funding</span>
                        <div className="flex items-center space-x-2">
                            <span>{funding}</span>
                            {/* <span>x</span>
                            <span>5</span> */}
                        </div>
                    </div>
                    <div className="flex flex-col justify-start">
                        <span className="text-baseColor">Remaining Funding</span>
                        <span>{roundEnded}</span>
                    </div>
                    <div className="flex flex-col justify-start">
                        <span className="text-baseColor">Proposals</span>
                        <span>{proposals}</span>
                    </div>
                </div>
            </div>
        </Link>
    )

}
