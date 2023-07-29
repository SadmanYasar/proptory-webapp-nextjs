import { ListingDetailed } from "@/pages/listings/[id]";
import { useRouter } from "next/router";

interface CardProps {
    data: ListingDetailed;
}

const Card = ({ data: { id, name, address, price, description, bathrooms, bedrooms } }: CardProps) => {
    const router = useRouter();

    return (
        <>
            <div className='h-96 my-12 mx-8 shadow-lg rounded-md grid grid-rows-2' onClick={() => router.push(`/listings/${id}`)}>
                <div className="h-full relative rounded-t-md bg-pink-200">
                    <div className='h-full flex flex-col items-center justify-center'>
                        {address}
                    </div>
                </div>
                <div className='h-full flex flex-col mx-4 my-4 space-y-4 text-lg'>
                    <div className='text-2xl font-bold'>RM{price}</div>
                    <div className="w-[250px]">
                        <div className='truncate'>{name}</div>
                    </div>
                    <div className="w-[250px]">
                        <div className='truncate'>{description}</div>
                    </div>
                    <div className='flex flex-row space-x-10'>
                        <div>🛁 {bathrooms}</div>
                        <div>🛏️ {bedrooms}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;