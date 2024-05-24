import Image from "next/image";
import { Inter } from "next/font/google";
import Todos from "@/components/Todos";
import CreateTodoForm from "@/components/CreateTodoForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <div className="flex flex-col justify-center items-center">
          <CreateTodoForm />
          <Todos />
      </div>
  );
}
