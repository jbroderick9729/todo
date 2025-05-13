import { useEffect, useState, useRef } from 'react'

type UUID = `${string}-${string}-${string}-${string}-${string}`
type ToDo = {
  id: UUID
  name: string
  completed: boolean
}

const TODOS = 'todos'

export default function App() {
  const storedToDos = localStorage.getItem(TODOS)
  const [toDos, setToDos] = useState<ToDo[]>(
    storedToDos ? JSON.parse(storedToDos) : []
  )
  const [newToDo, setNewToDo] = useState('')
  const [toDoToDelete, setToDoToDelete] = useState<UUID | null>()
  const modalRef = useRef<HTMLDialogElement>(null)

  const toggleToDo = (id: UUID) => {
    const updatedToDos = toDos.map((toDo: ToDo) => ({
      ...toDo,
      completed: toDo.id === id ? !toDo.completed : toDo.completed,
    }))

    setToDos(updatedToDos)
  }

  const handleSubmitToDo = () => {
    const newToDos = [
      ...toDos,
      { id: crypto.randomUUID(), name: newToDo, completed: false },
    ]
    setToDos(newToDos)
    setNewToDo('')
  }

  const handleDeleteToDo = (id: UUID) => {
    setToDoToDelete(id)
    modalRef.current?.showModal()
  }

  const handleCloseConfirmation = () => {
    modalRef.current?.close()
    setToDoToDelete(null)
  }

  const handleConfirmDeleteToDo = () => {
    const newToDos = toDos.filter((toDo: ToDo) => toDo.id !== toDoToDelete)
    setToDos(newToDos)
    handleCloseConfirmation()
  }

  useEffect(() => {
    localStorage.setItem(TODOS, JSON.stringify(toDos))
  }, [toDos])

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl mt-10 mb-5 ">To Dos</h1>
      <div className="flex flex-col justify-center">
        <div>
          <input
            className="outline-none border-b-2 border-b-white w-100 placeholder:text-2xl placeholder:text-center"
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
            name="submit"
            onClick={handleSubmitToDo}
            disabled={!newToDo}
          >
            +
          </button>
        </div>
        <div className="flex flex-col text-2xl">
          {toDos.map(({ id, name, completed }) => (
            <div key={id}>
              <label
                className={`${
                  completed ? 'line-through  text-gray-500' : null
                }`}
                htmlFor={name}
              >
                <input
                  className="m-4 h-5 w-5"
                  id={name}
                  type="checkbox"
                  checked={completed}
                  onChange={() => toggleToDo(id)}
                />
                {name}
              </label>
              <button
                className="font-thin p-2 text-red-500 ml-2"
                aria-label="Delete To Do"
                onClick={() => {
                  handleDeleteToDo(id)
                }}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      <dialog
        className="m-auto backdrop:backdrop-brightness-80 backdrop:backdrop-blur-xs"
        ref={modalRef}
      >
        <header className="flex justify-around p-4 border-b-2 border-gray-200">
          <h2 className="text-2xl">Delete To Do?</h2>
        </header>
        <div className="w-100 h-60 flex items-center justify-center p-6">
          Are you sure you want to delete "
          {toDos.find((toDo) => toDo.id === toDoToDelete)?.name}"?
        </div>
        <footer className="flex justify-around p-4 border-t-2 border-gray-200">
          <button className="p-2 outline-1" onClick={handleCloseConfirmation}>
            Cancel
          </button>
          <button
            className="bg-red-500 p-2 outline-1"
            onClick={handleConfirmDeleteToDo}
          >
            Delete
          </button>
        </footer>
      </dialog>
    </div>
  )
}
