import React from 'react'
import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';
import { app } from '../firebase';

function Profile() {
    const fileRef = useRef(null)
    const { currentUser } = useSelector((state) => state.user)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormDate] = useState({})
    console.log(formData);

    useEffect(() => {
        if (file) {
            handleFileUpload()
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state.changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setFormData({ ...formData, avatar: downloadURL })
                );
            }
        );

    }

    return (
        <div className="p-3 max-w-lg mx-auto bg-zinc-500 rounded-lg">
            <h1 className="text-5xl font-semibold my-7 text-center" >Profile</h1>
            <form className="flex flex-col gap-4">
                <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
                <img onClick={() => fileRef.current.click()} className="rounded-full h-25 w-24 object-cover self-center mt-2" src={currentUser.avatar} alt="profile" />
                <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg"></input>
                <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg"></input>
                <input type="text" placeholder="password" id="password" className="border p-3 rounded-lg"></input>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">Delete account</span>
                <span className="text-red-700 cursor-pointer">Sign out</span>
            </div>
        </div>
    )
}

export default Profile