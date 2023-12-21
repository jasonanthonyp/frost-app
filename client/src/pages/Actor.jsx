
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux'
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import Contact from "../components/Contact";


export default function Actor() {
    SwiperCore.use([Navigation])
    const [casting, setCasting] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contact, setContact] = useState(false);
    const [frontCard, setFrontCard] = useState(true);
    const params = useParams();
    const currentUser = useSelector((state) => state.user);
    useEffect(() => {
        const fetchCasting = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/casting/get/${params.castingId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setCasting(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchCasting();
    }, [params.castingId]);


    return (

        <main>
            {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
            {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
            {casting && !loading && !error && (
                <div className="flex flex-row gap-5 justify-center">
                    <div className="mt-20 p-4">
                        <h1 className="text-white font-bold text-5xl mx-auto">{casting.name}</h1>
                        <h2 className="text-yellow-700 font-semibold text-3xl mx-auto">{casting.agency}</h2>
                        <h3 className="text-white mx-auto">{casting.city}</h3>
                        <div className="flex flex-col items-center gap-2 mt-10 p-3">
                            {/* <button className="bg-red-700 text-white rounded-lg hover:opacity-95 p-3">Add to project</button> */}
                            {currentUser && casting.userRef !== currentUser._id && !contact && (
                                <button onClick={() => setContact(true)} className="bg-sky-600 text-white rounded-lg hover:opacity-95 p-3">Contact</button>
                            )}
                            {contact && <Contact casting={casting} />}
                        </div>


                    </div>
                    <div className="flex flex-col p-3 max-w-md mx-auto rounded-lg" onClick={() => setFrontCard(!frontCard)}>
                        {frontCard ?
                            <img className="h-50 w-50 object-contain" src={casting.imageUrls[0]} />
                            :

                            <img className="h-50 w-50 object-contain" src={casting.imageUrls[1]} />
                        }
                    </div>
                </div>
            )}
        </main>
    )
};



//     return (
//         <main>
//             <div className="flex flex-col uppercase mx-auto">
//                 <h1 className="text-white font-bold mx-auto">{casting.name}</h1>
//                 <h2 className="text-white mx-auto">{casting.agency}</h2>
//                 <h3 className="text-white mx-auto">{casting.city}</h3>
//             </div>
//             <div className="p-5 h-50 w-50 max-w-lg mx-auto">
//                 <Swiper navigation>
//                     {casting.imageUrls.map((url) => <SwiperSlide key={url}>
//                         <div className="">
//                             <img src={url} />
//                         </div>

//                     </SwiperSlide>)}
//                 </Swiper>
//                 <button className="bg-red-700 text-white rounded-lg justify-center w-full">Add to project</button>

//             </div>
//         </main>
//     )
// }
