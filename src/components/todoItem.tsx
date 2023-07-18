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
            <div className="todoItem-container editing">
                <Input
                    className="todoItem-editInput" 
                    ref={editInputRef}
                    type="text"
                    value={editingTodoText}
                    onChange={e => setEditingTodoText(e.target.value)} 
                    />
                    <button 
                    className="todoItem-editButton"
                    onClick={() => handleUpdate(todo.id)}>Update</button>

            </div>):(<div className={todo.status ? "todoItem-container done":"todoItem-container"}>
                <span style={{textDecoration: todo.status ? "line-through": "none"}}>
                    {todo.text}
                </span>
                <div className="todoItem-buttonsContainer">
                    <button className="updateButton" onClick={() => handleStatusUpdate(todo.id)}>
                        {todo.status === false ? (<span>Mark Completed</span>):(<span>Mark Undone</span>)}
                    </button>
                    <div>
                        <button className="editButton" onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
                        <button className="deleteButton" onClick={() => handleDelete(todo.id)}>Delete</button>
                    </div>
                </div>
            </div>)}
        </li>
    )
    

}

export default TodoItem