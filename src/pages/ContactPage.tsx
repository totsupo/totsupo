import { Mail, Phone, MapPin, Send, Info } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">お問い合わせ</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            戸塚つーしんに関するお問い合わせ、情報提供、取材依頼などはこちらからお願いします。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">お問い合わせ先</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">電話番号</h3>
                    <p className="text-gray-600">045-XXX-XXXX</p>
                    <p className="text-sm text-gray-500">平日 9:00〜18:00</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">メールアドレス</h3>
                    <p className="text-gray-600">info@totsuka-tsushin.jp</p>
                    <p className="text-sm text-gray-500">24時間受付</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">所在地</h3>
                    <p className="text-gray-600">横浜市戸塚区戸塚町XX-XX</p>
                    <p className="text-sm text-gray-500">JR・市営地下鉄「戸塚駅」から徒歩5分</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-md">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-blue-800">情報提供をお待ちしています</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      地域のイベント情報や取材してほしい場所、人物など、情報提供も随時受け付けています。お気軽にご連絡ください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">お問い合わせフォーム</h2>

              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">お名前 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">件名 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="inquiry-type" className="block text-sm font-medium text-gray-700 mb-1">お問い合わせ種別 <span className="text-red-500">*</span></label>
                  <select
                    id="inquiry-type"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="general">一般的なお問い合わせ</option>
                    <option value="info">情報提供</option>
                    <option value="interview">取材依頼</option>
                    <option value="correction">記事の訂正・修正依頼</option>
                    <option value="advertisement">広告掲載について</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">お問い合わせ内容 <span className="text-red-500">*</span></label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      id="privacy"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                      <a href="#" className="text-blue-600 hover:underline">プライバシーポリシー</a>に同意します
                    </label>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    送信する
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">よくあるご質問</h2>

          <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">取材してほしい場所や人物を紹介したいのですが、可能ですか？</h3>
              <p className="mt-2 text-gray-600">
                はい、可能です。お問い合わせフォームの「お問い合わせ種別」で「情報提供」を選択し、詳細をご記入ください。内容を確認の上、取材の可否をご連絡いたします。
              </p>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">記事の内容に誤りがある場合はどうすればよいですか？</h3>
              <p className="mt-2 text-gray-600">
                お問い合わせフォームの「お問い合わせ種別」で「記事の訂正・修正依頼」を選択し、該当記事のURLと誤りの内容をご記入ください。確認後、速やかに対応いたします。
              </p>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">広告掲載は可能ですか？</h3>
              <p className="mt-2 text-gray-600">
                はい、可能です。お問い合わせフォームの「お問い合わせ種別」で「広告掲載について」を選択してください。担当者より広告プランや料金についてご案内いたします。
              </p>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">戸塚つーしんの運営団体について教えてください。</h3>
              <p className="mt-2 text-gray-600">
                戸塚つーしんは、地域の魅力を発信することを目的とした市民団体「戸塚メディアプロジェクト」が運営しています。地元住民やジャーナリスト、写真家などが中心となって活動しています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
