import { useEffect, useState } from 'react'

import DeleteConfirmationModal from './components/DeleteConfirmationModal'

type UUID = `${string}-${string}-${string}-${string}-${string}`
type ToDo = {
  id: UUID
  name: string
  completed: boolean
}

const TODOS = 'todos'

export default function App() {
  const [toDos, setToDos] = useState<ToDo[]>(() => {
    const storedToDos = localStorage.getItem(TODOS)
    return storedToDos ? JSON.parse(storedToDos) : []
  })
  const [newToDo, setNewToDo] = useState('')
  const [toDoToDelete, setToDoToDelete] = useState<UUID | null | 'ALL'>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const toggleToDo = (id: UUID) => {
    const updatedToDos = toDos.map((toDo: ToDo) => ({
      ...toDo,
      completed: toDo.id === id ? !toDo.completed : toDo.completed,
    }))
    setToDos(updatedToDos)
  }

  const handleSubmitToDo = () => {
    const trimmedToDo = newToDo.trim()
    if (trimmedToDo) {
      const newToDos = [
        ...toDos,
        { id: crypto.randomUUID(), name: newToDo, completed: false },
      ]
      setToDos(newToDos)
      setNewToDo('')
    }
  }

  const handleOpenConfirmation = () => {
    setShowConfirmation(true)
  }

  const handleDelete = (id: UUID | 'ALL') => {
    setToDoToDelete(id)
    handleOpenConfirmation()
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    setToDoToDelete(null)
  }

  const handleConfirmDelete = () => {
    const newToDos =
      toDoToDelete === 'ALL'
        ? []
        : toDos.filter((toDo: ToDo) => toDo.id !== toDoToDelete)
    setToDos(newToDos)

    handleCloseConfirmation()
  }

  useEffect(() => {
    localStorage.setItem(TODOS, JSON.stringify(toDos))
  }, [toDos])

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl mt-10 mb-4 ">To Dos</h1>
      {!!toDos.length && (
        <button
          className="p-2 text-red-500 outline-1 opacity-75 hover:opacity-100 cursor-pointer rounded"
          onClick={() => {
            handleDelete('ALL')
          }}
          disabled={!toDos.length}
        >
          Delete All To Dos
        </button>
      )}
      <div className="flex flex-col justify-center">
        <div>
          <input
            className="outline-none border-b-2 border-b-white w-125 placeholder:text-2xl align-center placeholder:text-center text-2xl"
            aria-label="Enter New To Do"
            value={newToDo}
            onChange={(e) => {
              setNewToDo(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                handleSubmitToDo()
              }
            }}
            placeholder="What do you need to do?"
            autoFocus
          />
          <button
            className="text-2xl p-2"
            aria-label="Submit New To Do"
            onClick={handleSubmitToDo}
            disabled={!newToDo}
          >
            +
          </button>
        </div>
        <div className="flex flex-col text-2xl">
          {toDos.length ? (
            toDos.map(({ id, name, completed }) => (
              <div key={id} className="max-w-400">
                <label
                  className={`${
                    completed ? 'line-through  text-gray-500' : null
                  }`}
                  htmlFor={name}
                >
                  <input
                    className="m-4 h-5 w-5 accent-teal-600"
                    id={name}
                    type="checkbox"
                    checked={completed}
                    onChange={() => {
                      toggleToDo(id)
                    }}
                  />
                  {name}
                </label>
                <button
                  className="font-medium p-2 text-red-500 ml-2 text-2xl opacity-75 hover:opacity-100"
                  aria-label="Delete To Do"
                  onClick={() => {
                    handleDelete(id)
                  }}
                >
                  x
                </button>
              </div>
            ))
          ) : (
            <div className="h-100 italic text-gray-500 flex justify-center items-center text-center text-base">
              Nothing to do yet!
              <br /> Type your first to do above to get started.
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={showConfirmation}
        onCancel={handleCloseConfirmation}
        onSubmit={handleConfirmDelete}
      >
        <div className="w-100 h-40 flex items-center justify-center p-6">
          Are you sure you want to delete
          {toDoToDelete === 'ALL'
            ? ' all to dos'
            : ` "${toDos.find((toDo) => toDo.id === toDoToDelete)?.name}"`}
          ?
        </div>
      </DeleteConfirmationModal>
    </div>
  )
}
