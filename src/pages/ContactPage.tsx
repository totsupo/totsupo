import { Copy, Info, Mail, MessageCircleMore, Send, createLucideIcon } from "lucide-react"
import { useCallback, useMemo } from "react"

const XIcon = createLucideIcon("X", [
  [
    "path",
    {
      d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
      stroke: "none",
      fill: "currentColor",
      key: "1",
    },
  ],
])

const ContactPage = () => {
  /** ───── Email を動的に組み立ててスパム収集を回避 ───── */
  const { mail, mailto } = useMemo(() => {
    const user = "totsuka.portal"
    const domain = "gmail.com"
    const email = `${user}@${domain}`
    const mailtoLink =
      `mailto:${email}` + "?subject=" + encodeURIComponent("【戸塚ぽーたる】お問い合わせ")
    return { mail: email, mailto: mailtoLink }
  }, [])

  /** クリップボードコピー（メールテキスト非表示でも OK） */
  const copyMail = useCallback(async () => {
    await navigator.clipboard.writeText(mail)
    alert("メールアドレスをコピーしました！")
  }, [mail])

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">お問い合わせ</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            戸塚ぽーたるへのご連絡は、メールまたは X の メッセージ よりお願いいたします。
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ── メール ───────────────────── */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-4">
              <Mail className="w-6 h-6 text-blue-600 mr-3 shrink-0" />
              <div>
                <h2 className="text-xl font-semibold">メール</h2>
                <p className="text-gray-600 mt-1 break-all select-none">{mail}</p>
                <p className="text-sm text-gray-500">24時間受付</p>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href={mailto}
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md transition"
              >
                <Send className="w-4 h-4 mr-2" />
                メールを送る
              </a>
              <button
                onClick={copyMail}
                className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition"
              >
                <Copy className="w-4 h-4 mr-1" />
                コピー
              </button>
            </div>
          </div>

          {/* ── X  ───────────────── */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start mb-4">
              <MessageCircleMore className="w-6 h-6 text-blue-600 mr-3 shrink-0" />
              <div>
                <h2 className="text-xl font-semibold">X</h2>
                <p className="text-gray-600 mt-1">@totsuka_portal</p>
                <p className="text-sm text-gray-500">24時間受付</p>
              </div>
            </div>

            <a
              href="https://x.com/totsuka_portal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition"
            >
              <XIcon className="w-4 h-4 mr-2" />
              アカウントはこちら
            </a>
          </div>
        </div>

        {/* 情報提供インフォ */}
        <div className="mt-12 bg-blue-50 rounded-md p-6 max-w-4xl mx-auto">
          <div className="flex items-start">
            <Info className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-blue-800">情報提供をお待ちしています</h3>
              <p className="text-sm text-blue-700 mt-1 leading-relaxed">
                イベント情報や取材してほしい場所・人物など、どんな小さな情報でも歓迎です。
                メールまたは X の メッセージ よりお気軽にご連絡ください。
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">よくあるご質問</h2>

          <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">
                取材してほしい場所や人物を紹介したいのですが、可能ですか？
              </h3>
              <p className="mt-2 text-gray-600">
                はい、可能です。メールまたはXのメッセージより、詳細をご連絡ください。内容を確認の上、取材の可否をご連絡いたします。
              </p>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">
                記事の内容に誤りがある場合はどうすればよいですか？
              </h3>
              <p className="mt-2 text-gray-600">
                メールまたはXのメッセージより、該当記事のURLと内容をご連絡ください。確認後、速やかに対応いたします。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
