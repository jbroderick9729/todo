import { afterEach, beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

let originalLocalStorage

beforeAll(() => {
  originalLocalStorage = window.localStorage
  window.localStorage = {
    store: {},
    getItem(key) {
      return this.store[key] ?? null
    },
    setItem(key, value) {
      this.store[key] = value
    },
    removeItem(key) {
      delete this.store[key]
    },
    clear() {
      this.store = {}
    },
  }
})

afterAll(() => {
  window.localStorage = originalLocalStorage
})

afterEach(() => {
  cleanup()
})
