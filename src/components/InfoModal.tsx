import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { TransactionForm } from './TransactionForm';
import { useContractFunction, useEthers, useTokenBalance } from '@usedapp/core';
import { utils } from 'ethers';
import { AtSymbolIcon, CodeBracketIcon, LinkIcon } from '@heroicons/react/24/outline';

export interface IAppProps {
    showModal: boolean
    changeInfoModal: () => void;
}

const contractAddress = '0xA243FEB70BaCF6cD77431269e68135cf470051b4'
// const contract = new Contract(wethContractAddress, wethInterface)
const contract = null;

export default function InfoModal(props: IAppProps) {

    const { account } = useEthers()
    const tokenBalance = useTokenBalance(contractAddress, account)
    const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })

    const depositEther = (etherAmount: string) => {
        void send({ value: utils.parseEther(etherAmount) })
    }


    return (
        <Transition.Root show={props.showModal} as={Fragment}>
            <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto" onClose={props.changeInfoModal}>
                <div className="flex sm:items-end items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 mask transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-black border-solid border-2 border-info-modal rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-center">
                                <div className="flex-1 mt-3 text-center sm:mt-0 sm:ml-4">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-300">
                                        Creating your proposal
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <div className='flex items-center space-x-2'>
                                            <div className='w-[75%]'>
                                                <div className="flex justify-between">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                                        Title
                                                    </label>
                                                </div>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        id="title"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Give your proposal a title"
                                                        aria-describedby="email-optional"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between">
                                                    <label htmlFor="eth" className="block text-sm font-medium leading-6 text-white">
                                                        Found Request
                                                    </label>
                                                </div>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="eth"
                                                        id="ETH"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="ETH"
                                                        aria-describedby="email-optional"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex justify-between">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                                Tldr
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="tldr"
                                                id="tldr"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="In a few words, what is your proposal about?"
                                                aria-describedby="email-optional"
                                            />
                                        </div>
                                    </div>

                                    <form action="#">
                                        <>
                                            <div className="w-full flex items-center space-x-5 mt-4">
                                                <div className="flex flex-1 justify-between">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                                        Title
                                                    </label>
                                                    <div className='flex space-x-2 items-center'>
                                                        <div className="flex items-center">
                                                            <button
                                                                type="button"
                                                                className="-m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                                                            >
                                                                <span className="sr-only">Insert link</span>
                                                                <LinkIcon className="h-5 w-5" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <button
                                                                type="button"
                                                                className="-m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                                                            >
                                                                <span className="sr-only">Insert code</span>
                                                                <CodeBracketIcon className="h-5 w-5" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <button
                                                                type="button"
                                                                className="-m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                                                            >
                                                                <span className="sr-only">Mention someone</span>
                                                                <AtSymbolIcon className="h-5 w-5" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <textarea
                                                    rows={5}
                                                    name="comment"
                                                    id="comment"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder=" What: What is your proposal about? 
                                                    Why: Why is it important? 
                                                    How: How will you achieve it?"
                                                    defaultValue={''}
                                                />
                                            </div>
                                        </>
                                        <div className="mt-2 flex justify-end">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center rounded-md bg-zuzalu px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                onClick={() => props.changeInfoModal()}
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:justify-center">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => props.changeInfoModal()}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}