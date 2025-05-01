import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Navigation, Clock, Info, Phone, Globe } from 'lucide-react';

interface Spot {
  id: number;
  name: string;
  description: string;
  fullDescription?: string;
  image: string;
  address: string;
  hours?: string;
  phone?: string;
  website?: string;
  admission?: string;
  features?: string[];
  nearbySpots?: number[];
}

const SpotDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const spotId = parseInt(id || '0', 10);

  // This would ideally come from a data file like newsData or eventsData
  const spots: Spot[] = [
    {
      id: 1,
      name: '戸塚区総合公園',
      description: '広大な敷地に野球場やテニスコート、子供の遊び場などを備えた市民の憩いの場。四季折々の自然も楽しめます。',
      fullDescription: `
        <p>戸塚区総合公園は、横浜市戸塚区に位置する総合公園です。約14.6ヘクタールの広大な敷地内には、様々な施設が整備されています。</p>
        
        <p>主な施設としては、野球場、テニスコート、多目的広場、子供の遊び場などがあります。野球場は公式戦も開催可能な本格的な施設で、テニスコートは全天候型のハードコートが6面あります。</p>
        
        <p>また、四季折々の自然を楽しめるのも魅力の一つです。春には桜が咲き誇り、夏には緑豊かな木々が涼しい木陰を作り、秋には紅葉が楽しめます。園内には約1.2キロメートルの散策路があり、ジョギングやウォーキングを楽しむ市民の姿も多く見られます。</p>
        
        <p>子供の遊び場には、大型複合遊具や砂場、ブランコなどが設置されており、週末には多くの家族連れで賑わいます。また、広々とした芝生広場では、ピクニックやバーベキュー（要予約）も楽しめます。</p>
        
        <p>公園内には駐車場（有料）も完備されていますが、休日は混雑することが多いため、公共交通機関の利用をお勧めします。最寄りのバス停からは徒歩約5分です。</p>
      `,
      image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区汲沢町434',
      hours: '常時開放（一部施設は9:00〜21:00）',
      phone: '045-XXX-XXXX',
      website: 'https://www.city.yokohama.lg.jp/totsuka/park/totsuka-sogo-park.html',
      admission: '無料（一部施設は有料）',
      features: ['野球場', 'テニスコート', '多目的広場', '子供の遊び場', '駐車場'],
      nearbySpots: [2, 5]
    },
    {
      id: 2,
      name: '柏尾川プロムナード',
      description: '戸塚区を流れる柏尾川沿いの遊歩道。桜の名所として知られ、春には多くの人が訪れます。',
      fullDescription: `
        <p>柏尾川プロムナードは、戸塚区を流れる柏尾川沿いに整備された遊歩道です。全長約5キロメートルにわたり、水辺の自然を楽しみながら散策できる人気スポットとなっています。</p>
        
        <p>特に有名なのは、約1.5キロメートルにわたって続く桜並木です。約200本のソメイヨシノが植えられており、例年4月上旬から中旬にかけて見頃を迎えます。桜の季節には「柏尾川桜まつり」も開催され、多くの花見客で賑わいます。</p>
        
        <p>桜の時期以外も、四季折々の自然を楽しむことができます。夏には川沿いの涼しい風を感じながらの散歩が気持ちよく、秋には紅葉、冬には冬鳥の観察なども楽しめます。</p>
        
        <p>プロムナード沿いには、ベンチや東屋も設置されており、休憩しながらゆっくりと散策することができます。また、サイクリングを楽しむ人も多く、自転車と歩行者が共存できるよう整備されています。</p>
        
        <p>アクセスは、JR戸塚駅から徒歩約10分。駅から近いこともあり、地元の人々の日常的な憩いの場となっています。</p>
      `,
      image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町',
      hours: '常時開放',
      website: 'https://www.city.yokohama.lg.jp/totsuka/river/kashio-promenade.html',
      admission: '無料',
      features: ['桜並木', '遊歩道', 'サイクリングロード', 'ベンチ', '東屋'],
      nearbySpots: [1, 6]
    },
    {
      id: 3,
      name: '東戸塚駅前商店街',
      description: '東戸塚駅周辺に広がる活気ある商店街。地元の人々の日常を支える様々な店舗が軒を連ねています。',
      fullDescription: `
        <p>東戸塚駅前商店街は、JR東戸塚駅を中心に広がる活気ある商店街です。駅の東西に商業施設や飲食店、専門店などが集まり、地元住民の日常生活を支える重要な役割を果たしています。</p>
        
        <p>駅西口側には大型ショッピングセンターがあり、ファッション、雑貨、食品など様々なジャンルの店舗が入っています。また、映画館やフードコートも併設されており、買い物だけでなく娯楽も楽しめる複合施設となっています。</p>
        
        <p>駅東口側には、個人経営の専門店や飲食店が多く並んでいます。昔ながらの和菓子店や八百屋、最近オープンしたカフェやレストランなど、新旧の店舗が共存しているのが特徴です。</p>
        
        <p>毎月第2日曜日には「東戸塚マルシェ」が開催され、地元の農家や手作り作家が出店する市場が立ち、多くの人で賑わいます。</p>
        
        <p>駅前には広場も整備されており、季節ごとにイベントが開催されます。特に冬のイルミネーションは地域の名物となっています。</p>
      `,
      image: 'https://images.unsplash.com/photo-1555661530-68c8e98db4e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区川上町',
      hours: '店舗により異なる（多くは10:00〜20:00）',
      website: 'https://www.higashi-totsuka.jp',
      features: ['ショッピング', '飲食店', 'マルシェ', 'イベント広場'],
      nearbySpots: [5, 8]
    },
    {
      id: 4,
      name: '戸塚区民文化センターさくらプラザ',
      description: '音楽や演劇、展示会などが開催される文化施設。地域の文化活動の拠点となっています。',
      fullDescription: `
        <p>戸塚区民文化センターさくらプラザは、JR戸塚駅に直結する複合施設「トツカーナ」内にある文化施設です。音楽、演劇、ダンス、美術など、様々なジャンルの文化芸術活動の拠点となっています。</p>
        
        <p>施設内には、本格的な音響設備を備えたホール（定員約600名）、リハーサル室、練習室、ギャラリーなどがあります。ホールでは、クラシックコンサートや演劇公演、ダンス発表会などが定期的に開催されています。</p>
        
        <p>ギャラリーでは、地元アーティストによる展示会や公募展などが開催され、無料で鑑賞することができます。また、リハーサル室や練習室は一般にも貸し出されており、音楽の練習や会議など様々な用途で利用されています。</p>
        
        <p>さくらプラザでは、子どもから大人まで参加できる様々なワークショップや講座も開催されています。音楽教室や絵画教室、伝統芸能の体験講座など、文化芸術に親しむ機会を提供しています。</p>
        
        <p>JR戸塚駅に直結しているため、アクセスは非常に便利です。施設内には案内所もあり、公演情報やチケットの購入も可能です。</p>
      `,
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区 戸塚区戸塚町16-17',
      hours: '9:00〜22:00',
      phone: '045-XXX-XXXX',
      website: 'https://www.totsuka-sakuraplaza.jp',
      admission: '施設により異なる（ギャラリーは無料）',
      features: ['ホール', 'ギャラリー', 'リハーサル室', '練習室', 'カフェ'],
      nearbySpots: [6, 9]
    },
    {
      id: 5,
      name: '舞岡公園',
      description: '自然豊かな市民の森。四季折々の植物や生き物を観察できるハイキングコースがあります。',
      fullDescription: `
        <p>舞岡公園は、戸塚区と港南区にまたがる自然豊かな市民の森です。約30ヘクタールの広大な敷地内には、雑木林、田んぼ、小川、池など様々な自然環境が残されており、都会の中の貴重な自然空間となっています。</p>
        
        <p>公園内には複数のハイキングコースが整備されており、初心者から上級者まで楽しめるようになっています。特に人気なのは「谷戸の道コース」で、谷戸（やと）と呼ばれる谷状の地形を巡りながら、多様な植物や生き物を観察することができます。</p>
        
        <p>公園内には「舞岡公園小谷戸の里」という施設があり、昔ながらの農村風景を再現しています。ここでは、田植えや稲刈り、餅つきなどの農業体験イベントも定期的に開催されています。</p>
        
        <p>四季折々の自然を楽しめるのも魅力の一つです。春には桜やレンゲ、夏にはホタル、秋には紅葉、冬には野鳥など、季節ごとに異なる自然の表情を楽しむことができます。</p>
        
        <p>アクセスは、JR戸塚駅または港南台駅からバスで約15分。駐車場も完備されていますが、台数に限りがあるため、公共交通機関の利用をお勧めします。</p>
      `,
      image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区舞岡町2832',
      hours: '常時開放（小谷戸の里は9:00〜16:30、月曜休館）',
      phone: '045-XXX-XXXX',
      website: 'https://www.city.yokohama.lg.jp/totsuka/park/maioka-park.html',
      admission: '無料',
      features: ['ハイキングコース', '田んぼ', '雑木林', '小谷戸の里', '駐車場'],
      nearbySpots: [1, 7]
    },
    {
      id: 6,
      name: '戸塚駅西口商店街',
      description: '戸塚駅西口に広がる商店街。古くからの店舗と新しい店舗が混在し、活気ある雰囲気が魅力です。',
      fullDescription: `
        <p>戸塚駅西口商店街は、JR戸塚駅の西口から広がる歴史ある商店街です。昭和初期から続く老舗店舗と新しくオープンした店舗が共存し、独特の雰囲気を醸し出しています。</p>
        
        <p>商店街には、食料品店、衣料品店、飲食店、雑貨店など様々なジャンルの店舗が約100軒軒を連ねています。特に、創業50年以上の老舗和菓子店や、地元で愛される定食屋、最近人気のカフェなど、食に関する店舗が充実しています。</p>
        
        <p>毎月第3日曜日には「とつか日曜市」が開催され、商店街の各店舗が特別価格での販売や、通常は店内でしか食べられないメニューの屋台販売などを行い、多くの人で賑わいます。</p>
        
        <p>また、季節ごとのイベントも盛んで、夏には「戸塚ふれあい納涼祭」、冬には「戸塚イルミネーション」などが開催され、地域の交流の場となっています。</p>
        
        <p>アクセスは、JR戸塚駅西口から徒歩すぐ。駅から近いこともあり、通勤・通学の途中に立ち寄る地元の人々で日常的に賑わっています。</p>
      `,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町',
      hours: '店舗により異なる（多くは10:00〜19:00）',
      website: 'https://www.totsuka-shotengai.jp',
      features: ['飲食店', '食料品店', '衣料品店', '雑貨店', 'イベント'],
      nearbySpots: [2, 9]
    },
    {
      id: 7,
      name: '俣野別邸庭園',
      description: '大正時代の実業家の邸宅跡を整備した庭園。四季折々の花や木々が楽しめる静かな空間です。',
      fullDescription: `
        <p>俣野別邸庭園は、大正時代の実業家・俣野一郎の別邸跡を整備した庭園です。約2.6ヘクタールの敷地内には、和風と洋風が融合した庭園が広がり、四季折々の花や木々を楽しむことができます。</p>
        
        <p>庭園内には、池や小川、石橋などが配置され、自然の地形を活かした造りとなっています。特に、春の桜、初夏のアジサイ、秋の紅葉など、季節ごとに異なる景観を楽しめるのが魅力です。</p>
        
        <p>敷地内には「俣野別邸」も保存されており、大正時代の建築様式を今に伝えています。別邸内部は一般公開されており、当時の生活様式や建築の特徴を知ることができます。</p>
        
        <p>また、庭園内には休憩所やカフェも設置されており、ゆっくりと庭園の景色を楽しむことができます。カフェでは、季節の花をモチーフにしたスイーツや飲み物も提供されています。</p>
        
        <p>アクセスは、JR戸塚駅からバスで約15分。駐車場も完備されていますが、台数に限りがあるため、公共交通機関の利用をお勧めします。</p>
      `,
      image: 'https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区東俣野町80-1',
      hours: '9:00〜17:00（入園は16:30まで）、月曜休園',
      phone: '045-XXX-XXXX',
      website: 'https://www.city.yokohama.lg.jp/totsuka/park/matano-garden.html',
      admission: '大人300円、小中学生100円',
      features: ['庭園', '別邸', 'カフェ', '駐車場'],
      nearbySpots: [5, 8]
    },
    {
      id: 8,
      name: '戸塚スポーツセンター',
      description: '体育館やプール、トレーニング室などを備えた総合スポーツ施設。各種スポーツ教室も開催されています。',
      fullDescription: `
        <p>戸塚スポーツセンターは、戸塚区内最大の総合スポーツ施設です。体育館、プール、トレーニング室など様々な施設が完備されており、子どもから高齢者まで幅広い世代がスポーツを楽しんでいます。</p>
        
        <p>メインアリーナは、バスケットボール2面分の広さがあり、バレーボール、バドミントン、卓球などの競技に利用されています。また、観客席も完備されており、各種大会やイベントも開催されています。</p>
        
        <p>プールは25メートル×6コースの公認プールで、一般遊泳だけでなく、水泳教室や水中ウォーキングなどのプログラムも充実しています。また、幼児用の浅いプールも併設されており、家族で楽しむことができます。</p>
        
        <p>トレーニング室には、各種マシンやフリーウェイトが設置されており、専門のインストラクターが常駐しているため、初心者でも安心して利用できます。また、ヨガやエアロビクスなどのスタジオプログラムも定期的に開催されています。</p>
        
        <p>アクセスは、JR戸塚駅からバスで約10分。駐車場も完備されていますが、休日は混雑することが多いため、公共交通機関の利用をお勧めします。</p>
      `,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区上倉田町477',
      hours: '9:00〜21:00（施設により異なる）、第4月曜休館',
      phone: '045-XXX-XXXX',
      website: 'https://www.yspc.or.jp/totsuka_sc',
      admission: '施設により異なる（トレーニング室：大人300円、プール：大人600円など）',
      features: ['体育館', 'プール', 'トレーニング室', 'スタジオ', '駐車場'],
      nearbySpots: [3, 9]
    },
    {
      id: 9,
      name: '戸塚区役所',
      description: '区民サービスの拠点となる施設。区役所内には区民広間や展示スペースもあります。',
      fullDescription: `
        <p>戸塚区役所は、戸塚区の行政サービスの拠点となる施設です。2013年に現在の場所に移転し、JR戸塚駅に直結する複合施設「トツカーナ」内に位置しています。</p>
        
        <p>区役所内では、住民票や戸籍謄本の発行、国民健康保険や年金の手続き、子育て支援、福祉サービスなど、様々な行政サービスを受けることができます。また、区民の相談窓口も設置されており、生活に関する様々な相談に対応しています。</p>
        
        <p>1階の区民広間は、明るく開放的な空間となっており、休憩スペースや情報コーナーが設置されています。また、定期的に展示会やイベントも開催されており、地域の文化活動の発表の場としても活用されています。</p>
        
        <p>9階には「さくらプラザ」という文化施設が併設されており、コンサートホールやギャラリー、練習室などがあります。区民の文化芸術活動の拠点となっています。</p>
        
        <p>アクセスは、JR戸塚駅から直結しているため非常に便利です。また、駐車場も完備されていますが、有料となっています。</p>
      `,
      image: 'https://images.unsplash.com/photo-1577129762510-8077880673f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町16-17',
      hours: '8:45〜17:00（一部窓口は延長あり）、土日祝休み（一部窓口は開庁）',
      phone: '045-XXX-XXXX',
      website: 'https://www.city.yokohama.lg.jp/totsuka/',
      features: ['行政サービス', '区民広間', '展示スペース', 'さくらプラザ', '駐車場'],
      nearbySpots: [4, 6]
    }
  ];

  const spot = spots.find(item => item.id === spotId);

  if (!spot) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">スポットが見つかりませんでした</h1>
          <Link to="/spots" className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            スポット一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  // Get nearby spots
  const nearbySpots = spot.nearbySpots
    ? spots.filter(item => spot.nearbySpots?.includes(item.id))
    : [];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">ホーム</Link>
            <span className="mx-2">/</span>
            <Link to="/spots" className="hover:text-blue-600">スポット</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{spot.name}</span>
          </nav>
        </div>

        {/* Spot Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <img
            src={spot.image}
            alt={spot.name}
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{spot.name}</h1>
            <p className="text-lg text-gray-700 mb-6">{spot.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">住所</h3>
                  <p className="text-gray-600">{spot.address}</p>
                </div>
              </div>

              {spot.hours && (
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">営業時間</h3>
                    <p className="text-gray-600">{spot.hours}</p>
                  </div>
                </div>
              )}

              {spot.admission && (
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">入場料</h3>
                    <p className="text-gray-600">{spot.admission}</p>
                  </div>
                </div>
              )}

              {spot.phone && (
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">電話番号</h3>
                    <p className="text-gray-600">{spot.phone}</p>
                  </div>
                </div>
              )}

              {spot.website && (
                <div className="flex items-start">
                  <Globe className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">ウェブサイト</h3>
                    <a
                      href={spot.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {spot.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spot Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">詳細情報</h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: spot.fullDescription || '' }}
          />

          {/* Features */}
          {spot.features && spot.features.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-3">施設・特徴</h3>
              <div className="flex flex-wrap gap-2">
                {spot.features.map((feature, index) => (
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

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Navigation className="w-5 h-5 mr-2 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">アクセス</h2>
          </div>
          <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center">
            <p className="text-gray-600">地図は現在準備中です</p>
          </div>
          <div className="mt-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' ' + spot.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              <Navigation className="w-4 h-4 mr-1" />
              Google マップで見る
            </a>
          </div>
        </div>

        {/* Nearby Spots */}
        {nearbySpots.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">周辺のスポット</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nearbySpots.map(nearbySpot => (
                <Link to={`/spots/${nearbySpot.id}`} key={nearbySpot.id}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                    <img
                      src={nearbySpot.image}
                      alt={nearbySpot.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{nearbySpot.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{nearbySpot.description}</p>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{nearbySpot.address}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Spots */}
        <div className="mt-8 text-center">
          <Link
            to="/spots"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            スポット一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpotDetailPage;
