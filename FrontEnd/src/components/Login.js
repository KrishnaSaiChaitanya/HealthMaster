import React from 'react'
import banner from '../Assets/bankground.jpg';
import img from '../Assets/bankground.jpg'
import logo from '../Assets/Logo.png';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import '../App.css';


import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const schema = yup.object().shape({
        email: yup.string().email().required("Please Enter Your Email"),
        password: yup.string().min(4).max(255).required("Please Enter Your Password"),
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();
    const onSubmit = (data) => {
        axios.post('http://localhost:8081/login', data)
            .then(res => {
                if (res.data === "Success") {
                    alert("Your Login Successful")
                    window.localStorage.setItem('Tokken', true)
                    window.localStorage.setItem('customerId', data.email);
                    navigate('/');
                    window.location.reload();
                } else {
                    alert("Please check Your Email and Password")
                }
            }
            )
            .catch(error => {
                // Log the error for further investigation
                console.error('Axios Error:', error);
                // You might also access more details about the error response, e.g. error.response.data
            });

    }

    return (
        <div className="Login-main row" >
            <div className="Login-left d-flex align-items-center justify-content-center col-xs-12 col-md-6 ">
                {/* <img src={banner} alt="img" /> */}
            </div>
            <div className="Login-right d-flex flex-column align-items-center justify-content-center col-xs-12 col-md-6 ">
                <div className='logo-img'>
                    <img src={logo} />
                </div>
                <div className='Login-card'>
                    <h3 className='fw-bolder'>Log in with email</h3>
                    <form className="responsive-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label className='text-start fw-bolder' htmlFor="email">Email Address:</label>
                            <input type="text"{...register("email")} />
                            <p>{errors.email?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className='text-start fw-bolder' htmlFor="password">Password:</label>
                            <input type="password" {...register("password")} />
                            <p>{errors.password?.message}</p>
                        </div>
                        <div className='mb-4'>
                            <Link to={'/signup'}> Don't Have Account?</Link>
                        </div>
                        <button type="submit">Log In</button>
                    </form>
                </div>


            </div>
        </div >)
}

export default Login

