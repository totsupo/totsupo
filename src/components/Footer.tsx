import {
	Coffee,
	Facebook,
	Instagram,
	Mail,
	MapPin,
	Phone,
	Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white">
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* About */}
					<div>
						<div className="flex items-center mb-4">
							<Coffee className="h-6 w-6 text-blue-400" />
							<span className="ml-2 text-xl font-bold">戸塚ぽーたる</span>
						</div>
						<p className="text-gray-300 mb-4">
							横浜市戸塚区の魅力を発信するローカルメディア。地域の最新ニュース、イベント情報、おすすめスポットなどをお届けします。
						</p>
						<div className="flex space-x-4 mt-6">
							<a
								href="#"
								className="text-gray-300 hover:text-white transition-colors"
							>
								<Facebook className="h-5 w-5" />
							</a>
							<a
								href="#"
								className="text-gray-300 hover:text-white transition-colors"
							>
								<Twitter className="h-5 w-5" />
							</a>
							<a
								href="#"
								className="text-gray-300 hover:text-white transition-colors"
							>
								<Instagram className="h-5 w-5" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
							サイトマップ
						</h3>
						<div className="grid grid-cols-2 gap-2">
							<Link
								to="/"
								className="text-gray-300 hover:text-white py-1 transition-colors"
							>
								ホーム
							</Link>
							<Link
								to="/news"
								className="text-gray-300 hover:text-white py-1 transition-colors"
							>
								ニュース
							</Link>
							<Link
								to="/events"
								className="text-gray-300 hover:text-white py-1 transition-colors"
							>
								イベント
							</Link>
							<Link
								to="/spots"
								className="text-gray-300 hover:text-white py-1 transition-colors"
							>
								スポット
							</Link>
							<Link
								to="/food"
								className="text-gray-300 hover:text-white py-1 transition-colors"
							>
								グルメ
							</Link>
							<Link
								to="/contact"
								className="text-gray-300 hover:text-white py-1 transition-colors"
							>
								お問い合わせ
							</Link>
						</div>
					</div>

					{/* Contact */}
					<div>
						<h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
							お問い合わせ
						</h3>
						<address className="not-italic">
							<div className="flex items-start mb-3">
								<Phone className="h-5 w-5 mr-3 text-blue-400 mt-0.5" />
								<div>
									<p className="text-gray-300">045-XXX-XXXX</p>
									<p className="text-sm text-gray-400">平日 9:00〜18:00</p>
								</div>
							</div>
							<div className="flex items-start mb-3">
								<Mail className="h-5 w-5 mr-3 text-blue-400 mt-0.5" />
								<div>
									<p className="text-gray-300">info@totsuka-portal.jp</p>
									<p className="text-sm text-gray-400">24時間受付</p>
								</div>
							</div>
							<div className="flex items-start">
								<MapPin className="h-5 w-5 mr-3 text-blue-400 mt-0.5" />
								<div>
									<p className="text-gray-300">横浜市戸塚区戸塚町XX-XX</p>
									<p className="text-sm text-gray-400">
										JR・市営地下鉄「戸塚駅」から徒歩5分
									</p>
								</div>
							</div>
						</address>
					</div>
				</div>

				<div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
					<p>
						&copy; {new Date().getFullYear()} 戸塚ぽーたる All Rights Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
