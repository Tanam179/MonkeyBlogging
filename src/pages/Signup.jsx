import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import Label from '../components/label';
import Input from '../components/input';
import { EyeCloseIcon, EyeIcon } from '../components/icon';
import Field from '../components/field';
import Button from '../components/button';
import LoadingSpinner from '../components/loading';
import { auth, db } from '../firebase/firebaseConfig';
import Authentication from './Authentication';

const schema = yup.object({
    fullName: yup
        .string()
        .required('Fullname is required')
        .min(3, 'Fullname must be at least 3 characters long')
        .max(50, 'Fullname must not exceed 50 characters'),
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

const Signup = () => {
    const [toggleIcon, setToggleIcon] = useState('icon-eye');
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        const errorList = Object.values(errors);
        if (errorList.length > 0) {
            toast.error(errorList[0].message);
        }
    }, [errors]);

    const handleSignup = async ({ fullName, email, password }) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, { displayName: fullName });
            const colRef = collection(db, 'users');
            await addDoc(colRef, {
                fullName,
                email,
                password,
            });
            toast.success('Created user successfully');
            navigate('/login');
        } catch (error) {
            toast.error(error.message);
        } finally {
            reset();
        }
    };

    const handleToggle = function () {
        setToggleIcon(toggleIcon === 'icon-eye' ? 'icon-eye-close' : 'icon-eye');
    };

    return (
        <Authentication>
            <form onSubmit={handleSubmit(handleSignup)} autoComplete="off">
                <Field>
                    <Label htmlFor="fullName">Fullname</Label>
                    <Input
                        disabled={isSubmitting}
                        name="fullName"
                        control={control}
                        type="text"
                        placeholder="Enter your full name"
                    />
                </Field>
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
                <div className="have-account">
                    <p>Already have an account?</p>
                    <Link to="/login">Login now.</Link>
                </div>
                <Button type="submit">{isSubmitting ? <LoadingSpinner /> : 'Sign Up'}</Button>
            </form>
        </Authentication>
    );
};

export default Signup;
