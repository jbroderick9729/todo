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
    <>
      <h1>To Dos</h1>

      <input
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
      />
      <button
        aria-label="Submit New To Do"
        name="submit"
        onClick={handleSubmitToDo}
        disabled={!newToDo}
      >
        +
      </button>
      {toDos.map(({ id, name, completed }) => (
        <label key={id} htmlFor={name} style={{ color: 'white' }}>
          <input
            id={name}
            type="checkbox"
            checked={completed}
            onChange={() => toggleToDo(id)}
          />
          {name}
        </label>
      ))}
    </>
  )
}
