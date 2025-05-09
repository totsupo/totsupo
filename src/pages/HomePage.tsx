import {
	Calendar,
	MapPin,
	Newspaper,
	Phone,
	Star,
	Train,
	Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import FeaturedSpot from "../components/FeaturedSpot";
import NewsCard from "../components/NewsCard";
import { eventsData } from "../data/eventsData";
import { newsData } from "../data/newsData";

const HomePage = () => {
	const news = newsData.slice(0, 4);
	const spots = [
		{
			id: 1,
			name: "戸塚区総合公園",
			description:
				"広大な敷地に野球場やテニスコート、子供の遊び場などを備えた市民の憩いの場。四季折々の自然も楽しめます。",
			image:
				"https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			address: "横浜市戸塚区汲沢町434",
		},
		{
			id: 2,
			name: "柏尾川プロムナード",
			description:
				"戸塚区を流れる柏尾川沿いの遊歩道。桜の名所として知られ、春には多くの人が訪れます。",
			image:
				"https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			address: "横浜市戸塚区戸塚町",
		},
		{
			id: 3,
			name: "東戸塚駅前商店街",
			description:
				"東戸塚駅周辺に広がる活気ある商店街。地元の人々の日常を支える様々な店舗が軒を連ねています。",
			image:
				"https://images.unsplash.com/photo-1555661530-68c8e98db4e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			address: "横浜市戸塚区川上町",
		},
	];
	const events = eventsData.slice(0, 3);

	// Featured restaurants for the food section
	const restaurants = [
		{
			id: 1,
			name: "トツカ コーヒー",
			category: "カフェ",
			description:
				"戸塚駅西口から徒歩3分の場所にある、地元食材を使用したカフェ。季節のフルーツを使ったスイーツが人気です。",
			image:
				"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			address: "横浜市戸塚区戸塚町16-5",
			rating: 4.5,
		},
		{
			id: 2,
			name: "戸塚うどん",
			category: "和食",
			description:
				"創業50年の老舗うどん店。コシのある自家製麺と濃厚なだしが特徴です。季節限定メニューも楽しめます。",
			image:
				"https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			address: "横浜市戸塚区戸塚町18-1",
			rating: 4.7,
		},
		{
			id: 3,
			name: "ビストロ トツカ",
			category: "フレンチ",
			description:
				"地元の食材を使った本格フレンチを気軽に楽しめるビストロ。ワインの種類も豊富で、ペアリングを楽しめます。",
			image:
				"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
			address: "横浜市戸塚区川上町88-1",
			rating: 4.3,
		},
	];

	// Function to render stars based on rating
	const renderStars = (rating: number) => {
		const stars = [];
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 !== 0;

		for (let i = 0; i < fullStars; i++) {
			stars.push(
				<Star
					key={`full-${i}`}
					className="w-4 h-4 fill-yellow-400 text-yellow-400"
				/>,
			);
		}

		if (hasHalfStar) {
			stars.push(
				<div key="half" className="relative">
					<Star className="w-4 h-4 text-yellow-400" />
					<div className="absolute top-0 left-0 overflow-hidden w-1/2">
						<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
					</div>
				</div>,
			);
		}

		const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
		for (let i = 0; i < emptyStars; i++) {
			stars.push(
				<Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />,
			);
		}

		return <div className="flex">{stars}</div>;
	};

	return (
		<div>
			{/* Hero Section */}
			<div className="relative">
				<div
					className="w-full h-[60vh] bg-cover bg-center"
					style={{
						backgroundImage:
							"url(https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)",
					}}
				>
					<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
						<div className="text-center text-white px-4">
							<h1 className="text-4xl md:text-6xl font-bold mb-4">
								戸塚ぽーたる
							</h1>
							<p className="text-xl md:text-2xl">
								横浜市戸塚区の魅力を発信するローカルメディア
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Latest News Section */}
			<section className="py-12 px-4 max-w-7xl mx-auto">
				<div className="flex items-center mb-8">
					<Newspaper className="w-6 h-6 mr-2 text-blue-600" />
					<h2 className="text-3xl font-bold">最新ニュース</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{news.map((item) => (
						<NewsCard key={item.id} news={item} />
					))}
				</div>
				<div className="text-center mt-8">
					<Link to="/news">
						<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
							ニュース一覧を見る
						</button>
					</Link>
				</div>
			</section>

			{/* Upcoming Events Section - Moved up */}
			<section className="py-12 px-4 bg-gray-100">
				<div className="max-w-7xl mx-auto">
					<div className="flex items-center mb-8">
						<Calendar className="w-6 h-6 mr-2 text-blue-600" />
						<h2 className="text-3xl font-bold">イベント情報</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{events.map((event) => (
							<EventCard key={event.id} event={event} />
						))}
					</div>
					<div className="text-center mt-8">
						<Link to="/events">
							<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
								イベント一覧を見る
							</button>
						</Link>
					</div>
				</div>
			</section>

			{/* Featured Spots Section - Moved down */}
			<section className="py-12 px-4 max-w-7xl mx-auto">
				<div className="flex items-center mb-8">
					<MapPin className="w-6 h-6 mr-2 text-blue-600" />
					<h2 className="text-3xl font-bold">戸塚の名所</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{spots.map((spot) => (
						<FeaturedSpot key={spot.id} spot={spot} />
					))}
				</div>
				<div className="text-center mt-8">
					<Link to="/spots">
						<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
							スポット一覧を見る
						</button>
					</Link>
				</div>
			</section>

			{/* Food Section - New section */}
			<section className="py-12 px-4 bg-gray-100">
				<div className="max-w-7xl mx-auto">
					<div className="flex items-center mb-8">
						<Utensils className="w-6 h-6 mr-2 text-blue-600" />
						<h2 className="text-3xl font-bold">グルメ</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{restaurants.map((restaurant) => (
							<div
								key={restaurant.id}
								className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
							>
								<img
									src={restaurant.image}
									alt={restaurant.name}
									className="w-full h-56 object-cover"
								/>
								<div className="p-4">
									<div className="flex justify-between items-start mb-2">
										<h3 className="text-xl font-semibold">{restaurant.name}</h3>
										<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
											{restaurant.category}
										</span>
									</div>
									<p className="text-gray-600 mb-4 line-clamp-3">
										{restaurant.description}
									</p>
									<div className="flex items-center text-gray-500 mb-2">
										<MapPin className="w-4 h-4 mr-1" />
										<span className="text-sm">{restaurant.address}</span>
									</div>
									<div className="flex items-center">
										{renderStars(restaurant.rating)}
										<span className="ml-1 text-sm text-gray-600">
											{restaurant.rating}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="text-center mt-8">
						<Link to="/food">
							<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
								グルメ情報をもっと見る
							</button>
						</Link>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section className="py-12 px-4 max-w-7xl mx-auto">
				<div className="bg-white p-8 rounded-lg shadow-md">
					<h2 className="text-3xl font-bold mb-4 text-center">
						戸塚ぽーたるについて
					</h2>
					<p className="text-lg text-gray-700 mb-6 text-center">
						「戸塚ぽーたる」は、横浜市戸塚区の魅力を発信するローカルメディアです。
						<br />
						地域の最新ニュース、イベント情報、おすすめスポットなど、戸塚区の魅力を余すことなくお伝えします。
					</p>
					<div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
						<div className="flex items-center">
							<Phone className="w-6 h-6 mr-2 text-blue-600" />
							<span>045-XXX-XXXX</span>
						</div>
						<div className="flex items-center">
							<MapPin className="w-6 h-6 mr-2 text-blue-600" />
							<span>横浜市戸塚区戸塚町XX-XX</span>
						</div>
						<div className="flex items-center">
							<Train className="w-6 h-6 mr-2 text-blue-600" />
							<span>JR・市営地下鉄「戸塚駅」から徒歩5分</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
