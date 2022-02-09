import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';

const Serve = () => {
    const [roll, setRoll] = useState({})
    const [rollNumber, setRollNumber] = useState([])
    const { trySuccessAlart } = useAuth()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const handleRoll = (e) => {
        e.preventDefault();
        setRollNumber(e.target.value)
    }
    const onSubmit = (data) => {

        data.id = roll?._id
        console.log(`https://floating-oasis-20837.herokuapp.com/updateData/${roll._id}`);

        fetch(`https://floating-oasis-20837.herokuapp.com/updateData/${roll._id}`, {
            method: "PUT",
            "headers": {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)

        }).then(res => {
            if (res.status === 200) {
                reset()
                trySuccessAlart("Done", "Food Eadit Successfully", "success")
            }
        })
    }

    useEffect(() => {
        fetch(`https://floating-oasis-20837.herokuapp.com/student/${rollNumber}`).then(res => res.json()).then(datt => setRoll(datt))
    }, [roll])

    const handleSubmit2 = (e) => {
        e.preventDefault();
        console.log(roll);
        fetch(`https://floating-oasis-20837.herokuapp.com/student/${rollNumber}`).then(res => res.json()).then(dat => {

            if (dat?.served) {
                reset()
                trySuccessAlart("Done", "“Already served”", "success")
                return
            }
            if (dat === null) {
                trySuccessAlart("Ops", "“No Data Found”", "error")
                return
            }
            else {

                setShow(true)
                return
            }
        })
    }
    return (
        <section className="get-in-touch mx-3">
            <h1 className="title">Add Food Here!  </h1>
            <form onSubmit={handleSubmit2} className="contact-form row">
                <div className="form-field col-lg-12">
                    <input className="input-text js-input" type="number" onBlur={handleRoll} />
                    <label className="label">Roll Number</label>
                </div>
                <div className="form-field col-lg-12">
                    <input className="submit-btn" type="submit" value="Submit" />
                </div>
            </form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <section className="get-in-touch">
                        <h1 className="title">    </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="contact-form row">
                            <div className="form-field col-lg-6">
                                <input value={roll?.name} className="input-text js-input" type="text" {...register("name", { required: true })} />
                                <label className="label" for="name">Student Name</label>
                            </div>
                            <div className="form-field col-lg-6">
                                <input id="name" value={roll?.hall} className="input-text js-input" type="text" {...register("hall", { required: true })} />
                                <label className="label" for="name">hall</label>
                            </div>
                            <div className="form-field col-lg-6">
                                <input value={roll?.age} id="name" className="input-text js-input" type="number" {...register("age", { required: true })} />
                                <label className="label" for="name">Age</label>
                            </div>
                            <div className="form-field col-lg-6">
                                <input value={roll?.action} id="name" className="input-text js-input" type="text" {...register("action", { required: true })} />
                                <label className="label" for="name">Action</label>
                            </div>
                            <div className="form-field col-lg-6 ">
                                <input value={roll?.roll} className="input-text js-input" type="number" {...register("roll", { required: true })} />
                                <label className="label" for="email">Roll</label>
                            </div>
                            <div className="form-field col-lg-6 ">
                                <select className="input-text js-input" {...register("served")}>

                                    <option >Select One</option>
                                    <option value="served">served</option>
                                    <option value="notserved">Not Served</option>

                                </select>
                                <label className="label" for="email">Status</label>
                            </div>
                            <div className="form-field col-lg-6 ">
                                <input defaultValue={roll?.class} className="input-text js-input" type="number" {...register("class", { required: true })} />
                                <label className="label" for="email">Class (like 1 to 12)</label>
                            </div>
                            <div className="form-field col-lg-6 ">
                                <input defaultValue={roll?.shift} className="input-text js-input" type="number" {...register("shift", { required: true })} />
                                <label className="label" for="email">Shift (like 1 to 12)</label>
                            </div>
                            <div className="form-field col-lg-6">
                                <select className="input-text js-input" {...register("food")}>
                                    <option  >Select Food</option>
                                    <option value='Food' >Food</option>
                                    <option value="rice">Rice</option>
                                    <option value="vigitable">Vigitable</option>
                                    <option value="shrimp">shrimp</option>
                                    <option value="fish">fish</option>
                                    <option value="steak">steak</option>
                                    <option value="sandwich">sandwich</option>
                                </select>
                                <label className="label" for="email">Select Food</label>
                            </div>
                            <div className="form-field col-lg-6 ">
                                <input defaultValue={roll?.date} className="input-text js-input" type="date" {...register("date", { required: true })} />
                                <label className="label" for="email">Date</label>
                            </div>

                            <div className="form-field col-lg-12">
                                <input className="submit-btn" type="submit" value="Submit" />
                            </div>
                        </form>
                    </section>
                </Modal.Header>
            </Modal>
        </section>
    );
};

export default Serve;