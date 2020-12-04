import React from 'react'
import Front from '../Layouts/Front'
import { InertiaLink } from '@inertiajs/inertia-react'

const User = ({users, create_url}) => {
    return (
        <Front title="User Crud Operations">
        <div className="container">
            <table className="table">
                <thead>
                    <th>#ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Image</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><img style={{ height:100, width:'100%' }} src={user.thumbnail} alt={user.name}/></td>
                            <td>
                                <InertiaLink className="btn btn-success mr-2" href={user.edit_url}>Edit</InertiaLink>
                                <InertiaLink replace method="post" data={{ _method:'delete' }} className="btn btn-danger" href={user.delete_url}>Delete</InertiaLink>
                            </td>
                        </tr>                  
                    
                ))}
                </tbody>            
            </table>
        </div>
        </Front>
    )
}

export default User
