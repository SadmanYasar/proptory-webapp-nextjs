/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useRouter } from 'next/router';
import logo from '../public/logo_proptory/icon_only/color_with_background.jpg';
import { login, logout, setPrice, setSearch, useStateValue } from '@/state';
import Notification from './notification';
import { getFromStorage } from '@/utils/storage';
import SearchBar from './searchBar';

const routesToFilter = [
    '/auth',
    '/listings/view3d/[id]'
]

export default function Nav() {
    // const [user, loading, error] = useAuthState(auth);
    const [toggled, setToggled] = useState(false);
    const [{ loggedIn }, dispatch] = useStateValue();
    const [clicked, setClicked] = useState(false);
    const router = useRouter();

    // console.log(router.asPath)
    // console.log(router.pathname)
    // console.log(router.basePath)

    useEffect(() => {
        if (getFromStorage('proptory-token') && getFromStorage('proptory-user')) {
            dispatch(login());
        } else {
            dispatch(logout());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // hide nav on auth screen
    if (routesToFilter.includes(router.asPath) || routesToFilter.includes(router.pathname)) {
        return null;
    }

    const handleClick = () => {
        dispatch(logout());
        router.push('/auth');
    }

    const changeRoute = () => {
        setClicked(true);

        dispatch(setSearch(''));
        dispatch(setPrice({
            maxPrice: 0,
            minPrice: 0
        }))
        router.push(`/listings?page=1`)
            .then(() => {
                setTimeout(() => {
                    setClicked(false);
                }, 1000);
            });
    }

    return (
        <div className='bg-pink-650 w-full sticky top-0 z-40'>
            <nav className='py-4 mx-14 text-white'>
                {/* Tablet/Desktop Navbar */}
                {/* Should replace it with this one after login is required */}
                {/* <div className='w-full max-md:hidden flex justify-between items-center'> */}
                <div className='w-full max-md:hidden grid grid-cols-3 gap-4'>
                    {!clicked && <img
                        referrerPolicy='no-referrer'
                        className='w-12 h-12'
                        src={logo.src}
                        alt='avatar'
                        onClick={changeRoute}
                    />}
                    {clicked && <img
                        referrerPolicy='no-referrer'
                        className='w-12 h-12'
                        src={logo.src}
                        alt='avatar'
                    />}
                    <SearchBar />
                    {/* AUTH NOT VISIBLE AT THIS STAGE */}
                    {/* <button onClick={handleClick} className={!loggedIn ? 'hover:bg-black py-2 px-2 transition duration-150 ease-in-out rounded-md' : 'hidden'}>
                        Login as agent
                    </button>
                    <div className={loggedIn ? 'flex flex-row space-x-4' : 'hidden'}>
                        <button onClick={() => router.push(`/agents/${getFromStorage('proptory-user')}`)}>Profile</button>
                        <button onClick={handleClick}>Logout</button>
                    </div> */}
                </div>

                {/*  Mobile Navbar */}
                <div className='w-full md:hidden flex justify-between items-center'>
                    {!clicked && <img
                        referrerPolicy='no-referrer'
                        className='w-12 h-12'
                        src={logo.src}
                        alt='avatar'
                        onClick={changeRoute}
                    />}
                    {clicked && <img
                        referrerPolicy='no-referrer'
                        className='w-12 h-12'
                        src={logo.src}
                        alt='avatar'
                    />}
                    <HiMenuAlt3 className='fill-white w-12 h-12' onClick={() => setToggled(!toggled)} />
                </div>

                {/* Dropdown */}
                {toggled &&
                    <div className='w-full md:hidden flex flex-col justify-between space-y-4'>
                        {/* AUTH NOT VISIBLE AT THIS STAGE */}

                        {/* <div onClick={() => router.push(`/agents/${getFromStorage('proptory-user')}`)} className={loggedIn ? '' : 'hidden'}>Profile</div>

                        <button onClick={handleClick} className={!loggedIn ? '' : 'hidden'}>
                            Login as agent
                        </button>
                        <button onClick={handleClick} className={loggedIn ? '' : 'hidden'}>
                            Logout
                        </button> */}
                        <SearchBar />
                    </div>}
            </nav>
            <Notification />
        </div>
    );
}