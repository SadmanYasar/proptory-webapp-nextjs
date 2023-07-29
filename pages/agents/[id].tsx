/* eslint-disable @next/next/no-img-element */
import { setNotification, useStateValue } from '@/state';
import { getFromStorage } from '@/utils/storage';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ListingDetailed } from '../listings/[id]';
import useSWR from 'swr';
import Agent from '@/db/models/agent';
import { fetcher } from '@/utils/fetcher';
import Card from '@/components/card';
import AddListingModal from '@/components/add_listing_modal';

export interface Agent {
    data: Data;
}

interface Data {
    agent: {
        fullname: string;
        id: string;
        phone: string;
        username: string;
    }
    listings: ListingDetailed[];
}

export default function AgentProfile() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [{ }, dispatch] = useStateValue();
    const router = useRouter();
    const { id } = router.query;
    const { data: response, error, mutate } = useSWR<Agent | null>(id ? `/api/agents/${id}` : null, id ? fetcher : null);
    const contentType = 'application/json';

    useEffect(() => {
        const token = getFromStorage('proptory-token');
        const userId = getFromStorage('proptory-user');
        if (token && userId && userId === id) {
            setLoggedIn(true);
        }
    }, [loggedIn, id]);

    const addListing = async (values: any) => {
        try {
            const postResponse = await fetch(`/api/agents/${getFromStorage('proptory-user')}`, {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                    Authorization: `Bearer ${getFromStorage('proptory-token')}`
                },
                body: JSON.stringify({
                    ...values
                })
            });

            // Throw error with status code in case Fetch API req failed
            const jsonResponse = await postResponse.json();
            if (!postResponse.ok) {
                throw new Error(jsonResponse.error);
            }

            response && mutate({
                ...response,
                data: {
                    ...response.data,
                    listings: [...response?.data.listings, jsonResponse]
                }
            });
            dispatch(setNotification({ message: `Successfully added ${values.name}`, type: 'success' }));
        } catch (error: any) {
            dispatch(setNotification({ message: 'Failed to add', type: 'error' }));
        }
    }

    if (error) return <p>Failed to load</p>
    if (!response) return <p>Loading...</p>

    return (
        <>
            <Head>
                <title>Agent Profile</title>
            </Head>
            <div className={`text-black text-3xl py-4 px-12 ${response?.data?.agent?.fullname ? '' : 'hidden'}`}>{`${response?.data?.agent?.fullname}'s listings`}</div>
            <div className='w-full grid lg:grid-cols-3 md:grid-cols-2'>
                {response?.data?.listings?.map((listing) =>
                    <Card key={listing.id} data={listing} />
                )}
            </div>
            {loggedIn && <AddListingModal addListing={addListing} />}
        </>
    )
}
