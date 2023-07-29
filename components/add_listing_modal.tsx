import { Formik, Form } from "formik";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import * as Yup from 'yup';
import Input from "./formInputs/input";

const addListingSchema = Yup.object().shape({
    matterportId: Yup.string().typeError('String is required').required('Required').min(3, 'Too Short!').trim(),
    name: Yup.string().typeError('String is required').required('Required').min(5, 'Too Short!').trim(),
    description: Yup.string().typeError('String is required').required('Required').min(10, 'Too Short!').trim(),
    address: Yup.string().typeError('String is required').required('Required').min(10, 'Too Short!').trim(),
    bathrooms: Yup.number().typeError('Must be a positive number').required('Required').moreThan(0),
    bedrooms: Yup.number().typeError('Must be a positive number').required('Required').moreThan(0),
    price: Yup.number().typeError('Must be a positive number').required('Required').moreThan(0),
})

const Fields = [
    {
        name: 'matterportId',
        placeholder: 'Matterport Model ID'
    },
    {
        name: 'name',
        placeholder: 'Name of listing'
    },
    {
        name: 'description',
        placeholder: 'Describe your listing'
    },
    {
        name: 'address',
        placeholder: 'Address'
    },
    {
        name: 'bathrooms',
        placeholder: 'How many bathrooms?'
    },
    {
        name: 'bedrooms',
        placeholder: 'How many bedrooms?'
    },
    {
        name: 'price',
        placeholder: 'Price'
    },
]

interface ModalProps {
    addListing: (values: any) => Promise<void>;
}
const AddListingModal = ({ addListing }: ModalProps) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <button className='z-50 w-full h-full px-4 py-4 pointer-events-none fixed top-0 flex justify-end items-end'>
                <IoIosAddCircle className='w-20 h-20 pointer-events-auto hover:text-pink-650 py-2 px-2 transition duration-150 ease-in-out' onClick={() => setModalShow(true)} />
            </button>
            {modalShow && <div className="w-full h-full fixed backdrop-blur-sm shadow-lg z-50 top-0 flex flex-col items-center justify-center">
                <div className="max-md:w-full md:w-3/6 bg-white shadow-2xl px-4 py-4 space-y-4 rounded-md overflow-auto">
                    <Formik
                        initialValues={{
                            matterportId: '',
                            name: '',
                            address: '',
                            description: '',
                            bathrooms: '',
                            bedrooms: '',
                            price: '',
                        }}
                        validationSchema={addListingSchema}
                        onSubmit={(values) => {
                            addListing(values);
                            setModalShow(false);
                        }}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form className="w-full space-y-4">
                                {Fields.map(({ name, placeholder }, i) =>
                                    <Input
                                        key={i}
                                        type="text"
                                        name={name}
                                        placeholder={placeholder}
                                    />)
                                }
                                <button className='w-full py-4 bg-pink-650 rounded-lg text-center text-xl text-white' type={'submit'} disabled={isSubmitting}>Create</button>
                                <button type='button' className='w-full py-4 bg-white rounded-lg text-center text-xl text-gray-500 border border-gray-400' onClick={() => setModalShow(false)}>Cancel</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>}
        </>
    )
}

export default AddListingModal;