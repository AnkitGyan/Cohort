import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-lg w-screen h-screen flex flex-col justify-center items-center">
      <p>Todo Application</p>

      <Link href="/signin" className="text-md border m-2 px-2 py-1 rounded">
        Sign in to Todo app
      </Link>

      <Link href="/signup" className="text-md border m-2 px-2 py-1 rounded">
        Sign up to Todo app
      </Link>
    </div>
  );
}
