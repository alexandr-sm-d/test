import React from "react";
import {Field, reduxForm} from "redux-form";
import style from './UpdateContact.module.css'
import store from './../../../redux/store/store'
import {createTextMask} from "redux-form-input-masks";


export const UpdateContact = ({id, updateContact, disableUpdate}) => {
    const updatedUser = store.getState().contacts.contacts.find((user) => user.id === id)
    const initialValues = {
        number: updatedUser.number,
        name: updatedUser.name,
        lastname: updatedUser.lastname
    }

    const submit = formData => {
        updateContact(formData, id)
        disableUpdate()
    }

    return (
        <div className={style.updateContactContainer}>
            <UpdateContactReduxForm onSubmit={submit} initialValues={initialValues}/>
        </div>
    )
}

const phoneMask = createTextMask({
    pattern: '8 (999) 999-9999',
});

const UpdateContactForm = props => {
    return (
        <div className={style.loginbox}>
            <h3>Update Contact:</h3>
            <form onSubmit={props.handleSubmit}>
                <p>Phone Number</p>
                <small>Format: 8 (999) 999-9999</small>
                <Field
                    type="tel"
                    autoComplete='off'
                    required
                    placeholder="Enter your number"
                    component='input'
                    name="number"
                    {...phoneMask}/>
                <p>Name</p>
                <Field
                    autoComplete='off'
                    required
                    placeholder="Enter your name"
                    component='input'
                    name="name"/>
                <p>Last Name</p>
                <Field
                    autoComplete='off'
                    placeholder="Enter your lastname"
                    component='input'
                    name="lastname"/>
                <div>
                    <button>Save</button>
                </div>
            </form>
        </div>
    )
}

export const UpdateContactReduxForm = reduxForm({
    form: 'update_contact'
})(UpdateContactForm)