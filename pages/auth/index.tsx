/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { useStateValue, removeNotification } from "@/state";
import { useRouter } from "next/router";
import { useState } from "react";
import LoginForm from "../../components/login_form";
import SignUpForm from "../../components/signup_form";
import Notification from "../../components/notification";

export default function AuthPage() {
    const router = useRouter();
    const [activeButton, setActiveButton] = useState('login')
    const [_, dispatch] = useStateValue();

    const changeToListingsRoute = () => {
        dispatch(removeNotification());
        router.push('/');
    }

    const handleButtonClick = (button: string) => {
        setActiveButton(button);
    }

    return (
        <>
            <Head>
                <title>Proptory Web App</title>
                <meta name="description" content="Proptory Web App" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='w-full h-screen flex flex-col space-y-2 items-center bg-pink-650'>
                <img
                    referrerPolicy='no-referrer'
                    src={'logo_proptory/svg/white_transparent.svg'}
                    alt='proptory-logo'
                />
                <div className='max-md:w-10/12 md:w-5/12 xl:w-4/12 px-10 pb-8 bg-white shadow-md rounded-md'>
                    <div className='w-full flex flex-col items-center pt-4 space-y-6'>
                        <div className='w-full flex justify-around pt-4'>
                            <button className={`border w-2/4 ${activeButton === 'login' ? 'border-pink-650 bg-pink-650 text-white' : 'bg-white border-gray-300 text-gray-400'} rounded-l-lg py-4 px-10`} onClick={() => handleButtonClick('login')}>Login</button>
                            <button className={`border w-2/4 ${activeButton === 'signup' ? 'border-pink-650 bg-pink-650 text-white' : 'bg-white border-gray-300 text-gray-400'} rounded-r-lg py-4 px-10`} onClick={() => handleButtonClick('signup')}>Signup</button>
                        </div>
                        <Notification />
                        {activeButton === 'login' && <LoginForm router={router} />}
                        {activeButton === 'signup' && <SignUpForm setShow={handleButtonClick} />}
                        <div className='w-full text-center text-lg text-pink-650 font-bold'>OR</div>
                        <button className='w-full text-center text-lg text-pink-650' onClick={changeToListingsRoute}>Continue as visitor</button>
                    </div>
                </div>
            </main>
            <style jsx global>
                {`
                    body {
                        background: #E61066;
                    }
                `}
            </style>
        </>
    )
}