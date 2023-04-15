import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TransactionForm } from "./TransactionForm";
import { useContractFunction, useEthers, useTokenBalance } from "@usedapp/core";
import { utils } from "ethers";
import {
  AtSymbolIcon,
  CodeBracketIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

export interface IAppProps {
  showModal: boolean;
  changeInfoModal: () => void;
  claim: string;
  proof: string[];
}

const contractAddress = "0xA243FEB70BaCF6cD77431269e68135cf470051b4";
// const contract = new Contract(wethContractAddress, wethInterface)
const contract = null;

export default function InfoModal(props: IAppProps) {
  const { account } = useEthers();
  const tokenBalance = useTokenBalance(contractAddress, account);
  const { state, send } = useContractFunction(contract, "deposit", {
    transactionName: "Wrap",
  });

  const depositEther = (etherAmount: string) => {
    void send({ value: utils.parseEther(etherAmount) });
  };

  return (
    <Transition.Root show={props.showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-30 inset-0 overflow-y-auto"
        onClose={props.changeInfoModal}
      >
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
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
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
            <div className="relative inline-block align-bottom bg-[#19473F] rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-center">
                <div className="flex-1 mt-3 text-center sm:mt-0 sm:ml-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-300"
                  >
                    ZUZALU PASSPORT
                  </Dialog.Title>

                  <div className="mt-4">
                    <div className="flex justify-between">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        claim
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
                        value={props.claim}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="mt-10"></div>
                    {props.proof?.map((proof, index) => {
                      return (
                        <div className="mt-4">
                          <div className="flex justify-between">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-white"
                            >
                              Proof {index}
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
                              value={proof}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
  );
}
