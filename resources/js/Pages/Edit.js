import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Inertia} from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import Front from '../Layouts/Front'

const Edit = (props) => {
    const {errors, id, name, email} = props;
    const [values, setValues] = useState({
        id, name, email 
    });

    function changeHandle (e){
        e.persist();
        setValues(values => ({...values, [e.target.id]:e.target.value}));
    }

    function submitHandle (e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', values.id)
        formData.append('name', values.name)
        formData.append('email', values.email)       
        formData.append('_method', 'PUT')       
        Inertia.post(base_url+'/users/'+values.id, formData)
    }
    return (
        <Front title="Update User">
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
                        <button type="submit" className="btn btn-primary btn-lg" >Update</button>
                    </div>
                </div>
            </form>
        </Front>
    )
}


export default Edit
