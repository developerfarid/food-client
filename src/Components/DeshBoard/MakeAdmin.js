import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import "./MakeAdmin.css";

const MakeAdmin = () => {
 const {trySuccessAlart }=   useAuth()
    const { register, handleSubmit,reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.put("https://floating-oasis-20837.herokuapp.com/user/admin", data).then(res => {
          if (res.data.modifiedCount) {
              trySuccessAlart("Success", "You make a Admin", "success")
              reset()             
            }
          else {
            trySuccessAlart("Ops", "Something worng", "error")
            }
      })
  };
    return (
        <div className="make">
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <h3>Make Admin Here</h3>
                <label className='label' for="username">User Email</label>
                <input placeholder='User Email' className='input' {...register("email", { required: true })} />
                <input className='input' type="submit" value="Submit" />
            </form>  
        </div>       
    );
};

export default MakeAdmin;