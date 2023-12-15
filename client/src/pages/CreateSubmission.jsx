import React from 'react'

export default function CreateSubmission() {
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7 text-sky-600'>Create Submission</h1>
            <form className='flex flex-col sm:flex-row gap-5'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type="text" placeholder="Name" className="border p-3 rounded-lg" id='name' maxLength={62} minLength={10} required />
                    <input type="text" placeholder="Agency" className="border p-3 rounded-lg" id='agency' required />
                    <input type="text" placeholder="City" className="border p-3 rounded-lg" id='city' required></input>
                    <div className='flex gap-6 flex-wrap'>
                        <div>
                            <input type="checkbox" id='union' className='w-5' />
                            <span className='text-sky-600 font-semibold'>Sag/Aftra</span>
                        </div>
                        <div>
                            <input type="checkbox" id='nonunion' className='w-5' />
                            <span className='text-sky-600 font-semibold'>Non Union</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='text-white font-semibold'>Images
                        <span className='font-normal text-gray-600 ml-2'>the first image will be the cover</span>
                    </p>
                    <div className='flex gap-4'>
                        <input className='p-3 border border-grey-300 bg-gray-300 rounded w-full' type='file' id='images' accept='image/*' />
                        <button className='p-3 text-sky-600 border border-sky-600 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                    </div>
                    <button className='p-3 bg-sky-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Submit Profile</button>
                </div>
            </form>
        </main>
    )
}
