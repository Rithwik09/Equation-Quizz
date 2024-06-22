"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const router = useRouter();
  const handleClick = () => {
    router.push("/equation");
  };
  return (
    <div className="flex items-center justify-center h-screen grid-cols-4 gap-4">
  <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-1.5 me-1 mb-1" onClick={handleClick}>
  Login
</button>
      <h1>Hello</h1>
    </div>
  );
}
