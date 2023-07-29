import { useStateValue, setSearch } from "@/state";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Filters from "./filter";

export default function SearchBar() {
    const [{ query: { searchVal, maxPrice, minPrice } }, dispatch] = useStateValue();
    const [search, setSearchVal] = useState(searchVal);
    const [clicked, setClicked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (searchVal !== search) {
            setSearchVal(searchVal);
        }
    }, [searchVal])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchVal(value);
    }

    const handleClick = () => {
        setClicked(true);
        dispatch(setSearch(search.trim()));

        router.push({
            pathname: '/listings',
            query: {
                page: 1,
                search,
                maxPrice,
                minPrice
            }
        }).then(() => {
            setTimeout(() => {
                setClicked(false);
            }, 1000);
        });
        // if (search.length < 5) {
        //     return dispatch(setSearch(''));
        // }
    }

    return (
        //should be replaced later when login feature is required
        // <div className='flex flex-col w-full max-md:py-4 max-md:w-full md:w-6/12 xl:w-4/12'>
        <div className='flex flex-col w-full max-md:py-4 max-md:w-full'>
            <div className='flex flex-row justify-around'>
                <input className='placeholder:text-slate-400 max-md:placeholder:text-sm block bg-white w-full border border-slate-300 rounded-l-xl py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-slate-400 focus:ring-1 sm:text-sm text-slate-800'
                    placeholder='Type location to search'
                    type='text'
                    name='search'
                    value={search}
                    onChange={onChange}
                    data-cy='search-input'
                />
                <button onClick={handleClick} disabled={clicked} className='py-2 px-2 text-white bg-black rounded-r-xl hover:bg-slate-800 transition duration-150 ease-in-out'>
                    {clicked ? 'Searching...' : 'Search'}
                </button>
            </div>
            <Filters />
        </div>
    )
}