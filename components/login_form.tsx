import { useStateValue, setNotification, login } from "@/state";
import logger from "@/utils/logger";
import { getFromStorage, removeFromStorage, setStorage } from "@/utils/storage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NextRouter } from "next/router";
import { useEffect } from "react";
import * as Yup from 'yup';
import Button from "./formInputs/button";
import Input from "./formInputs/input";

const loginSchema = Yup.object().shape({
    username: Yup.string().required('Required').min(3, 'Too Short!').trim(),
    password: Yup.string().required('Required').min(5, 'Too Short!').trim(),
})

interface FormProps {
    router: NextRouter;
}

interface LoginInputs {
    username: string;
    password: string;
}
const LoginForm = ({ router }: FormProps) => {
    const [_, dispatch] = useStateValue();
    const contentType = 'application/json';

    const agentLogin = async (values: LoginInputs) => {
        removeFromStorage('proptory-token');
        removeFromStorage('proptory-user');

        try {
            const response = await fetch('/api/auth/login', {
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

            setStorage('proptory-token', data.value);
            setStorage('proptory-user', data.id);
            dispatch(login());
            router.push(`/agents/${data.id}`);
        } catch (error) {
            logger.info(error);
            dispatch(setNotification({ message: 'Failed to login', type: 'error' }));
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validationSchema={loginSchema}
                onSubmit={(values) => agentLogin(values)}
            >
                {({ isSubmitting }) => (
                    <Form className="w-full space-y-4">
                        <Input type="text" name="username" placeholder="Username" />
                        <Input type="password" name="password" placeholder="Password" />
                        <Button type="submit" disabled={isSubmitting} text={'Login'} />
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default LoginForm;