import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import aviator from './assets/aviator.png';
import register from './assets/register.png';
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
        <div className="backgroundlogin">

            <div className="login">
                <div className="leftlog">
                    <button className="loginbtn" value='login Page' onClick={() => navigate('/')}>
                        <div className="avator1"><img width="100%" src={aviator} alt="img here" /></div>
                        <h2>Login</h2>
                    </button>
                    <br />
                    <button className="signupbtn" value='Signup Page' onClick={() => navigate('/signup')}>
                        <div className="avator1"><img width="100%" src={register} alt="img here" /></div>
                        <h2>SignUp</h2>
                    </button>
                </div>
                <div className="rightlog">
                    <form className='loginform' onSubmit={formik.handleSubmit}>

                        <h3 className="titlelogin">Login</h3>
                        <div className="input-fieldlogin">
                            <input name='email' type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} />
                        </div>
                        <div className='error'>{formik.touched.email && formik.errors.email}</div>
                        <div className="input-fieldlogin">
                            <input name='password' type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
                        </div>
                        <div className='error'>{formik.touched.password && formik.errors.password}</div>
                        <input value="Login" type='submit' className="btnlogin" />
                        {/* <input type="button" value='Signup Page' className='btn' onClick={() => navigate('/signup')} /> */}
                        <div className="already">
                            <br />
                            <h4>Dont have an Account? <button className='navlog' onClick={() => navigate('/signup')}>Signup</button></h4>
                            <br />
                        </div>
                    </form>
                </div>
            </div>




        </div>
    )
}

export default Login