import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {

    const { currentUser } = useSelector((state) => state.user)
    return (
        <div className="p-3 max-w-lg mx-auto bg-zinc-400 rounded-sm">
            <h1 className="text-5xl font-semibold my-7 text-center" >Profile</h1>
            <form className="flex flex-col">
                <img className="rounded-full h-25 w-24 object-cover self-center mt-2" src={currentUser.avatar} alt="profile" />
                <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg"></input>
            </form>
        </div>
    )
}

export default Profile