import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// @testing-library/jest-dom のマッチャーを追加
expect.extend(matchers)

// window.scrollTo をモック
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
})

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup()
})