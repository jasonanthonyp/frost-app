import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';

function SignIn() {
    const [formData, setFormData] = useState({})
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.id]: e.target.value,
            });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatchEvent(signInStart);
            const res = await fetch('/api/auth/signin',
                {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                dispatchEvent(signInFailure(data.message));
                return;
            };
            dispatchEvent(signInSuccess(data));
            navigate('/');
        } catch (error) {
            dispatchEvent(signInFaulre(error.message))
        }
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-3xl text-center font-semibold my-y text-sky-600 p-5">Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="email" placeholder="email" className='border p-3 rounded-lg' id='email' onChange={handleChange} />
                <input type="password" placeholder="password" className='border p-3 rounded-lg' id='password' onChange={handleChange} />
                <button disabled={loading} className='bg-zinc-500 text-white p-3 rounded-lg uppercase hover:opacity-95'>{loading ? 'Loading...' : 'Sign In'}</button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p className="text-sky-600">Dont have an account?</p>
                <Link to={"/sign-up"}>
                    <span className="text-blue-700">Sign up</span>
                </Link>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    )
}

export default SignIn