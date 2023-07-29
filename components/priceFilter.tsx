import { setPrice, useStateValue } from '@/state';
import { Formik, Form, Field } from 'formik';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    min: Yup.number()
        .nullable()
        .test(
            'is-valid-min',
            'Minimum value must be less than or equal to maximum value',
            function (value) {
                const { max } = this.parent;
                if (value === undefined || max === undefined) {
                    return true;
                }
                if (value !== undefined && value !== null && max !== undefined) {
                    return value <= max;
                }
                return true;
            }
        ),
    max: Yup.number()
        .nullable()
        .test(
            'is-valid-max',
            'Maximum value must be greater than or equal to minimum value',
            function (value) {
                const { min } = this.parent;
                if (value === undefined || min === undefined) {
                    return true;
                }
                if (value !== undefined && min !== undefined) {
                    return value! >= min;
                }
                return true;
            }
        ),
});

interface Values {
    min: number;
    max: number;
}

const PriceFilter = () => {
    const [showForm, setShowForm] = useState(false);
    const [showSelection, setShowSelection] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [{ query: { maxPrice, minPrice } }, dispatch] = useStateValue();

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setShowForm(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='relative'>
            <button
                onClick={() => setShowForm(!showForm)}
                disabled={showForm}
                className={`flex items-center text-ellipsis overflow-hidden`}
            >
                {minPrice && maxPrice ? `RM${minPrice} - ${maxPrice}` :
                    !minPrice && !maxPrice ? 'Any Price' :
                        minPrice ? `Above RM${minPrice}` :
                            maxPrice ? `Below RM${maxPrice}` :
                                ''
                }
                <div className='ml-1'>{!showForm ? <AiOutlineDown /> : <AiOutlineUp />}</div>
            </button>
            {/* {showForm && (
                <div className='absolute top-full bg-white shadow-md rounded-md z-50 p-4' style={{ left: '50%', transform: 'translateX(-50%)' }}>
                    <form ref={formRef} className='flex flex-col items-center max-md:w-screen max-md:mx-4 text-black'>
                        <input type='text' placeholder='Input 1' onClick={() => setShowSelection(true)} />
                        <input type='text' placeholder='Input 2' onClick={() => setShowSelection(true)} />
                        <button type='button'>Submit</button>
                    </form>
                </div>
            )} */}
            {showForm && (
                <div
                    className='absolute top-full bg-white shadow-xl rounded-md z-50 p-4'
                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                >
                    <button className='absolute top-0 right-0 pr-2'>❌</button>
                    <Formik
                        initialValues={{
                            min: Number(minPrice),
                            max: Number(maxPrice)
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            // console.log(values);
                            dispatch(setPrice({ maxPrice: values.max, minPrice: values.min }));
                            setSubmitting(false);
                            setShowForm(false);
                        }}>
                        {({ errors, setFieldValue }) => (
                            <Form ref={formRef} className='flex flex-col space-y-4 items-center text-black'>
                                <div className='flex flex-row max-md:flex-col md:space-x-4 max-md:space-y-4'>
                                    <div className='flex flex-col space-y-1'>
                                        <label htmlFor='min' className='text-sm'>Minimum</label>
                                        <Field type='number' name='min' min={0} placeholder='Min' onClick={() => setShowSelection(true)} className={`border border-slate-300 ${errors.min ? 'border-red-500' : ''} rounded-md h-9 px-2`} />
                                    </div>
                                    <div className='flex flex-col space-y-1'>
                                        <label htmlFor='max' className='text-sm'>Maximum</label>
                                        <Field type='number' name='max' min={0} placeholder='Max' onClick={() => setShowSelection(true)} className={`border border-slate-300 ${errors.max ? 'border-red-500' : ''} rounded-md h-9 px-2`} />
                                    </div>
                                </div>
                                <div className='flex flex-row max-md:flex-col max-md:space-y-2 justify-between md:w-full'>
                                    <button type='button' onClick={() => {
                                        dispatch(setPrice({ maxPrice: 0, minPrice: 0 }));
                                        setFieldValue('min', 0);
                                        setFieldValue('max', 0);
                                    }} className='py-2 px-2'>
                                        Clear
                                    </button>
                                    <button type='submit' className='py-2 px-2 bg-black text-white rounded-lg'>
                                        Apply Filters
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
        </div>
    )
};

PriceFilter.displayName = 'PriceFilter';

export default PriceFilter;