import { useEffect, useState } from "react";
import { ListingDetailed } from "./[id]";
import useSWR from 'swr';
import { useRouter } from "next/router";
import { fetcher } from "@/utils/fetcher";
import Card from "@/components/card";
import { setQuery, setSearch, useStateValue } from "@/state";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

interface Pagination {
    pagination: {
        currentPage: number;
        count: number;
        pageCount: number;
    },
    items: ListingDetailed[];
}

export default function Listings({ data: { items, pagination: { count, currentPage, pageCount } } }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const [{ query: { searchVal, maxPrice, minPrice } }, dispatch] = useStateValue();

    useEffect(() => {
        // console.log(currentPage);
        const search = router.query.search as string || '';
        const minPrice = Number(router.query.minPrice);
        const maxPrice = Number(router.query.maxPrice);
        dispatch(setQuery({ searchVal: search, minPrice, maxPrice }));
    }, []);
    // const [page, setPage] = useState(1);
    // const [pageCount, setPageCount] = useState(0);
    // const { data: data, error } = useSWR<Pagination>(`/api/listings?page=${page}&search=${searchVal}`, fetcher);
    // const { data, error } = useSWR<Pagination>(`/api/listings?page=${page}&search=${(searchVal.length === 0 || searchVal.length > 5) ? searchVal : ''}`, fetcher);

    // useEffect(() => {
    //     if (data) {
    //         setPageCount(data.pagination.pageCount);
    //     }
    // }, [data]);

    function handlePrevious() {
        // setPage((p) => {
        //     if (p === 1) return p;
        //     return p - 1;
        // });
        if (currentPage === 1) return null;
        router.push({
            pathname: '/listings',
            query: {
                page: currentPage - 1,
                search: searchVal,
                maxPrice,
                minPrice
            }
        })
    }

    function handleNext() {
        // setPage((p) => {
        //     if (p === pageCount) return p;
        //     return p + 1;
        // });
        if (currentPage === pageCount) return null;
        router.push({
            pathname: '/listings',
            query: {
                page: currentPage + 1,
                search: searchVal,
                maxPrice,
                minPrice
            }
        })
    }

    // if (error) {
    //     return <div>{JSON.stringify(error)}</div>;
    // }

    if (!items) {
        return <p>No results found</p>;
    }

    return (
        <>
            <Head>
                <title>Listings</title>
                <meta name="description" content="Listings" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="md:text-3xl max-md:xl mx-12 py-4">{searchVal ? `Search Results on '${searchVal}'` : `${count} Total Listings`}</div>
            <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 max-md:grid-cols-1'>
                {items.map((item) => {
                    return (
                        <Card key={item.id} data={item} />
                    );
                })}
            </div>

            {pageCount ?
                <footer className="w-full flex flex-row items-center justify-center space-x-4 py-4 px-4 max-md:text-md md:text-xl">
                    <button disabled={currentPage === 1} onClick={handlePrevious}>
                        Previous
                    </button>
                    <div>
                        Page {currentPage} of {pageCount}
                    </div>
                    <button disabled={currentPage === pageCount} onClick={handleNext}>
                        Next
                    </button>
                </footer>
                : ''}
        </>
    );
}

export const getServerSideProps: GetServerSideProps<{ data: Pagination }> = async ({ query }) => {
    const search = query.search as string || '';
    const page = query.page || 1;
    const minPrice = query.minPrice;
    const maxPrice = query.maxPrice;

    const res = await fetch(`http://localhost:3000/api/listings?page=${page}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    const data: Pagination = await res.json();

    return {
        props: {
            data,
        },
    }
}