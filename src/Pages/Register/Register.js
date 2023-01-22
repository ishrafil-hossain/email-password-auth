import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import { app } from '../../firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app)

const Register = () => {
    const [users, setUsers] = useState();
    const [error, setError] = useState('');
    const [success, setsSuccess] = useState(false);
    const [loader, setLoader] = useState(false)

    const handleRegister = event => {

        setsSuccess(false)
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value
        if (!/(?=.*[0-9])/.test(password)) {
            setError('Plesse use at least one number')
            return
        }
        if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setError('Plesse use at least one special character')
            return
        }
        setError('')
        setLoader(true)
        // console.log(email, password)
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                // console.log(user)
                setUsers(user.email)
                setsSuccess(true)
                form.reset()
                setLoader(false)
                emailVarified()

            })
            .catch(error => {
                setError(error.message)
                setLoader(false)
            })
    }

    // Send a user a verification email 
    const emailVarified = () =>{
        sendEmailVerification(auth.currentUser)
        .then(()=> {
            alert('sent varification email. Please check email')
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <div>
                <h3>Please Register</h3>
                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" name="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" name="password" placeholder="Password" />
                    </Form.Group>
                    <p className='text-danger'>{error}</p>
                    {
                        success && <p className='text-success'>You have successfully created an account</p>
                    }
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <p>Already have an account ? Please <Link to="/login">Login</Link></p>
                </Form>
                {loader && <p>Please wait...</p>}
            </div>

        </div>
    );
};

export default Register;