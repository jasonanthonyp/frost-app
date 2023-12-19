
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';


export default function Actor() {
    SwiperCore.use([Navigation])
    const [casting, setCasting] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();
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
    console.log(loading);

    //     return (

    //         <main>
    //             {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
    //             {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
    //             {casting && !loading && !error && (
    //                 <div>
    //                     <div className="flex flex-col uppercase mx-auto">
    //                         <h1 className="text-white font-bold mx-auto">{casting.name}</h1>
    //                         <h2 className="text-white mx-auto">{casting.agency}</h2>
    //                         <h3 className="text-white mx-auto">{casting.city}</h3>
    //                     </div>
    //                     <div className="p-3 max-w-lg mx-auto bg-zinc-500 rounded-lg">
    //                         <img className="h-50 w-50 object-contain" src={casting.imageUrls[0]} />
    //                         <img className="h-50 w-50 object-contain" src={casting.imageUrls[1]} />
    //                     </div>
    //                     <button className="bg-red-700 text-white rounded-lg justify-center w-full">Add to project</button>
    //                 </div>
    //             )}
    //         </main>
    //     );

    // }

    return (
        <main>
            <div className="flex flex-col uppercase mx-auto ">
                <h1 className="text-white font-bold mx-auto p-3">{casting.name}</h1>
                <h2 className="text-white mx-auto">{casting.agency}</h2>
                <h3 className="text-white mx-auto">{casting.city}</h3>
            </div>
            <div className="p-5 h-50 w-50 max-w-lg mx-auto">
                <Swiper navigation>
                    {casting.imageUrls.map((url) => <SwiperSlide key={url}>
                        <div className="">
                            <img src={url} />
                        </div>

                    </SwiperSlide>)}

                </Swiper>
                <button className="bg-red-700 text-white rounded-lg justify-center w-full">Add to project</button>
            </div>
        </main>
    )
}