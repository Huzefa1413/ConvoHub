import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './styles/login.css';

const Login = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup
                .string('Enter your email')
                .email('Enter a valid email')
                .required('Email is required'),
            password: yup
                .string('Enter your password')
                .min(8, 'Password should be of minimum 8 characters length')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            loginHandler(values);
        }
    })

    const loginHandler = (e) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, e.email, e.password)
            .then(() => {
                navigate('/home')
            })
            .catch((error) => {
                alert("Invalid Email or Password")
                console.error(error)
            });
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
                <input name='email' type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} />
            </div>
            <span>{formik.touched.email && formik.errors.email}</span>
            <div className="input-field">
                <input name='password' type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
            </div>
            <span>{formik.touched.password && formik.errors.password}</span>
            <input value="Login" type='submit' className="btn" />
            <input type="button" value='Signup Page' className='btn' onClick={() => navigate('/signup')} />
        </form>
    )
}

export default Login