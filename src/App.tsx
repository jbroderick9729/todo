import { useEffect, useState } from 'react'

import mockToDos from './mocks/mockToDos'

type ToDo = {
  id: number
  name: string
  completed: boolean
}

const TODOS = 'todos'

export default function App() {
  const [toDos, setToDos] = useState<ToDo[]>([])

  const toggleToDo = (id: number) => {
    const updatedToDos = toDos.map((toDo: ToDo) => ({
      ...toDo,
      completed: toDo.id === id ? !toDo.completed : toDo.completed,
    }))

    setToDos(updatedToDos)
  }

  useEffect(() => {
    const storedToDoJsonString = localStorage.getItem(TODOS)
    if (storedToDoJsonString) {
      setToDos(JSON.parse(storedToDoJsonString))
    }
  }, [])

  return (
    <>
      <h1>To Dos</h1>
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
