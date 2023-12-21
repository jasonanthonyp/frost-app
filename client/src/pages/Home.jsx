import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="bg-[url('https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/52714/article_full%401x.jpg')] bg-no-repeat h-screen bg-cover">
            <div className='flex flex-col gap-6 p-28 px-3 max-w-3xl mx-auto bg-white bg-opacity-50 rounded-lg'>
                <h1 className='text-sky-600 font bold text-6xl lg:text-6x'>
                    Cast your next <span className='text-sky-700 font-semibold'>big</span><br />project
                </h1>
                <div className='text-sky-700 font-bold text-xs sm:text-sm'>
                    Chill with Frost: <span className='text-yellow-700'>Unleash the Cinematic Magic</span>, Casting Your Newest Film Made Easy.
                    <br />
                    Find the best Actors to make your dream project a reality.
                </div>
                <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
                    Lets Get Started...
                </Link>
            </div>
        </div>
    )
}

export default Home