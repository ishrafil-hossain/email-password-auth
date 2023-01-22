import { getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { app } from '../../firebase/firebase.init';

const auth = getAuth(app)

const Login = () => {
    const [users, setUsers] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [userEmail, setUserEmail] = useState('');
    const [varified, setVarified] = useState(false);


    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setVarified(false)
        // console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const varify = result.user.emailVerified;
                // console.log(varify);

                if (!varify) {
                    setVarified(true)
                    form.reset()
                    return
                }
                setUsers(result.user.email)
                form.reset()
            })
            .catch(error => {
                console.log(error)
                setPasswordError("Email or Password is incorrect")
            })
    }
    // Get email from email input field 
    const forgetPassword = e => {
        const email = e.target.value;
        setUserEmail(email)
    }
    // Forget Password 
    const handleForgetPassword = () => {
        if (!userEmail) {
            alert('Please enter your E-mail')
            return
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('sent reset email, Please check your email')
            })
            .catch(error => {
                setPasswordError(error)
            })
    }

    // Send a user a verification email 
    const emailVarified = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('sent varification email. Please check email')
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h4 className='mb-5'>Login with your email and a password.</h4>
            <Form onSubmit={handleSignIn}>
                <Form.Group onBlur={forgetPassword} className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" name="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <p className='text-danger'>{passwordError}</p>
                <p className='text-primary'>{users}</p>
                {varified && <p className='text-danger'>E-mail isn't varified <Link onClick={emailVarified}>Please verify</Link>
                </p>}


                <Button variant="primary" type="submit">
                    Login
                </Button>
                <p>Don't have an account yet? <Link to="/register">Register</Link></p>
                <Link onClick={handleForgetPassword}>Forgot your password?</Link>
            </Form>
        </div>
    );
};

export default Login;