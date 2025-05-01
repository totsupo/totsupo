import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Phone, Globe, Tag, ArrowLeft, Info, Users } from 'lucide-react';
import { eventsData } from '../data/eventsData';
import EventCard from '../components/EventCard';

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id || '0', 10);

  const event = eventsData.find(item => item.id === eventId);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">イベントが見つかりませんでした</h1>
          <Link to="/events" className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            イベント一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  // Get related events
  const relatedEvents = event.relatedEvents
    ? eventsData.filter(item => event.relatedEvents?.includes(item.id))
    : [];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">ホーム</Link>
            <span className="mx-2">/</span>
            <Link to="/events" className="hover:text-blue-600">イベント</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{event.title}</span>
          </nav>
        </div>

        {/* Event Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-80 object-cover"
            />
          )}
          <div className="p-6">
            {event.category && (
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-4 inline-block">
                {event.category}
              </span>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
            <p className="text-lg text-gray-700 mb-6">{event.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">開催日</h3>
                  <p className="text-gray-600">{event.date}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">開催場所</h3>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>

              {event.organizer && (
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">主催</h3>
                    <p className="text-gray-600">{event.organizer}</p>
                  </div>
                </div>
              )}

              {event.fee && (
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">参加費</h3>
                    <p className="text-gray-600">{event.fee}</p>
                  </div>
                </div>
              )}

              {event.contact && (
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">お問い合わせ</h3>
                    <p className="text-gray-600">{event.contact}</p>
                  </div>
                </div>
              )}

              {event.website && (
                <div className="flex items-start">
                  <Globe className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">ウェブサイト</h3>
                    <a
                      href={event.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {event.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">イベント詳細</h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: event.fullDescription || '' }}
          />

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-4 h-4 text-gray-500" />
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">関連イベント</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedEvents.map(relatedEvent => (
                <EventCard key={relatedEvent.id} event={relatedEvent} />
              ))}
            </div>
          </div>
        )}

        {/* Back to Events */}
        <div className="mt-8 text-center">
          <Link
            to="/events"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            イベント一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
