import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';

// EditTodoFormコンポーネントが受け取るプロパティの型を定義
type EditTodoFormProps = {
    id: number;
};

const EditTodoForm = ({ id }: EditTodoFormProps) => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // id (=deps)が変更されたら（=Todo編集ページを開いたら）、Todoを取得してフォームの初期値を設定
    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/todos/${id}`);

                const { title, content } = res.data; // = 分割代入 title = res.data.title, content = res.data.content と同義
                setTitle(title);
                setContent(content);
            } catch (err) {
                console.log(err);
            }
        };

        if (id) {
            fetchTodo();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/todos/${id}`, { todo: { title, content } }); // =短縮記法

            // Todo更新成功 -> Todo詳細ページへ遷移
            router.push(`/todos/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6 py-16">
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <label className="block text-xl font-bold text-gray-700">Edit Todo</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="タイトル"
                    className="block w-full py-2 pl-3 pr-4 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="本文"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                ></textarea>
                <button
                    type="submit"
                    className="mt-3 ml-auto flex justify-center py-2 px-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditTodoForm;
