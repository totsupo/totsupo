import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SpotProps {
  spot: {
    id: number;
    name: string;
    description: string;
    image: string;
    address: string;
  };
}

const FeaturedSpot: React.FC<SpotProps> = ({ spot }) => {
  return (
    <Link to={`/spots/${spot.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
        <img 
          src={spot.image} 
          alt={spot.name} 
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{spot.description}</p>
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{spot.address}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedSpot;