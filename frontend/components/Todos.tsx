import { useEffect, useState } from "react";
import axios from 'axios';
import { TodoType } from "@/types/Todo";
import Todo from './Todo';
import Link from 'next/link';

const Todos = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);

    const fetchTodos = async () => {
        try {
            const res = await axios.get<TodoType[]>('http://localhost:3000/todos');

            setTodos(res.data);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="space-y-6 w-3/4 max-w-lg pt-10">
            <label className="block text-xl font-bold text-gray-700">Todo Index</label>
            <div className="items-center justify-center">
                {todos.map((todo)=> (
                    <Link
                        href={`todos/${todo.id}`}
                        key={todo.id}
                    >
                        <Todo todo={todo} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Todos;
