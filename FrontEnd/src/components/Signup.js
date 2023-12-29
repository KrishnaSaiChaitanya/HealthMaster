import React, { useState } from 'react'
import banner from '../Assets/pexels-jane-doan-1128678.jpg';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import logo from '../Assets/Logo.png';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {

    const navigate = useNavigate()

    const schema = yup.object().shape({
        customername: yup.string().required("Please Enter Your UserName"),
        email: yup.string().email().required("Please Enter Your Email"),
        password: yup.string().min(4).max(20).required("Please Enter Your Password"),
        confirmPwd: yup.string().oneOf([yup.ref("password"), null], "Entered Password is Not Matched").required(),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const [showalt, setShowalt] = useState()
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8081/check-email', data);

            if (response.data.exists) {
                setShowalt(true); // Set alert state to show if email exists
            } else {
                // If the email doesn't exist, add it to the database
                await axios.post('http://localhost:8081/signup', data);
                alert('Email added successfully!');
                navigate('/Login')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="Login-main row" >
            <div className=" Login-left d-flex align-items-center justify-content-center col-xs-12 col-md-6">
                {/* <img src={banner} alt="img" /> */}
            </div>
            <div className="Login-right d-flex flex-column align-items-center justify-content-center col-xs-12 col-md-6 ">
                <div className='logo-img'>
                    <img src={logo} />
                </div>
                <div className='Login-card'>
                    <h3 className='fw-bolder'>Sign up with email</h3>
                    {/* Form */}
                    <form className="responsive-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label className='text-start fw-bolder' htmlFor="customername">User Name:</label>
                            <input type="text"{...register("customername")} />
                            <p>{errors.customername?.message}</p>
                        </div>
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
                        <div className="form-group">
                            <label className='text-start fw-bolder' htmlFor="password">Confirm Your Password:</label>
                            <input type="password" {...register("confirmPwd")} />
                            <p>{errors.confirmPwd?.message}</p>
                            {showalt && <p>Email already exists!</p>}
                        </div>
                        <div className='mb-4'>
                            <Link to={'/Login'}>Already Have an account?</Link>
                        </div>

                        <button type="submit">
                            Join Now
                        </button>


                    </form>
                    {/* Form */}
                </div>
            </div>
        </div >
    )
}

export default Signup