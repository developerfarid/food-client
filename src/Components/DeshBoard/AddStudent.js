import React from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../Hooks/useAuth';
import "./AddStudent.css";

const AddStudent = () => {
    const { trySuccessAlart } = useAuth()
    const { register, handleSubmit, reset, } = useForm();
    const onSubmit = data => {
        fetch("https://floating-oasis-20837.herokuapp.com/addStudent", {
            method: "POST",
            "headers": {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200) {
                    reset()
                    trySuccessAlart("Done", "Student Added Successfully", "success")
                }
            })
    };
    return (
        <div className="studentAdd mx-3">
            <section className="get-in-touch">
                <h1 className="title">Add Student Account Here!  </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="contact-form row">
                    <div className="form-field col-lg-6">
                        <input id="name" className="input-text js-input" type="text" {...register("name", { required: true })} />
                        <label className="label" for="name">Full Name</label>
                    </div>
                    <div className="form-field col-lg-6 ">
                        <input id="email" className="input-text js-input" type="number" {...register("roll", { required: true })} />
                        <label className="label" for="email">Roll Number</label>
                    </div>
                    <div className="form-field col-lg-6 ">
                        <input id="company" className="input-text js-input" type="text" {...register("age", { required: true })} />
                        <label className="label" for="company">Age</label>
                    </div>
                    <div className="form-field col-lg-6 ">
                        <input id="phone" className="input-text js-input" type="number" {...register("class", { required: true })} />
                        <label className="label" for="phone">Class (Only Number)</label>
                    </div>
                    <div className="form-field col-lg-6">
                        <input id="message" className="input-text js-input" type="text" {...register("hall", { required: true })} />
                        <label className="label" for="message">Hall Name</label>
                    </div>
                    <div className="form-field col-lg-6">
                        <select className="input-text js-input" {...register("action")}>
                            <option >Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="form-field col-lg-6">
                        <select className="input-text js-input" {...register("shift")}>
                            <option >Select Shift</option>
                            <option value="Morning">Morning</option>
                            <option value="Evening">Evening</option>
                        </select>
                    </div>
                    <div className="form-field col-lg-12">
                        <input className="submit-btn" type="submit" value="Submit" />
                    </div>
                </form>
            </section>

        </div>
    );
};

export default AddStudent;