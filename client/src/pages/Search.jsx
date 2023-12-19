import React from 'react'

export default function Search() {
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen max-w-lg'>
                <form className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap text-white font-semibold'>Search Term:</label>
                        <input type="text" id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full' />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center' >
                        <label className='text-white'>Union:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="sag" className='w-5' />
                            <span className='text-white'>SAG/Aftra</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="nonunion" className='w-5' />
                            <span className='text-white'>Non Union</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center' >
                        <label className='text-white font-semibold'>Advanced Search:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="male" className='w-5' />
                            <span className='text-white'>Male</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="female" className='w-5' />
                            <span className='text-white'>Female</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="nonbinary" className='w-5' />
                            <span className='text-white'>Non Binary</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="black" className='w-5' />
                            <span className='text-white'>Black/African American</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="white" className='w-5' />
                            <span className='text-white'>White</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="asain" className='w-5' />
                            <span className='text-white'>Asain/Pacific Islander</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="hispanic" className='w-5' />
                            <span className='text-white'>Hispanic</span>
                        </div>
                    </div>
                    <button className='bg-slate-700 text-white uppercase p-3 hover:opacity-95'>Search</button>
                </form>
            </div>
            <div className=''>
                <h1 className='text-white text-3xl font-semibold border-b p-3 mt-5'>Results:</h1>
            </div>
        </div>
    )
}
