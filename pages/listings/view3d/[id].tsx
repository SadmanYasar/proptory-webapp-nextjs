/* eslint-disable @next/next/no-img-element */
import ShareModal from '@/components/shareModal';
import connectDb from '@/db/connectDb';
import Agent from '@/db/models/agent';
import ListingModel from '@/db/models/listing';
import { Listing as ListingType } from '@/utils/types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import logo from '../../../public/logo_proptory/icon_only/color_with_background.jpg';
import { IoIosCall } from 'react-icons/io';
import { WhatsappIcon } from 'react-share';

interface ListingAgent extends ListingType {
    agentName: string;
}

export default function Listing({ data: listing }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const { id } = router.query;
    const [show, setShow] = useState(false);

    const sendMessage = () => {
        // Regex expression to remove all characters which are NOT alphanumeric
        let number = listing?.agentContact?.replace(/[^\w\s]/gi, '').replace(/ /g, '');

        // Appending the phone number to the URL
        let url = `https://api.whatsapp.com/send/?phone=${number}`;

        // Appending the message to the URL by encoding it
        url += `&text=${encodeURI(`I am interested in: ${listing?.address} RM${listing?.price} ${process.env.NEXT_PUBLIC_URI!}/${listing?.id} Thanks`)}&app_absent=0`;

        // Open our newly created URL in a new tab to send the message
        window.open(url);
    }
    return (
        <>
            <Head>
                <title>Proptory listing 3D view</title>
            </Head>
            <div className='fixed top-0 left-0 w-full h-full overflow-hidden'>
                <nav className='flex items-center justify-between w-full fixed top-0 left-0 text-white'>
                    <button onClick={() => setShow(true)} className='flex items-center p-4 mx-8 mt-4 bg-black bg-opacity-20 rounded-xl'>
                        <div className='mr-4'>
                            {listing?.agentName}
                        </div>
                        <div className='mr-4 pl-2 flex flex-row justify-between items-center'>
                            <IoIosCall />
                            {listing?.agentContact}
                        </div>
                    </button>
                    {show &&
                        <div className="w-full h-full fixed shadow-lg z-50 top-0 flex flex-col items-center justify-center p-4">
                            <div className="max-md:w-full md:w-2/6 bg-white shadow-2xl px-4 py-4 space-y-4 rounded-md overflow-auto flex flex-col">
                                <div className='flex flex-col space-y-4'>
                                    <button onClick={() => setShow(false)} className='text-right'>❌</button>
                                    <div className='font-bold text-2xl pb-4 text-black border-b border-b-gray-200'>{listing?.agentName}</div>
                                    <div className='flex flex-row justify-center space-x-8'>
                                        <button>
                                            <IoIosCall className="max-md:w-10 max-md:h-10 md:w-12 md:h-12 rounded-md bg-blue-500 p-2" onClick={() => window.open(`tel:${listing?.agentContact}`)} />
                                        </button>
                                        <button>
                                            <WhatsappIcon className="max-md:w-10 max-md:h-10 md:w-12 md:h-12 rounded-md" onClick={sendMessage} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    <div>
                        <img
                            referrerPolicy='no-referrer'
                            className='w-12 h-12 mr-8 mt-4'
                            src={logo.src}
                            alt='avatar'
                        />
                    </div>
                </nav>
                <iframe
                    className='w-full h-full aspect-video border-0'
                    src={`https://my.matterport.com/show/?m=${id}`}
                    allowFullScreen
                ></iframe>
            </div>

            {/* <div className='w-full h-full z-50 fixed top-0 flex flex-row items-center justify-center'>
                <iframe
                    className='w-full h-full aspect-video border-0'
                    src={`https://my.matterport.com/show/?m=${id}`}
                    allowFullScreen
                ></iframe>
            </div> */}
        </>
    )
}

export const getServerSideProps: GetServerSideProps<{ data: ListingAgent | null }> = async ({ query }) => {
    const { id } = query;
    await connectDb();

    const foundListing: ListingAgent | null = await ListingModel.findOne({ matterportId: id });
    const foundAgent = await Agent.findOne({ phone: foundListing?.agentContact });

    const listingData = foundListing ? foundListing.toJSON() : null;
    const agentData = foundAgent ? foundAgent.toJSON() : null;
    // console.log(agentData);

    if (!listingData) {
        return {
            props: {
                data: null
            }
        }
    }

    const data = {
        ...listingData,
        ...(agentData?.fullname) && { agentName: agentData.fullname }
    }

    // console.log(data);

    return {
        props: {
            data: data,
        },
    };
}