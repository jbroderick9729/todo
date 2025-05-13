import { useEffect, useState } from 'react'

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
            <label
              className={`${completed ? 'line-through  text-gray-500' : null}`}
              key={id}
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
          ))}
        </div>
      </div>
    </div>
  )
}
