import React from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../Hooks/useAuth';
import "./AddStudent.css";

const AddFood = () => {
    const { trySuccessAlart } = useAuth()
    const { register, handleSubmit, reset, } = useForm();
    const onSubmit = data => {
        fetch("https://floating-oasis-20837.herokuapp.com/addFood", {
            method: "POST",
            "headers": {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200) {
                    reset()
                    trySuccessAlart("Done", "Food Added Successfully", "success")
                }
            })
    };
    return (
        <div className="studentAdd mx-3">
            <section className="get-in-touch">
                <h1 className="title">Add Food Here!  </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="contact-form row">
                    <div className="form-field col-lg-6">
                        <input id="name" className="input-text js-input" type="text" {...register("foodName", { required: true })} />
                        <label className="label" for="name">Food Name</label>
                    </div>
                    <div className="form-field col-lg-6 ">
                        <input id="email" className="input-text js-input" type="number" {...register("price", { required: true })} />
                        <label className="label" for="email">Food Price</label>
                    </div>
                    <div className="form-field col-lg-12">
                        <input className="submit-btn" type="submit" value="Submit" />
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddFood;