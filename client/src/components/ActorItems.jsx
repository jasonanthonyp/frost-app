import { Link } from 'react-router-dom';

export default function ActorItems({ casting }) {
    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg'>
            <Link to={`/casting/${casting._id}`}>
                <img src={casting.imageUrls[0]} alt='headshot' className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' />
                <div className='p-3'>
                    <p className='truncate text-lg font-semibold'>{casting.name}</p>
                </div>
            </Link>
        </div>
    )
}
