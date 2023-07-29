import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TelegramIcon, TelegramShareButton, WhatsappShareButton } from "react-share";
import FacebookIcon from "react-share/lib/FacebookIcon";
import FacebookShareButton from "react-share/lib/FacebookShareButton";
import WhatsappIcon from "react-share/lib/WhatsappIcon";
import { MdContentCopy } from "react-icons/md"
import { AiFillCloseCircle } from "react-icons/ai"
import { BsShareFill } from "react-icons/bs"
import Link from "next/link";
import ShareModal from "@/components/shareModal";

export interface ListingDetailed {
    id: string;
    name: string;
    description: string;
    address: string;
    bathrooms: number;
    bedrooms: number;
    matterportId: string;
    price: number;
    agentContact: string;
}

export default function Listing() {
    const [show, setShow] = useState(false);
    const [listing, setListing] = useState<ListingDetailed | null>(null);
    const [agentId, setAgentId] = useState<string | null>(null);
    const router = useRouter();
    const { id } = router.query;
    const contentType = 'application/json';

    useEffect(() => {
        const loadListing = async () => {
            if (!router.isReady) return;
            try {
                const response = await fetch(`/api/listings/${id}`, {
                    method: 'GET',
                    headers: {
                        Accept: contentType,
                        'Content-Type': contentType,
                    },
                })
                const jsonResponse = await response.json();

                if (!response.ok) {
                    throw new Error(jsonResponse.error);
                }

                setListing(jsonResponse.data.listing);
                setAgentId(jsonResponse.data.agent);
            } catch (error) {
                router.push('/');
            }
        }

        loadListing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady])

    const handleClick = (val: boolean) => {
        setShow(val);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`Check out the property at ${listing?.address} via this link: ${process.env.NEXT_PUBLIC_URI!}/${id}`);
    }

    const sendMessage = () => {
        // Regex expression to remove all characters which are NOT alphanumeric
        let number = listing?.agentContact?.replace(/[^\w\s]/gi, "").replace(/ /g, "");

        // Appending the phone number to the URL
        let url = `https://api.whatsapp.com/send/?phone=${number}`;

        // Appending the message to the URL by encoding it
        url += `&text=${encodeURI(`I am interested in: ${listing?.address} RM${listing?.price} ${process.env.NEXT_PUBLIC_URI!}/${id} Thanks`)}&app_absent=0`;

        // Open our newly created URL in a new tab to send the message
        window.open(url);
    }

    return (
        <>
            <Head>
                <title>Proptory listing</title>
            </Head>
            <div className="w-full px-4 pt-4 grid md:grid-cols-2 max-md:grid-cols-1">
                <div className="bg-red-200 h-96 text-2xl text-slate-500">{listing?.address}</div>
                <div className="flex flex-col space-x-8 space-y-4 px-4 py-4 bg-red-50">
                    <div className="flex flex-row space-x-8 justify-between px-4 py-4 bg-red-50">
                        <div className="flex flex-row space-x-8">
                            <BsShareFill className="max-md:w-10 max-md:h-10 md:w-12 md:h-12" onClick={() => setShow(true)} />
                            <WhatsappIcon className="max-md:w-10 max-md:h-10 md:w-12 md:h-12 rounded-md" onClick={sendMessage} />
                        </div>
                        <div className="text-lg font-bold text-pink-650">
                            <Link href={`/listings/view3d/${listing?.matterportId}`} className="">View in 3D</Link>
                        </div>
                    </div>
                    <div className="text-2xl font-bold">{listing?.name}</div>
                    <div className="text-xl break-words">{listing?.description}</div>
                    <div className="text-lg font-bold text-pink-650">
                        {agentId && <Link href={`/agents/${agentId}`} className="">Agent Details</Link>}
                    </div>
                    <div className="text-xl">🛁 {listing?.bathrooms}</div>
                    <div className="text-xl">🛏️ {listing?.bedrooms}</div>
                    <div className="text-4xl font-bold text-right">RM{listing?.price}</div>
                </div>
            </div>
            {show && <ShareModal listing={listing} toggle={handleClick} copyToClipboard={copyToClipboard} />}
        </>
    )
}