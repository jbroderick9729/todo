type ToDo = {
  id: number
  name: string
  completed: boolean
}

function App() {
  const mockToDo: ToDo = { id: 1, name: 'Bring dog to vet', completed: false }
  const toDos = [mockToDo]

  return (
    <>
      <h1>To Do</h1>
      {toDos.map(({ id, name, completed }) => (
        <label key={id} htmlFor={name} style={{ color: 'white' }}>
          <input id={name} type="checkbox" checked={completed} />
          {name}
        </label>
      ))}
    </>
  )
}

export default App
