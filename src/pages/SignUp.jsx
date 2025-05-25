import React, { useEffect } from "react";
import { Link } from "react-router";
import supabase from "../supabase-clients";

export default function SignUpData() {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [message, setMessage] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        if (!email.includes('@') || password.length < 1) {
            setMessage('Enter a valid email and password (1+ characters)');
            return;
        }
        const { data: dataSignUp, error: errorSignUp } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (errorSignUp || !dataSignUp.user) {
            setMessage(errorSignUp?.message || 'Unknown error during sign up');
            return;
        }

        const authUserId = dataSignUp.user.id;

        const { error: insertError } = await supabase.from('users').insert({
            email,
            password,
            name,
            auth_id: authUserId
        });

        if (insertError) {
            setMessage('Account created, but failed to add to database.');
            return;
        }

        setMessage('User account created!');
        setEmail('');
        setPassword('');
        setName('');
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-10">
            <div className="text-center pt-5">
                <h3 className="fs-4 fw-normal">Start your journey!</h3>
                <h2>Sign Up to The App</h2>
            </div>
            {message && <span>{message}</span>}
            <form onSubmit={handleSubmit} className="mt-5 p-5 border rounded mx-auto" style={{ maxWidth: "500px",}}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputName1" className="form-label">Name</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        required
                        autoComplete="auto"
                    />
                </div>


                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
            <p>Have an account? <Link to='/'>Sign In</Link> </p>
        </div>
    )
}