import { useStateValue } from "@/state";
import { useEffect, useRef, useState } from "react";
import PriceFilter from "./priceFilter";

const buttons = [
    { id: 'price' },
    { id: 'button2' },
    { id: 'button3' },
];


export default function Filter() {
    // const [isOpen, setIsOpen] = useState(false);
    // const [activeButton, setActiveButton] = useState('');
    // const filterRef = useRef(null);

    // useEffect(() => {
    //     const handleClickOutside = (event: any) => {
    //         if (filterRef.current && !filterRef.current?.contains(event.target)) {
    //             setActiveIndex(-1);
    //             setShowDropdown(false);
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [filterRef]);

    // const toggleDropdown = (button: string) => {
    //     if (activeButton === button) {
    //         setIsOpen(!isOpen);
    //     } else {
    //         setIsOpen(true);
    //         setActiveButton(button);
    //     }
    // };

    return (
        <div className='flex flex-row justify-around space-x-8'>
            <PriceFilter />
        </div >
    );
}