import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import Todo from '@/components/Todo';
import {TodoType} from "@/types/Todo";

const TodoDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [todo, setTodo] = useState(null);

    useEffect(() => {
        const fetchTodo = async  () => {
            try {
                const res = await axios.get(`http://localhost:3000/todos/${id}`);
                setTodo(res.data);
            } catch(err) {
                console.log(err);
            }
        };

        if (id) {
            fetchTodo();
        }
     }, [id]);

    // Todoデータが取得できるまでの間に表示するもの
    if (!todo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col space-y-6 w-3/4 max-w-lg pt-10">
                <label className="block text-xl font-bold text-gray-700">Todo</label>
                <Todo todo={todo} />
                <div className="flex justify-end">
                    <Link
                        href="/"
                        className="mt-auto font-medium text-blue-600 hover:bg-blue-300 focus:outline-none"
                    >
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default  TodoDetail;
