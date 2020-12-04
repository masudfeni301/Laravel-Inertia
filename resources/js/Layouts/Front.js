import React, {useEffect} from 'react'
import {InertiaLink} from '@inertiajs/inertia-react'
import Navbar from '../components/Navbar'

const Front = ({ title, children}) => {
    useEffect(() => {
        document.title = title;
    }, []);

    return (
        <>
            <Navbar/>
            { children }
        </>
    )
}

export default Front
