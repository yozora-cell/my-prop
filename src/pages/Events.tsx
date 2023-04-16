interface IAppProps {
}

export default function Events(props: IAppProps) {

    return (
        <div>
            <section className="w-full flex flex-col space-y-4 justify-start relative rounded-lg mt-4">
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
                    </div>
                </div>
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
                                <span>Voting in process</span>
                                <span className="text-baseColor">3100 Zuzu cast so far!</span>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-col space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-baseColor">cast your zuzus</span>
                                <span className="text-baseColor">100 left</span>
                            </div>
                            <div className="rounded-lg h-4 bg-purple-500 opacity-50"></div>
                            <button className='w-full  bg-gray-300 order-0 border-2 flex justify-center items-center outline-none px-2 lg:px-6 py-2 font-poppins font-bold text-sm lg:text-lg rounded-xl leading-[24px] hover:bg-gray-50 transition-all'>
                                Submit Votes
                            </button>
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
                            <span>Voting in process</span>
                            <span className="text-baseColor">3100 Zuzu cast so far!</span>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-baseColor">cast your zuzus</span>
                            <span className="text-baseColor">100 left</span>
                        </div>
                        <div className="rounded-lg h-4 bg-purple-500 opacity-50"></div>
                        <button className='w-full  bg-gray-300 order-0 border-2 flex justify-center items-center outline-none px-2 lg:px-6 py-2 font-poppins font-bold text-sm lg:text-lg rounded-xl leading-[24px] hover:bg-gray-50 transition-all'>
                            Submit Votes
                        </button>
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
