import React from 'react'
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';

const Signup = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: yup.object({
            username: yup
                .string('Enter your Username')
                .required('Username is required')
                .min(5, ('Username should be of minimum 5 characters'))
                .max(50, 'Limit exceed: Maximum 50 characters allowed'),
            email: yup
                .string('Enter your email')
                .email('Enter a valid email')
                .required('Email is required'),
            password: yup
                .string('Enter your password')
                .min(8, 'Password should be of minimum 8 characters length')
                .required('Password is required'),
            confirmPassword: yup
                .string('Enter your password')
                .min(8, 'Password should be of minimum 8 characters length')
                .required('Password is required')
                .oneOf([yup.ref("password")], "Passwords do not match"),

        }),
        onSubmit: async (values) => {
            setIsLoading(true)
            signupHandler(values);
        }
    })

    const signupHandler = (e) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, e.email, e.password)
            .then((userCredential) => {

                updateProfile(auth.currentUser, {
                    displayName: e.username
                }).then(() => {
                }).catch((error) => {
                    console.error(error)
                    setIsLoading(false);
                });
                navigate('/');
                setIsLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setIsLoading(false)
            });
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <h2 className="title">Sign Up</h2>
                <div className="input-field">
                    <input name='username' type="text" placeholder="Username" value={formik.values.username} onChange={formik.handleChange} />
                </div>

                <span>{formik.touched.username && formik.errors.username}</span>
                <div className="input-field">
                    <input name='email' type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} />
                </div>
                <span>{formik.touched.email && formik.errors.email}</span>
                <div className="input-field">
                    <input name='password' type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
                </div>
                <span>{formik.touched.password && formik.errors.password}</span>
                <div className="input-field">
                    <input name='confirmPassword' type="password" placeholder="Confirm Password" value={formik.values.confirmPassword} onChange={formik.handleChange} />
                </div>
                <span> {formik.touched.confirmPassword && formik.errors.confirmPassword}</span>

                {
                    (!isLoading) ? (<input value="Signup" type='submit' className="btn" />) : (<div className='loader'></div>)
                }
                <input type="button" value='Login Page' className='btn' onClick={() => navigate('/')} />
            </form>
        </>
    )
}

export default Signup