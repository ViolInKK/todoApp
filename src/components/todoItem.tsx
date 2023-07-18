import { useEffect, useRef, useState } from "react";
import { Todo } from "../context/todoContext";
import { useTodo } from "../context/useTodo";
import toast from "react-hot-toast";
import { Input } from "./input";


function TodoItem(props: { todo: Todo }) {
    const { todo } = props

    const [editingTodoText, setEditingTodoText] = useState<string>('')
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null)

    const { deleteTodo, editTodo, updateTodoStatus } = useTodo()

    const editInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(editingTodoId !== null && editInputRef.current){
            editInputRef.current.focus()
        }
    }, [editingTodoId])

    const handleEdit = (todoId: string, todoText: string) => {
        setEditingTodoId(todoId)
        setEditingTodoText(todoText)

        if(editInputRef.current){
            editInputRef.current.focus()
        }
    }

    const handleUpdate = (todoId: string) => {
        if(editingTodoText.trim() !== ''){
            editTodo(todoId, editingTodoText)
            setEditingTodoId(null)
            setEditingTodoText('')
            toast.success('Todo updated successfully')
        }
        else{
            toast.error('Todo field cannot be empty')
        }
    }

    const handleDelete = (todoId: string) => {
        deleteTodo(todoId)
        toast.success('Todo deleted successfully')
    }

    const handleStatusUpdate = (todoId: string) => {
        updateTodoStatus(todoId)
        toast.success('Todo status updated successfully')
    }

    return (
        <li>
            {editingTodoId === todo.id ? (
            <div>
                <Input 
                    ref={editInputRef}
                    type="text"
                    value={editingTodoText}
                    onChange={e => setEditingTodoText(e.target.value)} 
                    />
                    <button onClick={() => handleUpdate(todo.id)}>Update</button>

            </div>):(<div>
                <span>
                    {todo.text}
                </span>
                <div>
                    <button onClick={() => handleStatusUpdate(todo.id)}>
                        {todo.status === false ? (<span>Mark Completed</span>):(<span>Mark Undone</span>)}
                    </button>
                    <div>
                        <button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </div>
                </div>
            </div>)}
        </li>
    )
    

}

export default TodoItem