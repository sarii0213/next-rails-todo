import { useRouter } from 'next/router';
import Link from "next/link";
import EditTodoForm from "@/components/EditTodoForm";

const EditTodoPage = () => {
    const router = useRouter();
    const { id } = router.query;

    // クエリパラメータが取得できるまで、Loading...を表示
    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col w-3/4 max-w-lg">
                <EditTodoForm id={parseInt(id as string)} />
                {/* ↑ 型アサーション: idがstring型であることをコンパイラに明示。 -> 型安全性の維持, コードの可読性向上, エラーの早期検出 */}
                {/*型安全性: プログラムの中でデータの型が一貫して正しく使用されることを保証する概念。信頼性が高く保守しやすいコードに。*/}
                <Link
                    href="/"
                    className="ml-auto font-medium text-blue-600 hover:bg-blue-300 focus:outline-none"
                >
                    Back
                </Link>
            </div>
        </div>
    );
};

export default EditTodoPage;
