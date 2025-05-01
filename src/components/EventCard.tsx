import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventProps {
  event: {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
  };
}

const EventCard: React.FC<EventProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
      <div className="flex items-center text-gray-600 mb-2">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{event.date}</span>
      </div>
      <div className="flex items-center text-gray-600 mb-4">
        <MapPin className="w-4 h-4 mr-2" />
        <span>{event.location}</span>
      </div>
      <p className="text-gray-700">{event.description}</p>
      <Link to={`/events/${event.id}`}>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition duration-300">
          詳細を見る
        </button>
      </Link>
    </div>
  );
};

export default EventCard;