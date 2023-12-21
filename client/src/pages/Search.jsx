import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActorItems from '../components/ActorItems';

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        sag: false,
        nonunion: false,
    });

    const [loading, setLoading] = useState(false);
    const [castings, setCastings] = useState([]);
    const [showMore, setShowMore] = useState();
    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sagFromUrl = urlParams.get('sag');
        const nonunionFromUrl = urlParams.get('nonunion');

        if (
            searchTermFromUrl ||
            sagFromUrl ||
            nonunionFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                sag: sagFromUrl || 'true' ? true : false,
                nonunion: nonunionFromUrl || 'true' ? true : false,
            });
        }


        const fetchCastings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/casting/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
            setCastings(data);
            setLoading(false);

        };

        fetchCastings();
    }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }
        if (e.target.id === 'sag' || e.target.id === 'nonunion') {
            setSidebardata({ ...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false })
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm', sidebardata.searchTerm)
        urlParams.set('sag', sidebardata.sag)
        urlParams.set('nonunion', sidebardata.nonunion)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`);
    };

    const onShowMoreClick = async () => {
        const numberOfCastings = castings.length;
        const startIndex = numberOfCastings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/casting/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
            setShowMore(false);
        }
        setCastings([...castings, ...data]);
    };

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen max-w-lg'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap text-white font-semibold'>Search Term:</label>
                        <input type="text" id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full' value={sidebardata.searchTerm} onChange={handleChange} />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center' >
                        <label className='text-white'>Union:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="sag" className='w-5' onChange={handleChange} checked={sidebardata.sag} />
                            <span className='text-white'>SAG/Aftra</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="nonunion" className='w-5' onChange={handleChange} checked={sidebardata.nonunion} />
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
                    <button className='bg-yellow-700 text-white uppercase rounded-lg p-3 hover:opacity-95'>Search</button>
                </form>
            </div>
            <div className=''>
                <h1 className='text-white text-3xl font-semibold border-b p-3 mt-5'>Results:</h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && castings.length === 0 && (
                        <p className='text-xl text-yellow-700'>None Found</p>
                    )}
                    {loading && (
                        <p className='text-xl text-black text-center w-full'>Loading...</p>
                    )}

                    {!loading && castings && castings.map((casting) => <ActorItems key={casting._id} casting={casting} />)}
                    {showMore && (
                        <button onClick={onShowMoreClick} className='text-sky-600 hover:underlin p-7 text-center w-full'>Show More</button>
                    )}
                </div>
            </div>
        </div>
    )
}
