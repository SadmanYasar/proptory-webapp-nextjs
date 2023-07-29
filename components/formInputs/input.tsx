import { Field, ErrorMessage } from "formik";

interface InputProps {
    type: 'text' | 'password' | 'number';
    name: string;
    placeholder: string;
}
const Input = ({ type, name, placeholder }: InputProps) => {
    return (
        <>
            <Field type={type} name={name} placeholder={placeholder} className="relative block max-md:py-4 w-full placeholder:text-slate-400 bg-white border border-slate-300 rounded-lg py-4 pl-4 pr-3  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-xl text-red-400" />
            <ErrorMessage name={name} component="div" className="text-red-500 sm:text-sm md:text-xl" />
        </>
    )
}

export default Input;