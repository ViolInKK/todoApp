import { useState, useRef, useEffect } from "react"
import { Input } from "./input"
import { toast } from 'react-hot-toast'
import { useTodo } from "../context/useTodo"


function AddTodo() {

    const [input, setInput] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)
    const { addTodo } = useTodo()

    useEffect(() => {
        if(inputRef.current) inputRef.current.focus()
    }, [])

    const handleSubmission = (e: React.FormEvent) => {
        e.preventDefault()
        if(input.trim() !== ''){
          addTodo(input)
          setInput('')
          toast.success('Todo added successfully')
        }
        else{
          toast.error('Todo field cannot be empty')
        }
    }

    return (
      <form onSubmit={handleSubmission}>
        <div>
          <Input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="start typing ..."
          />
          <button
            type="submit"
            >
            Submit
          </button>
        </div>
      </form>
    )


}

export default AddTodo