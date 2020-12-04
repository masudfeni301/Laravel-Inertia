import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types';
import {Inertia} from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import Front from '../Layouts/Front'

const Create = (props) => {
    const {errors, base_url} = usePage().props;
    const thumbnailRef = useRef();
    console.log(errors)
    const [values, setValues] = useState({
        name : '',
        email: '',
        password: '',
        password_confirmation:'',
    });

    function changeHandle (e){
        e.persist();
        setValues(values => ({...values, [e.target.id]:e.target.value}));
    }

    function submitHandle (e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', values.name)
        formData.append('email', values.email)
        formData.append('password', values.password)
        formData.append('password_confirmation', values.password_confirmation)
        formData.append('thumbnail', thumbnailRef.current.files[0])
        Inertia.post(base_url+'/users', formData)
    }
    return (
        <Front title="Add User">
            <form onSubmit={submitHandle} encType="multipart/form-data">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="form-group">
                           <label htmlFor="name">Name</label> 
                           <input type="text" id="name" name="name" className="form-control" value={values.name} onChange={changeHandle} placeholder="Type Name" />
                            {errors.name && <small className="alert alert-danger">{errors.name[0]}</small>}
                        </div>
                        <div className="form-group">
                           <label htmlFor="email">Email</label> 
                           <input type="email" id="email" name="email" className="form-control" value={values.email} onChange={changeHandle} placeholder="Type Email" />
                            {errors.email && <small className="alert alert-danger">{errors.email[0]}</small>}
                        </div>
                        <div className="form-group">
                           <label htmlFor="password">Password</label> 
                           <input type="password" id="password" name="password" className="form-control" value={values.password} onChange={changeHandle} placeholder="Type password" />
                            {errors.password && <small className="alert alert-danger">{errors.password[0]}</small>}
                        </div>
                        <div className="form-group">
                           <label htmlFor="password_confirmation">Confirm Password</label> 
                           <input type="password" id="password_confirmation" name="password_confirmaion" className="form-control" value={values.password_confirmation} onChange={changeHandle} placeholder="Type confirm password" />
                            {errors.password_confirmation && <small className="alert alert-danger">{errors.password_confirmation[0]}</small>}
                        </div>
                        <div className="form-group">
                           <label htmlFor="thumbnail">Image</label> 
                           <input type="file" ref={thumbnailRef} id="thumbnail"  className="form-control" value={values.thumbnail} />
                            {errors.thumbnail && <small className="alert alert-danger">{errors.thumbnail[0]}</small>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg" >Register</button>
                    </div>
                </div>
            </form>
        </Front>
    )
}


export default Create
