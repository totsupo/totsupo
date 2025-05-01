import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Star, Phone, Globe, Clock } from 'lucide-react';

interface Restaurant {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  address: string;
  rating: number;
  priceRange: string;
  features?: string[];
  fullDescription?: string;
  hours?: string;
  phone?: string;
  website?: string;
  paymentOptions?: string[];
  popularDishes?: {name: string; price: string; description: string; image?: string}[];
  nearbyRestaurants?: number[];
}

const FoodDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = parseInt(id || '0', 10);

  // This would ideally come from a data file like newsData or eventsData
  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'トツカ コーヒー',
      category: 'カフェ',
      description: '戸塚駅西口から徒歩3分の場所にある、地元食材を使用したカフェ。季節のフルーツを使ったスイーツが人気です。',
      fullDescription: `
        <p>戸塚駅西口から徒歩3分の場所にある「トツカ コーヒー」は、地元の食材にこだわったカフェです。店内は木を基調とした温かみのある内装で、窓からは戸塚の街並みを眺めることができます。</p>
        
        <p>オーナーの佐藤さんは「地元戸塚の魅力を多くの人に知ってもらいたい」という思いから、神奈川県内の農家から直接仕入れた新鮮な食材を使用したメニューを提供しています。</p>
        
        <p>特に人気なのは、季節のフルーツを使ったスイーツ。春には戸塚区内の農園で採れたいちごを使ったパフェ、夏には地元の桃を使ったタルトなど、季節ごとに変わるメニューが楽しめます。</p>
        
        <p>コーヒー豆は横浜市内の焙煎所から仕入れており、一杯一杯丁寧に淹れるハンドドリップコーヒーが評判です。また、オリジナルブレンドの「トツカブレンド」は豆の販売も行っており、お土産としても人気です。</p>
        
        <p>食事メニューも充実しており、地元野菜をたっぷり使ったサンドイッチやキッシュ、季節の野菜カレーなどがあります。ランチタイムには、ドリンク付きのセットメニューもあり、リーズナブルに楽しめます。</p>
        
        <p>Wi-Fiも完備しており、仕事や勉強にも利用できる空間となっています。平日の午後は比較的空いていることが多く、ゆったりとした時間を過ごすことができます。</p>
      `,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町16-5',
      rating: 4.5,
      priceRange: '¥¥',
      features: ['Wi-Fi完備', 'テイクアウト可', '禁煙', '電源あり', 'ペット可（テラス席）'],
      hours: '10:00〜20:00（L.O. 19:30）、水曜定休',
      phone: '045-XXX-XXXX',
      website: 'https://www.totsuka-coffee.jp',
      paymentOptions: ['現金', 'クレジットカード', '電子マネー', 'QRコード決済'],
      popularDishes: [
        {
          name: '季節のフルーツパフェ',
          price: '850円',
          description: '旬のフルーツをたっぷり使用したパフェ。季節によって内容が変わります。',
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: 'トツカブレンド',
          price: '550円',
          description: '横浜市内の焙煎所と共同開発したオリジナルブレンド。まろやかな口当たりと豊かな香りが特徴。',
          image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: '地元野菜のキッシュプレート',
          price: '1,200円',
          description: '戸塚区内の農家から仕入れた新鮮野菜を使ったキッシュとサラダのセット。パンとドリンク付き。',
          image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        }
      ],
      nearbyRestaurants: [2, 4, 9]
    },
    {
      id: 2,
      name: '戸塚うどん',
      category: '和食',
      description: '創業50年の老舗うどん店。コシのある自家製麺と濃厚なだしが特徴です。季節限定メニューも楽しめます。',
      fullDescription: `
        <p>「戸塚うどん」は、創業50年を誇る戸塚区の老舗うどん店です。店主の田中さんは3代目で、先代から受け継いだ製麺技術と秘伝のだしの製法を守りながら、現代の味覚に合わせた新しいメニューも提供しています。</p>
        
        <p>うどんは毎朝店内で手打ちされており、コシがありながらも喉越しの良い麺が特徴です。使用する小麦粉は国産にこだわり、安全で風味豊かな麺に仕上げています。</p>
        
        <p>だしは、鹿児島県産の枕崎かつお節と北海道産の昆布を使用した本格的な和風だし。これに地元の醤油メーカーと共同開発した特製醤油を合わせることで、深みのある味わいを実現しています。</p>
        
        <p>定番メニューの「釜揚げうどん」は、シンプルながらも素材の良さを最大限に引き出した一品。熱々のうどんを特製のつゆにつけて食べる「釜揚げうどん」は、うどん本来の味わいを楽しめると常連客に人気です。</p>
        
        <p>季節限定メニューも充実しており、夏には冷たい「梅おろしうどん」、冬には体が温まる「鴨南蛮うどん」など、四季折々の味を楽しむことができます。また、地元の野菜を使った天ぷらも人気で、サクサクの食感と素材の甘みを楽しめます。</p>
        
        <p>店内は落ち着いた和の雰囲気で、カウンター席と座敷があります。家族連れでも気軽に利用できる座敷席は、週末には予約で埋まることも多いため、事前の連絡をおすすめします。</p>
      `,
      image: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町18-1',
      rating: 4.7,
      priceRange: '¥¥',
      features: ['座敷あり', '個室あり', '禁煙', '駐車場あり'],
      hours: '11:00〜15:00、17:00〜21:00（L.O. 20:30）、月曜定休',
      phone: '045-XXX-XXXX',
      website: 'https://www.totsuka-udon.jp',
      paymentOptions: ['現金', 'クレジットカード', '電子マネー'],
      popularDishes: [
        {
          name: '釜揚げうどん',
          price: '850円',
          description: '熱々のうどんを特製のつゆにつけて食べる、シンプルながらも素材の良さを最大限に引き出した一品。',
          image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: '鴨南蛮うどん',
          price: '1,200円',
          description: '香ばしく焼いた鴨肉と九条ねぎをのせた温かいうどん。濃厚なだしと鴨の旨味が絶妙に絡み合います。',
          image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: '季節の野菜天ぷら盛り合わせ',
          price: '800円',
          description: '地元農家から仕入れた旬の野菜を使った天ぷら。サクサクの食感と素材の甘みを楽しめます。',
          image: 'https://images.unsplash.com/photo-1619221882266-0a6f63a9e8a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        }
      ],
      nearbyRestaurants: [1, 6, 9]
    },
    {
      id: 3,
      name: 'ビストロ トツカ',
      category: 'フレンチ',
      description: '地元の食材を使った本格フレンチを気軽に楽しめるビストロ。ワインの種類も豊富で、ペアリングを楽しめます。',
      fullDescription: `
        <p>「ビストロ トツカ」は、東戸塚駅から徒歩7分の場所にある、気軽に本格フレンチを楽しめるビストロです。シェフの山田氏はフランスで10年間修業した後、地元戸塚の魅力ある食材を活かした料理を提供したいという思いから、2018年にこの店をオープンしました。</p>
        
        <p>メニューは季節ごとに変わり、神奈川県内の契約農家から直接仕入れた新鮮な野菜や、三浦半島の魚介類、相模湾の海の幸など、地元の食材を中心に使用しています。フランスの伝統的な調理法に、日本の食材の特性を活かしたアレンジを加えた独創的な料理が特徴です。</p>
        
        <p>特に人気なのは、ランチタイムに提供される「マルシェコース」。前菜、メイン、デザートがセットになったコースで、平日は2,500円、週末は3,000円とリーズナブルな価格で本格フレンチを楽しむことができます。</p>
        
        <p>ディナータイムには、より本格的なコースメニューが楽しめます。「シェフおまかせコース」は、その日に仕入れた最も良い状態の食材を使った特別なコースで、予約必須の人気メニューです。</p>
        
        <p>ワインの種類も豊富で、フランスを中心に世界各国から厳選されたワインが約100種類揃っています。ソムリエの資格を持つスタッフが、料理に合わせた最適なワインを提案してくれるペアリングも人気です。</p>
        
        <p>店内は木と石を基調としたシックな内装で、カウンター席とテーブル席があります。カウンター席ではシェフの調理の様子を間近で見ることができ、料理への情熱を感じることができます。また、6名以上で利用できる個室もあり、特別な日のディナーや接待にも適しています。</p>
      `,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区川上町88-1',
      rating: 4.3,
      priceRange: '¥¥¥',
      features: ['ワイン豊富', '個室あり', '予約推奨', 'コース料理', '禁煙'],
      hours: 'ランチ 11:30〜14:00（L.O. 13:30）、ディナー 17:30〜22:00（L.O. 21:00）、月曜定休',
      phone: '045-XXX-XXXX',
      website: 'https://www.bistro-totsuka.jp',
      paymentOptions: ['現金', 'クレジットカード', '電子マネー'],
      popularDishes: [
        {
          name: 'マルシェコース',
          price: '平日2,500円、週末3,000円',
          description: '季節の前菜、メイン料理、デザートがセットになったランチコース。平日限定のグラスワイン付きプランも人気。',
          image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: '三浦半島産鮮魚のポワレ',
          price: '2,200円',
          description: 'その日に仕入れた新鮮な魚を香ばしく焼き上げ、季節の野菜と特製ソースで仕上げた一品。',
          image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: 'シェフおまかせコース',
          price: '6,500円〜',
          description: 'その日に仕入れた最も良い状態の食材を使った特別なコース。前菜からデザートまで、シェフの創意溢れる料理を堪能できます。',
          image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        }
      ],
      nearbyRestaurants: [5, 8]
    },
    {
      id: 4,
      name: '戸塚ラーメン',
      category: 'ラーメン',
      description: '濃厚な豚骨スープが特徴の人気ラーメン店。深夜まで営業しているため、仕事帰りの利用も多いです。',
      fullDescription: `
        <p>「戸塚ラーメン」は、JR戸塚駅から徒歩5分の場所にある、濃厚な豚骨スープが特徴の人気ラーメン店です。2010年のオープン以来、地元の人々に愛され続け、週末には行列ができることも珍しくありません。</p>
        
        <p>看板メニューの「特製豚骨ラーメン」は、豚骨を12時間以上煮込んで作る濃厚なスープが特徴。クリーミーでありながらも後味はさっぱりとしており、何度でも食べたくなる味わいです。トッピングには、低温調理でしっとりと仕上げたチャーシュー、味玉、メンマ、九条ねぎなどが乗り、見た目にも美しい一杯です。</p>
        
        <p>麺は中太ストレート麺を使用し、スープとの絡みを重視して特注で作られています。もちもちとした食感と小麦の風味が豊かで、スープとの相性は抜群です。</p>
        
        <p>「特製豚骨ラーメン」の他にも、あっさりとした「塩ラーメン」や、ピリ辛の「辛味噌ラーメン」など、バリエーション豊かなメニューが揃っています。また、サイドメニューの「特製餃子」も人気で、皮はパリッと、中はジューシーな餃子は、ラーメンとの相性も抜群です。</p>
        
        <p>店内はカウンター席が中心で、一人でも気軽に入れる雰囲気。深夜2時まで営業しているため、仕事帰りや飲み会後の〆のラーメンとしても人気があります。また、テイクアウトも可能で、特製チャーシュー丼や餃子などを持ち帰ることができます。</p>
        
        <p>店主の佐々木さんは「お客様に喜んでもらえる一杯を提供したい」という思いから、毎日早朝からスープの仕込みを行い、材料の仕入れにもこだわっています。その情熱が詰まったラーメンは、多くのファンを魅了し続けています。</p>
      `,
      image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町15-2',
      rating: 4.2,
      priceRange: '¥',
      features: ['深夜営業', 'テイクアウト可', '喫煙可（分煙）'],
      hours: '11:00〜15:00、18:00〜翌2:00、水曜定休',
      phone: '045-XXX-XXXX',
      website: 'https://www.totsuka-ramen.jp',
      paymentOptions: ['現金', '電子マネー'],
      popularDishes: [
        {
          name: '特製豚骨ラーメン',
          price: '950円',
          description: '12時間以上煮込んだ濃厚な豚骨スープに、特製チャーシュー、味玉、メンマ、九条ねぎをトッピング。',
          image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: '辛味噌ラーメン',
          price: '980円',
          description: '豚骨スープに特製の辛味噌を加えた一品。辛さは3段階から選べます。',
          image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: '特製餃子',
          price: '6個 550円',
          description: '皮はパリッと、中はジューシーな自家製餃子。ラーメンとの相性抜群です。',
          image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        }
      ],
      nearbyRestaurants: [1, 6, 9]
    },
    {
      id: 5,
      name: '東戸塚イタリアン',
      category: 'イタリアン',
      description: '東戸塚駅近くの本格イタリアン。手打ちパスタと石窯ピザが人気です。ランチセットはコスパ抜群。',
      fullDescription: `
        <p>「東戸塚イタリアン」は、東戸塚駅から徒歩3分の場所にある、本格的なイタリア料理を提供するレストランです。2015年のオープン以来、手打ちパスタと石窯で焼き上げるピザを中心に、本場イタリアの味を追求し続けています。</p>
        
        <p>オーナーシェフの高橋氏は、イタリア・トスカーナ地方で5年間修業した経験を持ち、現地で学んだ伝統的な調理法と日本人の味覚に合わせたアレンジを絶妙に融合させています。</p>
        
        <p>パスタは毎日店内で手打ちされており、モチモチとした食感と小麦の香りが特徴です。特に人気の「ボロネーゼ」は、牛肉と豚肉をじっくり6時間以上煮込んだソースと手打ちタリアテッレの組み合わせが絶妙で、多くのリピーターを生んでいます。</p>
        
        <p>ピザは、店内に設置された本格的な石窯で高温で一気に焼き上げることで、外はカリッと、中はもっちりとした食感を実現。「マルゲリータ」や「クワトロフォルマッジ」などの定番メニューから、季節限定の創作ピザまで、バリエーション豊かに提供しています。</p>
        
        <p>ランチタイムには、パスタまたはピザにサラダとドリンクがセットになった「ランチセット」が1,200円から楽しめ、コストパフォーマンスの高さでも評判です。</p>
        
        <p>ディナータイムには、前菜からデザートまで楽しめるコースメニューも提供。イタリア各地から厳選されたワインとのペアリングも楽しめます。</p>
        
        <p>店内は、木と石を基調としたナチュラルな内装で、テラス席も完備。天気の良い日には、開放的な空間でイタリア料理を楽しむことができます。また、8名まで利用可能な個室もあり、記念日や接待などの特別な機会にも対応しています。</p>
      `,
      image: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区川上町91-1',
      rating: 4.4,
      priceRange: '¥¥',
      features: ['ランチセット', 'テラス席あり', '禁煙', '個室あり', 'ワイン豊富'],
      hours: 'ランチ 11:30〜15:00（L.O. 14:30）、ディナー 17:30〜22:00（L.O. 21:00）、月曜定休',
      phone: '045-XXX-XXXX',
      website: 'https://www.higashi-totsuka-italian.jp',
      paymentOptions: ['現金', 'クレジットカード', '電子マネー'],
      popularDishes: [
        {
          name: '手打ちタリアテッレ ボロネーゼ',
          price: '1,400円',
          description: '牛肉と豚肉をじっくり6時間以上煮込んだソースと手打ちタリアテッレの組み合わせが絶妙な一品。',
          image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: 'マルゲリータ',
          price: '1,200円',
          description: '石窯で焼き上げた本格ピザ。モッツァレラチーズ、バジル、トマトソースのシンプルな組み合わせが絶妙です。',
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: 'ランチセット',
          price: '1,200円〜',
          description: 'パスタまたはピザにサラダとドリンクがセットになったお得なランチメニュー。平日限定のドルチェ付きプランも人気。',
          image: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        }
      ],
      nearbyRestaurants: [3, 8]
    },
    {
      id: 6,
      name: '戸塚焼肉',
      category: '焼肉',
      description: '厳選された国産牛を使用した焼肉店。プライベート感のある個室も完備しており、家族連れにも人気です。',
      fullDescription: `
        <p>「戸塚焼肉」は、JR戸塚駅から徒歩8分の場所にある、厳選された国産牛を使用した本格焼肉店です。2012年のオープン以来、肉の質と鮮度にこだわり、多くの焼肉ファンから支持を集めています。</p>
        
        <p>店主の鈴木氏は、元々精肉店を営んでいた経験を活かし、自ら市場に足を運んで最高級の肉を仕入れています。特に黒毛和牛は、A5ランクのみを使用し、きめ細かな霜降りと濃厚な旨味が特徴です。</p>
        
        <p>メニューは、リーズナブルな「カルビ」や「ロース」から、特選の「シャトーブリアン」や「ザブトン」まで幅広く取り揃えています。特に人気の「特選盛り合わせ」は、その日のおすすめ部位を盛り合わせたもので、様々な部位の食べ比べを楽しむことができます。</p>
        
        <p>肉だけでなく、キムチやナムルなどの韓国風惣菜も自家製で、本場の味を追求しています。また、〆の「石焼ビビンバ」や「冷麺」も人気で、最後まで満足度の高い食事を楽しめます。</p>
        
        <p>店内は、テーブル席と個室に分かれており、家族連れや接待など様々なシーンに対応しています。特に個室は予約が取りにくいほどの人気で、プライベート感を重視する顧客に好評です。</p>
        
        <p>ドリンクメニューも充実しており、焼肉に合う韓国焼酎や日本酒、ワインなどを取り揃えています。また、ノンアルコールドリンクも種類が豊富で、運転手や子供連れの家族も楽しめます。</p>
        
        <p>平日限定の「ランチセット」は、焼肉とビビンバがセットになったリーズナブルなメニューで、地元のビジネスマンや主婦層に人気です。また、土日限定の「食べ放題コース」も予約必須の人気メニューとなっています。</p>
      `,
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町20-5',
      rating: 4.6,
      priceRange: '¥¥¥',
      features: ['個室あり', '食べ放題あり', '禁煙', '駐車場あり', 'ランチあり'],
      hours: 'ランチ 11:30〜14:30（L.O. 14:00）、ディナー 17:00〜23:00（L.O. 22:30）、水曜定休',
      phone: '045-XXX-XXXX',
      website: 'https://www.totsuka-yakiniku.jp',
      paymentOptions: ['現金', 'クレジットカード', '電子マネー'],
      popularDishes: [
        {
          name: '特選盛り合わせ',
          price: '3,800円',
          description: 'その日のおすすめ部位を盛り合わせた特選メニュー。様々な部位の食べ比べを楽しめます。',
          image: 'https://images.unsplash.com/photo-1575377222312-dd1a1bd30674?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: 'A5黒毛和牛シャトーブリアン',
          price: '100g 3,200円',
          description: 'A5ランクの黒毛和牛フィレ肉の中でも最も希少な部位。とろけるような食感と濃厚な旨味が特徴です。',
          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: '石焼ビビンバ',
          price: '980円',
          description: '熱々の石鍋で提供される本格ビビンバ。具材の旨味と香ばしさが絶妙です。',
          image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        }
      ],
      nearbyRestaurants: [2, 4, 9]
    },
    {
      id: 7,
      name: 'とつか寿司',
      category: '寿司',
      description: '地元で愛される寿司店。新鮮なネタを使ったリーズナブルな寿司が楽しめます。テイクアウトも人気です。',
      fullDescription: `
        <p>「とつか寿司」は、戸塚区上倉田町にある、地元で長く愛されている寿司店です。創業30年以上の歴史を持ち、代々受け継がれてきた技術と味で、多くのファンを魅了し続けています。</p>
        
        <p>店主の山本氏は、築地市場で修業を積んだ後、地元戸塚で寿司店を開業。毎朝、横浜中央市場に足を運び、その日最も状態の良い魚を自ら目利きして仕入れています。</p>
        
        <p>メニューは、定番の「にぎり」から「巻物」「ちらし」まで幅広く、特に「おまかせにぎり」は、その日のおすすめネタを店主が厳選して提供するため、常連客に人気です。また、季節限定の「旬のネタ」も見逃せません。春は桜鯛、夏は穴子、秋は秋刀魚、冬は寒ブリなど、四季折々の味わいを楽しむことができます。</p>
        
        <p>寿司だけでなく、一品料理も充実しており、「茶碗蒸し」や「天ぷら」、「刺身盛り合わせ」なども人気メニュー。特に「あら汁」は、その日使用した魚のアラを丁寧に煮込んだ逸品で、寿司と一緒に注文する常連客が多いです。</p>
        
        <p>店内はカウンター席と小上がりの座敷があり、一人でも家族連れでも気軽に利用できます。カウンター席では、店主との会話を楽しみながら、目の前で握られる寿司を味わうことができます。</p>
        
        <p>テイクアウトも人気で、特に「特製ちらし寿司」や「巻物セット」は、地元の会社員や家族連れに好評です。また、宴会や法事などの仕出しにも対応しており、地域の様々な場面で「とつか寿司」の味が楽しまれています。</p>
        
        <p>価格帯はリーズナブルで、ランチタイムには「にぎりセット」が1,200円から楽しめるため、気軽に本格寿司を味わいたい人にもおすすめです。</p>
      `,
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区上倉田町489',
      rating: 4.5,
      priceRange: '¥¥',
      features: ['カウンター席', 'テイクアウト可', '禁煙', '座敷あり', '仕出し対応'],
      hours: '11:30〜14:00、17:00〜22:00（L.O. 21:30）、水曜定休',
      phone: '045-XXX-XXXX',
      website: 'https://www.totsuka-sushi.jp',
      paymentOptions: ['現金', 'クレジットカード'],
      popularDishes: [
        {
          name: 'おまかせにぎり',
          price: '2,500円〜',
          description: 'その日のおすすめネタを店主が厳選して提供する特別メニュー。季節の旬を味わえます。',
          image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: 'ランチにぎりセット',
          price: '1,200円',
          description: 'にぎり8貫、巻物、小鉢、味噌汁がセットになったお得なランチメニュー。平日限定です。',
          image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: '特製ちらし寿司',
          price: '1,800円',
          description: '季節の魚介をふんだんに使った特製ちらし寿司。テイクアウトでも人気の一品です。',
          image: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        }
      ],
      nearbyRestaurants: [8, 9]
    },
    {
      id: 8,
      name: '戸塚ベーカリー',
      category: 'ベーカリー',
      description: '早朝から営業している人気ベーカリー。ハード系のパンから菓子パンまで種類が豊富で、毎日通う常連も多いです。',
      fullDescription: `
        <p>「戸塚ベーカリー」は、戸塚駅から徒歩5分の場所にある、早朝から営業している人気のベーカリーです。2008年のオープン以来、「毎日食べたくなるパン」をコンセプトに、素材と製法にこだわったパン作りを続けています。</p>
        
        <p>オーナーの田中氏は、フランスで製パンを学んだ経験を持ち、伝統的なフランスパンの製法と日本人の好みを融合させた独自のパン作りを行っています。特に、天然酵母を使用したハード系のパンは、外はカリッと、中はもっちりとした食感が特徴で、多くのファンを持っています。</p>
        
        <p>店内には常時30種類以上のパンが並び、定番の「バゲット」や「クロワッサン」から、季節限定の創作パンまで、バラエティ豊かに提供しています。特に人気の「クリームパン」は、北海道産の生クリームをたっぷり使用した特製カスタードが特徴で、毎日完売する人気商品です。</p>
        
        <p>また、地元の食材を活かしたパンも人気で、神奈川県産の小麦を使用した「戸塚ブレッド」や、地元農家の野菜を使った「季節の野菜フォカッチャ」などは、地産地消を意識した逸品です。</p>
        
        <p>早朝7時からの営業で、通勤・通学前に立ち寄る常連客も多く、朝一番の焼きたてパンを求めて行列ができることも珍しくありません。また、イートインスペースも完備しており、コーヒーや紅茶と一緒に、焼きたてのパンを店内で楽しむこともできます。</p>
        
        <p>季節ごとのイベントも盛んで、クリスマスには特製シュトーレン、バレンタインにはチョコレートを使った特別なパンなど、季節感あふれる商品も提供しています。</p>
        
        <p>地域貢献にも積極的で、月に一度、売上の一部を地元の子ども食堂に寄付する「パンでつながる日」を設けるなど、地域に根ざした活動も行っています。</p>
      `,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町17-3',
      rating: 4.8,
      priceRange: '¥',
      features: ['早朝営業', 'イートインあり', '禁煙', 'テイクアウト', '駐車場あり'],
      hours: '7:00〜19:00、月曜定休（祝日の場合は営業、翌日休み）',
      phone: '045-XXX-XXXX',
      website: 'https://www.totsuka-bakery.jp',
      paymentOptions: ['現金', '電子マネー'],
      popularDishes: [
        {
          name: 'クリームパン',
          price: '220円',
          description: '北海道産の生クリームをたっぷり使用した特製カスタードが特徴のクリームパン。毎日完売する人気商品です。',
          image: 'https://images.unsplash.com/photo-1586302836983-b2e0094b6403?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: '戸塚ブレッド',
          price: '350円',
          description: '神奈川県産の小麦を使用した食パン。もっちりとした食感と小麦の香りが特徴です。',
          image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: '季節の野菜フォカッチャ',
          price: '280円',
          description: '地元農家の野菜を使ったフォカッチャ。季節によって使用する野菜が変わります。',
          image: 'https://images.unsplash.com/photo-1586352565917-2a07f5f8c9a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        }
      ],
      nearbyRestaurants: [5, 7]
    },
    {
      id: 9, name: '戸塚中華',
      category: '中華',
      description: '本格的な中華料理を提供する老舗店。ボリューム満点の定食メニューが人気で、ランチタイムは行列ができることも。',
      fullDescription: `
        <p>「戸塚中華」は、戸塚区矢部町にある、創業40年を超える老舗中華料理店です。代々受け継がれてきた伝統の味と、リーズナブルな価格設定で、地元の人々に長く愛されています。</p>
        
        <p>店主の李氏は、中国・四川省出身の料理人で、本場の味を日本人向けにアレンジしながらも、本格的な中華料理の魅力を伝え続けています。特に、四川料理の特徴である「麻辣（マーラー）」の味わいを活かした料理は、辛さ好きの常連客に人気です。</p>
        
        <p>メニューは非常に豊富で、定番の「麻婆豆腐」や「回鍋肉」から、季節限定の「上海蟹の姿蒸し」まで、様々な中華料理を楽しむことができます。特に人気の「戸塚中華特製定食」は、メイン料理に小鉢、ライス、スープがセットになったボリューム満点のメニューで、ランチタイムには行列ができることも珍しくありません。</p>
        
        <p>また、手作り餃子も人気メニューの一つで、皮から手作りする本格派。モチモチとした食感と、ジューシーな具材の組み合わせが絶妙です。テイクアウトも可能で、家庭での中華パーティーに利用する常連客も多いです。</p>
        
        <p>店内は、昔ながらの中華料理店の雰囲気を残しつつ、清潔感のある内装となっています。テーブル席が中心で、家族連れやグループでの利用も多いです。また、6名以上で利用できる個室も完備しており、宴会や接待にも対応しています。</p>
        
        <p>ドリンクメニューも充実しており、中国茶や紹興酒はもちろん、日本酒やビールなど、料理に合う様々なお酒を取り揃えています。特に、店主厳選の紹興酒は、常温から熱燗まで、好みの温度で提供してくれます。</p>
        
        <p>地域に根ざした営業スタイルで、常連客の誕生日や記念日には特別なサービスを提供するなど、アットホームな雰囲気も魅力の一つです。また、地元の学校や企業の宴会にも積極的に対応し、地域の交流の場としても機能しています。</p>
      `,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区矢部町235',
      rating: 4.3,
      priceRange: '¥¥',
      features: ['ランチセット', '宴会可', '喫煙可', '個室あり', 'テイクアウト可'],
      hours: '11:30〜14:30、17:00〜22:00（L.O. 21:30）、火曜定休',
      phone: '045-XXX-XXXX',
      website: 'https://www.totsuka-chinese.jp',
      paymentOptions: ['現金', 'クレジットカード', '電子マネー'],
      popularDishes: [
        {
          name: '戸塚中華特製定食',
          price: '980円',
          description: 'メイン料理に小鉢、ライス、スープがセットになったボリューム満点のメニュー。ランチタイム限定です。',
          image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: '特製手作り餃子',
          price: '6個 550円',
          description: '皮から手作りする本格派餃子。モチモチとした食感と、ジューシーな具材の組み合わせが絶妙です。',
          image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        },
        {
          name: '麻婆豆腐',
          price: '850円',
          description: '四川省直伝のレシピで作る本格麻婆豆腐。しびれる辛さと豆腐の滑らかさが絶妙です。辛さは調整可能です。',
          image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
        }
      ],
      nearbyRestaurants: [2, 4, 6]
    }
  ];

  const restaurant = restaurants.find(item => item.id === restaurantId);

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">レストランが見つかりませんでした</h1>
          <Link to="/food" className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            グルメ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  // Get nearby restaurants
  const nearbyRestaurants = restaurant.nearbyRestaurants
    ? restaurants.filter(item => restaurant.nearbyRestaurants?.includes(item.id))
    : [];

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-yellow-400" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />);
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">ホーム</Link>
            <span className="mx-2">/</span>
            <Link to="/food" className="hover:text-blue-600">グルメ</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{restaurant.name}</span>
          </nav>
        </div>

        {/* Restaurant Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {restaurant.category}
              </span>
            </div>
            <div className="flex items-center mb-4">
              {renderStars(restaurant.rating)}
              <span className="ml-2 text-gray-600">{restaurant.rating}</span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-gray-600">{restaurant.priceRange}</span>
            </div>
            <p className="text-lg text-gray-700 mb-6">{restaurant.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">住所</h3>
                  <p className="text-gray-600">{restaurant.address}</p>
                </div>
              </div>

              {restaurant.hours && (
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">営業時間</h3>
                    <p className="text-gray-600">{restaurant.hours}</p>
                  </div>
                </div>
              )}

              {restaurant.phone && (
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">電話番号</h3>
                    <p className="text-gray-600">{restaurant.phone}</p>
                  </div>
                </div>
              )}

              {restaurant.website && (
                <div className="flex items-start">
                  <Globe className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">ウェブサイト</h3>
                    <a
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {restaurant.website}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            {restaurant.features && restaurant.features.length > 0 && (
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {restaurant.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Restaurant Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">詳細情報</h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: restaurant.fullDescription || '' }}
          />

          {/* Payment Options */}
          {restaurant.paymentOptions && restaurant.paymentOptions.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-3">支払い方法</h3>
              <div className="flex flex-wrap gap-2">
                {restaurant.paymentOptions.map((option, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Popular Dishes */}
        {restaurant.popularDishes && restaurant.popularDishes.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">人気メニュー</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {restaurant.popularDishes.map((dish, index) => (
                <div key={index} className="flex">
                  {dish.image && (
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-24 h-24 object-cover rounded-md mr-4"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{dish.name}</h3>
                    <p className="text-blue-600 font-medium mb-1">{dish.price}</p>
                    <p className="text-gray-600 text-sm">{dish.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">アクセス</h2>
          </div>
          <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center">
            <p className="text-gray-600">地図は現在準備中です</p>
          </div>
          <div className="mt-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ' ' + restaurant.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              <MapPin className="w-4 h-4 mr-1" />
              Google マップで見る
            </a>
          </div>
        </div>

        {/* Nearby Restaurants */}
        {nearbyRestaurants.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">周辺のお店</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nearbyRestaurants.map(nearbyRestaurant => (
                <Link to={`/food/${nearbyRestaurant.id}`} key={nearbyRestaurant.id}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                    <img
                      src={nearbyRestaurant.image}
                      alt={nearbyRestaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{nearbyRestaurant.name}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                          {nearbyRestaurant.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{nearbyRestaurant.description}</p>
                      <div className="flex items-center">
                        {renderStars(nearbyRestaurant.rating)}
                        <span className="ml-1 text-sm text-gray-600">{nearbyRestaurant.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Food */}
        <div className="mt-8 text-center">
          <Link
            to="/food"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            グルメ一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;
