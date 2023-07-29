import listing from "@/db/models/listing";
import { Listing } from "@/utils/types";
import { SetStateAction } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon } from "react-share";

interface props {
    listing: Listing | null;
    toggle: (val: boolean) => void;
    copyToClipboard: () => void;
}
export default function ShareModal({ listing, toggle, copyToClipboard }: props) {
    return (
        <>
            <div className="w-full h-full fixed backdrop-blur-sm space-x-4 space-y-4 shadow-lg z-50 top-0 flex flex-col items-center justify-center">
                <div className="bg-white shadow-lg rounded-md px-12 py-12 flex flex-row space-x-4">
                    <WhatsappShareButton url={`Check out the property at ${listing?.address} via this link: ${process.env.NEXT_PUBLIC_URI!}/${listing?.id}`}>
                        <WhatsappIcon className="rounded-md max-md:w-10 max-md:h-10" />
                    </WhatsappShareButton>
                    <FacebookShareButton url={`${process.env.NEXT_PUBLIC_URI!}/${listing?.id}`}>
                        <FacebookIcon className="rounded-md max-md:w-10 max-md:h-10" />
                    </FacebookShareButton>
                    <TelegramShareButton url={`Check out the property at ${listing?.address} via this link: ${process.env.NEXT_PUBLIC_URI!}/${listing?.id}`}>
                        <TelegramIcon className="rounded-md max-md:w-10 max-md:h-10" />
                    </TelegramShareButton>
                    <MdContentCopy className="rounded-md max-md:w-10 max-md:h-10 md:w-16 md:h-16" onClick={copyToClipboard} />
                </div>
                <div className="flex flex-row items-center justify-center">
                    <AiFillCloseCircle className="rounded-md max-md:w-10 max-md:h-10 md:w-16 md:h-16" onClick={() => toggle(false)} />
                </div>
            </div>
        </>
    )
}