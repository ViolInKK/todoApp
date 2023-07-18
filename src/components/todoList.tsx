import { useTodo } from "../context/useTodo"
import TodoItem from "./todoItem"

function todoList(){

    const { todos } = useTodo()

    if(!todos.length){
        return (
            <div>
                <h1>
                    You have nothing to do
                </h1>
            </div>
        )
    }

    return(
        <ul>
            {todos.map(todo => (
                <TodoItem todo={todo} key={todo.id} />
            ))}
        </ul>
    )
}

export default todoList