import React from 'react'
import { useState } from "react";
import aviator from './assets/aviator.png';
import register from './assets/register.png';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import './styles/signup.css';

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
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: e.username
                }).then(() => {
                }).catch((error) => {
                    console.error(error)
                    alert('Unable to Get Username')
                    setIsLoading(false);
                });
                navigate('/');
                setIsLoading(false)
            })
            .catch((error) => {
                console.error(error)
                alert('Unable to Login, Email already in use')
                setIsLoading(false)
            });
    }

    return (
        <div className="background">
            <div className="main-container">
                <div className="left-div">
                    <div className="left-loginbtn" value='login Page' onClick={() => navigate('/')}>
                        <div className="left-imgDiv"><img src={aviator} alt="login" /></div>
                        <h2>Login</h2>
                    </div>
                    <div style={{ backgroundColor: '#00A8F3' }} className="left-signupbtn" value='Signup Page' onClick={() => navigate('/signup')}>
                        <div className="left-imgDiv"><img src={register} alt="signup" /></div>
                        <h2>SignUp</h2>
                    </div>
                </div>
                <div className="right-div">
                    <form className='signupform' onSubmit={formik.handleSubmit}>
                        <h3 className="title">Sign Up</h3>
                        <div className="row">
                            <div className="input-fieldsignup">
                                <input className='inpsignup' name='username' type="text" placeholder="Username" value={formik.values.username} onChange={formik.handleChange} />
                                <div className='error'>{formik.touched.username && formik.errors.username}</div>
                            </div>
                            <div className="input-fieldsignup">
                                <input className='inpsignup' name='email' type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} />
                                <div className='error'>{formik.touched.email && formik.errors.email}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-fieldsignup">
                                <input className='inpsignup' name='password' type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
                                <div className='error'>{formik.touched.password && formik.errors.password}</div>
                            </div>
                            <div className="input-fieldsignup">
                                <input className='inpsignup' name='confirmPassword' type="password" placeholder="Confirm Password" value={formik.values.confirmPassword} onChange={formik.handleChange} />
                                <div className='error'>{formik.touched.confirmPassword && formik.errors.confirmPassword}</div>
                            </div>
                        </div>
                        {(!isLoading) ? (<input value="Signup" type='submit' className="btnsignup" />) : (<div className='loader'></div>)}
                        <div className="already">
                            <h4>Already have an Account? </h4>
                            <button onClick={() => navigate('/')}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup