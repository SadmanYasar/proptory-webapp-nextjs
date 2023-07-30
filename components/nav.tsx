/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useRouter } from 'next/router';
import logo from '../public/logo_proptory/icon_only/white_with_dark_background.jpg';
import { login, logout, setPrice, setSearch, useStateValue } from '@/state';
import Notification from './notification';
import { getFromStorage } from '@/utils/storage';
import SearchBar from './searchBar';

import { Dialog, Disclosure, Popover } from "@headlessui/react"
import {
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon
} from "@heroicons/react/24/outline"
import { motion, useScroll } from 'framer-motion';

import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {
    const { data: session, status } = useSession()
    const loading = status === "loading"
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [hidden, setHidden] = useState(false)
    const { scrollY } = useScroll();

    /** this onUpdate function will be called in the `scrollY.onChange` callback **/
    function update() {
        if (scrollY?.get() < scrollY?.getPrevious()) {
            setHidden(false);
        } else if (scrollY?.get() > 100 && scrollY?.get() > scrollY?.getPrevious()) {
            setHidden(true);
        }
    }

    /** add this useEffect hook to return events everytime the scrollY changes **/
    useEffect(() => {
        return scrollY.on('change', update);
    });

    const variants = {
        /** this is the "visible" key and it's respective style object **/
        visible: { opacity: 1, y: 0 },
        /** this is the "hidden" key and it's respective style object **/
        hidden: { opacity: 0, y: -25 }
    };

    return (
        <motion.header
            className={`sticky top-0 ${mobileMenuOpen ? 'z-0' : 'z-[100]'} w-full bg-black`}
            variants={variants}
            animate={hidden ? "hidden" : "visible"}
            transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
        >
            <nav
                className="flex items-center justify-between p-4 mx-auto max-w-7xl lg:px-8"
                aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <div className="w-14 h-14 rounded-full flex justify-center items-center">
                            <img className="w-auto pt-2" src={logo.src} alt="" />
                        </div>
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                    </button>
                </div>
                {/* <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <Popover.Button className="flex items-center text-sm font-semibold leading-6 text-white gap-x-1">
                Product
              </Popover.Button>
            </Popover>
  
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              Features
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              Marketplace
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              Company
            </a>
          </Popover.Group> */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-10">
                    <MagnifyingGlassIcon className="text-sm font-semibold leading-6 w-6 h-6 text-white" />
                    {!session && (
                        <>
                            <a
                                href={`/api/auth/signin`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    signIn()
                                }}
                                className="text-sm group font-semibold leading-6 text-white transition duration-300">
                                Sign in
                                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                            </a>
                        </>
                    )}
                    {session?.user && (
                        <>
                            {session.user.image && (
                                <span
                                    style={{ backgroundImage: `url('${session.user.image}')` }}
                                    className="w-8 h-8 bg-cover rounded-full"
                                />
                            )}
                            <a
                                href={`/api/auth/signout`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    signOut()
                                }}
                                className="text-sm group font-semibold leading-6 text-white transition duration-300">
                                Sign out
                                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                            </a>
                        </>
                    )}
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-black sm:max-w-sm sm:ring-1">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <div className="w-14 h-14 rounded-full flex justify-center items-center">
                                <img className="w-auto pt-2 pointer-events-none" src={logo.src} alt="" />
                            </div>
                            {/* <img
                  className="w-auto h-8"
                  src="https://img.icons8.com/?size=512&id=81028&format=png"
                  alt=""
                /> */}
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flow-root mt-6">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="py-6 space-y-2">
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-red-500">
                                                Product
                                            </Disclosure.Button>
                                        </>
                                    )}
                                </Disclosure>
                                <a
                                    href="#"
                                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-red-500"
                                >
                                    Features
                                </a>
                                <a
                                    href="#"
                                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-red-500"
                                >
                                    Marketplace
                                </a>
                                <a
                                    href="#"
                                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-red-500"
                                >
                                    Company
                                </a>
                            </div>
                            <div className="py-6">
                                {!session && (
                                    <>
                                        <a
                                            href={`/api/auth/signin`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                signIn()
                                            }}
                                            className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-red-500">
                                            Sign in

                                        </a>
                                    </>
                                )}
                                {session?.user && (
                                    <>
                                        <a
                                            href={`/api/auth/signout`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                signOut()
                                            }}
                                            className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-red-500">
                                            Sign out

                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </motion.header>
    )
}

// const routesToFilter = [
//     '/auth',
//     '/listings/view3d/[id]'
// ]

// export default function Nav() {
//     // const [user, loading, error] = useAuthState(auth);
//     const [toggled, setToggled] = useState(false);
//     const [{ loggedIn }, dispatch] = useStateValue();
//     const [clicked, setClicked] = useState(false);
//     const router = useRouter();

//     // console.log(router.asPath)
//     // console.log(router.pathname)
//     // console.log(router.basePath)

//     useEffect(() => {
//         if (getFromStorage('proptory-token') && getFromStorage('proptory-user')) {
//             dispatch(login());
//         } else {
//             dispatch(logout());
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])

//     // hide nav on auth screen
//     if (routesToFilter.includes(router.asPath) || routesToFilter.includes(router.pathname)) {
//         return null;
//     }

//     const handleClick = () => {
//         dispatch(logout());
//         router.push('/auth');
//     }

//     const changeRoute = () => {
//         setClicked(true);

//         dispatch(setSearch(''));
//         dispatch(setPrice({
//             maxPrice: 0,
//             minPrice: 0
//         }))
//         router.push(`/listings?page=1`)
//             .then(() => {
//                 setTimeout(() => {
//                     setClicked(false);
//                 }, 1000);
//             });
//     }

//     return (
//         <div className='bg-pink-650 w-full sticky top-0 z-40'>
//             <nav className='py-4 mx-14 text-white'>
//                 {/* Tablet/Desktop Navbar */}
//                 {/* Should replace it with this one after login is required */}
//                 {/* <div className='w-full max-md:hidden flex justify-between items-center'> */}
//                 <div className='w-full max-md:hidden grid grid-cols-3 gap-4'>
//                     {!clicked && <img
//                         referrerPolicy='no-referrer'
//                         className='w-12 h-12'
//                         src={logo.src}
//                         alt='avatar'
//                         onClick={changeRoute}
//                     />}
//                     {clicked && <img
//                         referrerPolicy='no-referrer'
//                         className='w-12 h-12'
//                         src={logo.src}
//                         alt='avatar'
//                     />}
//                     <SearchBar />
//                     {/* AUTH NOT VISIBLE AT THIS STAGE */}
//                     {/* <button onClick={handleClick} className={!loggedIn ? 'hover:bg-black py-2 px-2 transition duration-150 ease-in-out rounded-md' : 'hidden'}>
//                         Login as agent
//                     </button>
//                     <div className={loggedIn ? 'flex flex-row space-x-4' : 'hidden'}>
//                         <button onClick={() => router.push(`/agents/${getFromStorage('proptory-user')}`)}>Profile</button>
//                         <button onClick={handleClick}>Logout</button>
//                     </div> */}
//                 </div>

//                 {/*  Mobile Navbar */}
//                 <div className='w-full md:hidden flex justify-between items-center'>
//                     {!clicked && <img
//                         referrerPolicy='no-referrer'
//                         className='w-12 h-12'
//                         src={logo.src}
//                         alt='avatar'
//                         onClick={changeRoute}
//                     />}
//                     {clicked && <img
//                         referrerPolicy='no-referrer'
//                         className='w-12 h-12'
//                         src={logo.src}
//                         alt='avatar'
//                     />}
//                     <HiMenuAlt3 className='fill-white w-12 h-12' onClick={() => setToggled(!toggled)} />
//                 </div>

//                 {/* Dropdown */}
//                 {toggled &&
//                     <div className='w-full md:hidden flex flex-col justify-between space-y-4'>
//                         {/* AUTH NOT VISIBLE AT THIS STAGE */}

//                         {/* <div onClick={() => router.push(`/agents/${getFromStorage('proptory-user')}`)} className={loggedIn ? '' : 'hidden'}>Profile</div>

//                         <button onClick={handleClick} className={!loggedIn ? '' : 'hidden'}>
//                             Login as agent
//                         </button>
//                         <button onClick={handleClick} className={loggedIn ? '' : 'hidden'}>
//                             Logout
//                         </button> */}
//                         <SearchBar />
//                     </div>}
//             </nav>
//             <Notification />
//         </div>
//     );
// }

