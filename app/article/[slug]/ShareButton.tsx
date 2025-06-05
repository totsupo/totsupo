'use client'

import { Share2 } from "lucide-react"
import { useCallback, useState } from "react"

export default function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = useCallback(async () => {
    const url = window.location.href

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert(`コピーできませんでした…\n${url}`)
    }
  }, [])

  return (
    <div className="flex items-center space-x-4">
      <button
        type="button"
        onClick={handleCopyUrl}
        className="flex items-center text-gray-500 hover:text-blue-600"
      >
        <Share2 className="w-5 h-5 mr-1" />
        <span className="text-sm">URL をコピー</span>
      </button>

      {copied && (
        <span className="text-xs text-green-600 transition-opacity duration-300">
          コピーしました！
        </span>
      )}
    </div>
  )
}