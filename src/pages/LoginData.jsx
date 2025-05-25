import React from "react";
import { Link, useNavigate } from "react-router";
import supabase from "../supabase-clients";

export default function LoginData() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        if (!email.includes('@') || password.length < 1) {
            setMessage('Enter a valid email and password (1+ characters)');
            return;
        }

        const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .single();

        if (error || !userData) {
            setMessage('Invalid email or password');
            return;
        }

        if (userData.isBlocked) {
            setMessage('This account has been blocked.');
            return;
        }


        navigate('/dataUsers');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-10">
            <div className="text-center pt-5">
                <h3 className="fs-4 fw-normal">Start your journey!</h3>
                <h2>Sign In to The App</h2>
            </div>
            {message && <span>{message}</span>}
            <form onSubmit={handleSubmit} className="mt-5 p-5 border rounded mx-auto" style={{ maxWidth: "500px", }}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
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
    

                <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </form>
            <p>Don't have an account? <Link to='/SignUp'>Sign Up</Link> </p>
        </div>
    );
}
