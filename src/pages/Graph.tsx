import { ethers } from 'ethers';

interface IAppProps {
    provider: ethers.providers.Web3Provider
}

export default function Graph(props: IAppProps) {

    return (
        <>
            <div id="graph" className='absolute overflow-hidden left-0 mt-4 w-full h-[87vh]'></div>
        </>
    );
}
