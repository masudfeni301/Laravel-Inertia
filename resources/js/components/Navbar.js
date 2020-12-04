import React from "react";
import {InertiaLink, usePage} from '@inertiajs/inertia-react'

const Navbar = (props) => {
    const {base_url} = usePage().props;
    const {url} = history.state;
    //console.log(url)
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <InertiaLink className="navbar-brand" href="#">
                    Hidden brand
                </InertiaLink>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className={url == '/'?'nav-item active':'nav-item'}>
                        <InertiaLink className="nav-link" href={base_url}>
                            Home <span className="sr-only">(current)</span>
                        </InertiaLink>
                    </li>  
                    <li className={url=='/users'?'nav-item active':'nav-item'}>
                        <InertiaLink className="nav-link" href={base_url+'/users'}>
                            Users </InertiaLink>
                    </li> 
                    <li className={url=='/users/create'?'nav-item active':'nav-item'}>
                        <InertiaLink className="nav-link"  href={base_url+'/users/create'}>
                            Add User
                         </InertiaLink>
                    </li>                  
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
