import React from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import useAuth from '../Hooks/useAuth';
import Header from '../Share/Header/Header';
import './Login.css';

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
  const { createUser, handleSubmitLogin } = useAuth()
  
    const {
        register,
        handleSubmit,
      } = useForm({
        mode: "onBlur",
      });
    
      const {
        register: register2,
        handleSubmit: handleSubmit2,
      } = useForm({
        mode: "onBlur",
      });
    
    const onSubmit = (data) => {
        createUser(data.displayName, data.email, data.password,location, navigate)
      };
    
    const onSubmitLogin = (data) => {
        handleSubmitLogin(data.email, data.password,location, navigate)
      };
    
  return (
    <>
      <Header />
        <div className='login-form'>
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div className="signup">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input type="text" name="txt" placeholder="User name" {...register("displayName", { required: true })} />
                        <input type="email" name="email" placeholder="Email" {...register("email", { required: true })} />
                        <input type="password"  placeholder="Password" {...register("password", { required: true })} />
                        <button type='submit'>Sign up</button>
                    </form>
                </div>
                <div className="login">
                    <form onSubmit={handleSubmit2(onSubmitLogin)}>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input type="email" name="email" placeholder="Email" {...register2("email", { required: true })} />
                        <input type="password"  placeholder="Password"  {...register2("password", { required: true })} />
                        <input type='submit' value="Login" />
                    </form>
                </div>
            </div>
      </div>
      <Footer />
      </>
    );
};

export default Login;