import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({ casting }) {

    const [actor, setActor] = useState(null);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchActor = async () => {
            try {
                const res = await fetch(`/api/user/${casting.userRef}`);
                const data = await res.json();
                setActor(data);

            } catch (error) {
                console.log(error);

            }
        }
        fetchActor();

    }, [casting.userRef])
    return (
        <>
            {actor && (
                <div className='flex flex-col gap-2'>
                    <p>Contact <span>{actor.username}</span></p>
                    <textarea name="message" id="message" rows="2" value={message} onChange={onChange} placeholder="Enter message here..." className='w-full border p-3 rounded-lg'></textarea>
                    <Link
                        to={`mailto:${actor.email}?subject="New Role" &body=${message}`} className='bg-sky-600 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                    >
                        Send Message
                    </Link>
                </div>
            )}

        </>
    )
}
