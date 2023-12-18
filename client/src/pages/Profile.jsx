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
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

function Profile() {
    const fileRef = useRef(null)
    const { currentUser } = useSelector((state) => state.user)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({})
    const [showInfoError, setShowInfoError] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (file) {
            handleFileUpload(file)
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
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json()
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleShowInfo = async () => {
        try {
            setShowInfoError(false);
            const res = await fetch(`/api/user/castings/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                setShowInfoError(true);
                return;
            }
            setUserInfo(data);
        } catch (error) {
            setShowInfoError(true);
        }
    };

    const handleCastingDelete = async (castingId) => {
        try {
            const res = await fetch(`/api/casting/delete/${castingId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }

            setUserInfo((prev) => prev.filter((casting) => casting._id !== castingId));
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="p-3 max-w-lg mx-auto bg-zinc-500 rounded-lg">
            <h1 className="text-5xl font-semibold my-7 text-center" >Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
                <img onClick={() => fileRef.current.click()} className="rounded-full h-25 w-24 object-cover self-center mt-2" src={formData.avatar || currentUser.avatar} alt="profile" />
                <p className='text-sm self-center'>{fileUploadError ?
                    (<span className='text-slate-700'>Error Image Upload</span>) :
                    filePerc > 0 && filePerc < 100 ?
                        (<span className='text-green-700'>{`Uploading ${filePerc}%`}</span>) :
                        filePerc === 100 ?
                            (<span className='text-green-700'>Image successfully uploaded!</span>)
                            : (
                                ''
                            )}
                </p>
                <input type="text" placeholder="username" id="username" defaultValue={currentUser.username} className="border p-3 rounded-lg" onChange={handleChange}></input>
                <input type="email" placeholder="email" id="email" defaultValue={currentUser.email} className="border p-3 rounded-lg" onChange={handleChange}></input>
                <input type="text" placeholder="password" id="password" className="border p-3 rounded-lg" onChange={handleChange}></input>
                <Link className='bg-sky-600 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-submission"}>
                    New Project
                </Link>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">Delete account</span>
                <span className="text-red-700 cursor-pointer">Sign out</span>
            </div>
            <button onClick={handleShowInfo} className='text-sky-600 w-full'>Show Info</button>
            <p className='text-red-700 mt-5'>{showInfoError ? "Error" : ""}</p>
            {userInfo && userInfo.length > 0 && userInfo.map((casting) =>
                <div key={casting._id} className="">
                    <Link to={`/casting/${casting._id}`} >
                        <div className='flex flex-col'>
                            <img src={casting.imageUrls[0]} alt='casting image' className="h-50 w-50 object-contain" />
                            <h1 className="text-black font-bold p-3 mx-auto">{casting.name}</h1>
                        </div>
                        <img src={casting.imageUrls[1]} alt='other image' className="h-50 w-50 object-contain" />
                    </Link>
                    <div className="flex flex-col p-3">
                        <button onClick={() => handleCastingDelete(casting._id)} className='text-black uppercase'>Delete</button>
                        <button className='text-black uppercase'>Edit</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile