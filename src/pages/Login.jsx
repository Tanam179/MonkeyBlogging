import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useAuth } from '../contexts/AuthContext';
import Authentication from './Authentication';
import Field from '../components/field';
import Label from '../components/label';
import Input from '../components/input';
import Button from '../components/button';
import LoadingSpinner from '../components/loading';
import { EyeCloseIcon, EyeIcon } from '../components/icon';
import { auth } from '../firebase/firebaseConfig';

const schema = yup.object({
    email: yup.string().required('Email is required').email('Please enter a valid email address'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        ),
});

const Login = () => {
    const { userInfor } = useAuth();
    const navigate = useNavigate();
    const [toggleIcon, setToggleIcon] = useState('icon-eye');

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(schema) });

    const handleToggle = function () {
        setToggleIcon(toggleIcon === 'icon-eye' ? 'icon-eye-close' : 'icon-eye');
    };

    useEffect(() => {
        const errorList = Object.values(errors);
        if (errorList.length > 0) {
            toast.error(errorList[0].message);
        }
    }, [errors]);

    useEffect(() => {
        if (userInfor?.email) {
            navigate('/');
        }
    }, [userInfor]);

    const handleLogin = async function ({ email, password }) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login successfully');
            navigate('/');
        } catch (error) {
            toast.error('Login unsuccessfully! Please check your email and password');
        }
    };

    return (
        <Authentication>
            <form onSubmit={handleSubmit(handleLogin)} autoComplete="off">
                <Field>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        disabled={isSubmitting}
                        name="email"
                        control={control}
                        type="email"
                        placeholder="Enter your email address"
                    />
                </Field>
                <Field style={{ marginBottom: '20px' }}>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        name="password"
                        control={control}
                        type={toggleIcon === 'icon-eye' ? 'password' : 'text'}
                        placeholder="Enter your password"
                        onToggle={handleToggle}
                        disabled={isSubmitting}
                    >
                        {toggleIcon === 'icon-eye' ? <EyeIcon /> : <EyeCloseIcon />}
                    </Input>
                </Field>
                <div className="dont-have-account">
                    <p>You dont have an account?</p>
                    <Link to="/sign-up">Sign up now.</Link>
                </div>
                <Button align="middle" variation="primary" type="submit">{isSubmitting ? <LoadingSpinner /> : 'Login'}</Button>
            </form>
        </Authentication>
    );
};

export default Login;
