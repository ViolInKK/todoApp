import { Toaster } from 'react-hot-toast'

import './App.css'
import AddTodo from './components/addTodo'
import TodoList from './components/todoList'

function App() {

  return (
    <div>
      <Toaster position='bottom-center'></Toaster>
      <AddTodo />
      <TodoList />
    </div>
  )
}

export default App
