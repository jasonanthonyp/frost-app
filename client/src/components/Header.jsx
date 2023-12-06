import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <header className='bg-zinc-900 shadow-md'>
            <div className="flex justify-between items-center p-3">
                <Link to='/'>
                    <h1 className="font-bold flex flex-wrap">
                        <span className="text-sky-600">FROST</span>
                    </h1>
                </Link>
                <form className="bg-zinc-600 rounded-lg flex items-center p-3">
                    <input type="text" placeholder="Search..." className='bg-transparent focus:outline-none' />
                    <FaSearch className="text-zinc-500" />
                </form>
                <ul className='text-sky-600 flex gap-4'>
                    <Link to='/home'>
                        <li className="hover:underline">Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='hover:underline'>About</li>
                    </Link>
                    <Link to='/sign-in'>
                        <li className="hover:under">Sign In</li>
                    </Link>
                </ul>

            </div>


        </header>
    )
}

export default Header