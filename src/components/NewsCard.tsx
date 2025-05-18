import React from 'react';
import {Calendar, User} from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsProps {
  news: {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    category: string;
    author?: string;
  };
}

const NewsCard: React.FC<NewsProps> = ({ news }) => {
  return (
    <Link to={`/news/${news.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
        <div className="relative">
          <img 
            src={news.image} 
            alt={news.title} 
            className="w-full h-48 object-cover"
          />
          <span className="absolute top-0 right-0 bg-blue-600 text-white text-sm font-medium px-3 py-1">
            {news.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{news.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{news.excerpt}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{news.date}</span>

            {news.author && (
              <div className="flex items-center text-gray-500 text-sm ml-4">
                <User className="w-4 h-4 mr-1" />
                <span>{news.author}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
