import React from 'react';
import {Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className='w-50 mx-auto mt-5'>
            {/* <nav>
                <Link to="/login">Login</Link>
                <Link to ="/register">Register</Link>
            </nav> */}
            <Outlet/>
        </div>
    );
};

export default Main;