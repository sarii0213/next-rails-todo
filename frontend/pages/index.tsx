import Image from "next/image";
import { Inter } from "next/font/google";
import Todos from "@/components/Todos";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <div className="flex flex-col justify-center items-center">
        <Todos />
      </div>
  );
}
