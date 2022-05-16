import { jsonEval } from '@firebase/util';
import React from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)
        const url = `https://gentle-retreat-61995.herokuapp.com/service`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
            })
    };

    return (
        <div className='w-50 mx-auto'>
            <h1>Please add a service</h1>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>

                <input className='mb-2' placeholder='Name' {...register("name", { required: true })} />
                <input className='mb-2' placeholder='Price' {...register("price", { required: true })} />
                <textarea className='mb-2' placeholder='Description' {...register("description", { required: true })} />
                <input className='mb-2' placeholder='Image' {...register("img", { required: true })} />

                {errors.exampleRequired && <span>This field is required</span>}

                <input type="Submit" value="Add Services" />
            </form>
        </div>
    );
};

export default AddService;