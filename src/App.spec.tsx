import { describe, expect, test, afterEach, vi } from 'vitest'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import App from './App'

describe('App', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

  afterEach(() => {
    getItemSpy.mockClear()
    setItemSpy.mockClear()
    // localStorage.clear()
  })

  describe('viewing todos', () => {
    test('should get and display existing todos from local storage', async () => {
      render(<App />)
      const dogToDo = await screen.findByLabelText('Bring dog to vet')
      expect(dogToDo).not.toBeChecked()
    })
  })

  describe('toggling todos', () => {
    test('should check and uncheck todo', async () => {
      render(<App />)
      const dogToDo = await screen.findByLabelText('Bring dog to vet')
      const groceriesToDo = await screen.findByLabelText('Buy groceries')

      expect(dogToDo).not.toBeChecked()
      expect(groceriesToDo).not.toBeChecked()

      await userEvent.click(dogToDo)

      expect(dogToDo).toBeChecked()
      expect(groceriesToDo).not.toBeChecked()

      await userEvent.click(dogToDo)

      expect(dogToDo).not.toBeChecked()
    })
  })

  // describe('creating todos', () => {
  //   test('should create a to do', async () => {
  //     render(<App />)

  //     await userEvent.click(screen.getByRole('button', { name: 'Create To Do' }))
  //   })
  // })
})
