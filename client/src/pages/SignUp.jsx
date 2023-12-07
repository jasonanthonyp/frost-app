import React from 'react'
import { Link } from 'react-router-dom';

function SignUP() {
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-3xl text-center font-semibold my-y text-sky-600 p-5">Sign UP</h1>
            <form className='flex flex-col gap-4'>
                <input type="text" placeholder="username" className='border p-3 rounded-lg' id='username' />
                <input type="email" placeholder="email" className='border p-3 rounded-lg' id='email' />
                <input type="password" placeholder="password" className='border p-3 rounded-lg' id='password' />
                <button className='bg-zinc-500 text-white p-3 rounded-lg uppercase hover:opacity-95'>Sign Up</button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p className="text-sky-600">Have an account?</p>
                <Link to={"/sing-in"}>
                    <span className="text-blue-700">Sign in</span>
                </Link>
            </div>
        </div>
    )
}

export default SignUP