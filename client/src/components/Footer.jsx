import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';



function Footer() {

    return (
        <footer className='bg-zinc-900 shadow-md fixed bottom-0 w-full'>
            <div className="flex justify-between items-center p-5">
                <ul className='text-sky-600 flex gap-4'>
                    <Link to='/'>
                        <li className="hover:underline">Get Representation</li>
                    </Link>
                    <Link to='/about'>
                        <li className='hover:underline'>Casting Directors</li>
                    </Link>
                    <Link to='/search'>
                        <li className='hover:underline'>FAQ</li>
                    </Link>
                    <Link to='/profile'>
                        <li className="hover:under">Terms of Service</li>
                    </Link>
                </ul>

            </div>


        </footer>
    )
}

export default Footer