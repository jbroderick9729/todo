import { describe, expect, test, afterEach, vi, beforeEach } from 'vitest'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import App from './App'
import mockToDos from './mocks/mockToDos'

const TODOS = 'todos'
const UUID = '65165d19-5a66-44ad-abd9-65e612bec32b'

describe('App', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
  const randomUUIDSpy = vi.spyOn(crypto, 'randomUUID').mockReturnValue(UUID)

  beforeEach(() => {
    localStorage.setItem(TODOS, JSON.stringify(mockToDos))
  })

  afterEach(() => {
    getItemSpy.mockClear()
    setItemSpy.mockClear()
    randomUUIDSpy.mockClear()
    localStorage.clear()
  })

  describe('viewing todos', () => {
    test('should get and display existing todos from local storage', async () => {
      render(<App />)
      await screen.findByLabelText('Bring dog to vet')
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

      expect(setItemSpy).toHaveBeenCalled()
      expect(dogToDo).toBeChecked()
      expect(groceriesToDo).not.toBeChecked()

      await userEvent.click(dogToDo)

      expect(dogToDo).not.toBeChecked()
    })
  })

  describe('creating todos', () => {
    test('should disable submit until a to do has been entered', async () => {
      render(<App />)

      const submit = screen.getByLabelText('Submit New To Do')
      expect(submit).toBeDisabled()

      await userEvent.type(
        screen.getByLabelText('Enter New To Do'),
        'Get a new job'
      )
      expect(submit).toBeEnabled()
    })

    test('should create a new to do', async () => {
      render(<App />)

      const submit = screen.getByLabelText('Submit New To Do')
      await userEvent.type(
        screen.getByLabelText('Enter New To Do'),
        'Get a new job'
      )
      await userEvent.click(submit)

      expect(setItemSpy).toHaveBeenCalled()
      expect(screen.getByLabelText('Get a new job')).not.toBeChecked()
    })

    test('should submit on enter', async () => {
      render(<App />)

      await userEvent.type(
        screen.getByLabelText('Enter New To Do'),
        'Get a new job{enter}'
      )

      expect(setItemSpy).toHaveBeenCalled()
      expect(screen.getByLabelText('Get a new job')).not.toBeChecked()
    })
  })
})
