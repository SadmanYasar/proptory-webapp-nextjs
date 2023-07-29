import { useStateValue } from "@/state";
import { setNotification } from "@/state/";
import logger from "@/utils/logger";
import { removeFromStorage } from "@/utils/storage";
import { NewAgent } from "@/utils/types";
import { Formik, Form } from "formik";
import { Dispatch, SetStateAction } from "react";
import * as Yup from 'yup';
import Button from "./formInputs/button";
import Input from "./formInputs/input";

export const signUpSchema = Yup.object().shape({
    fullname: Yup.string().required('Required').min(3, 'Too Short!').trim(),
    phone: Yup.string().required('Required').min(5, 'Invalid Number').trim(),
    username: Yup.string().required('Required').trim(),
    password: Yup.string().required('Required').min(5, 'Too Short!').trim(),
})
interface SignUpProps {
    setShow: (button: string) => void;
}
const SignUpForm = ({ setShow }: SignUpProps) => {
    const [_, dispatch] = useStateValue();

    const contentType = 'application/json';

    const signUp = async (values: NewAgent) => {
        removeFromStorage('proptory-token');
        removeFromStorage('proptory-user');

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify({
                    ...values
                })
            });

            // Throw error with status code in case Fetch API req failed
            if (!response.ok) {
                throw new Error(response.status.toString());
            }

            const data = await response.json();
            setShow('login');

        } catch (error) {
            logger.info(error);
            dispatch(setNotification({ message: 'Failed to sign up', type: 'error' }));
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    fullname: '',
                    phone: '',
                    username: '',
                    password: '',
                }}
                validationSchema={signUpSchema}
                onSubmit={(values: NewAgent) => signUp(values)}
            >
                {({ isSubmitting }) => (
                    <Form className="w-full space-y-4">
                        <Input type="text" name="fullname" placeholder="Full Name" />
                        <Input type="text" name="phone" placeholder="Phone Number eg. +6011XXXXXXXX" />
                        <Input type="text" name="username" placeholder="Username" />
                        <Input type="password" name="password" placeholder="Password" />
                        <Button type="submit" disabled={isSubmitting} text={"Signup"} />
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default SignUpForm;