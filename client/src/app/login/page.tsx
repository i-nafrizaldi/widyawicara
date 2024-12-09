"use client";
import Image from "next/image";
import { FromLogin } from "./components/FormLogin";
import { useRouter } from "next/navigation";
import LoggedIn from "@/hoc/LoggedIn";

const Login = () => {
  const router = useRouter();
  return (
    <main className="container place-content-center min-h-screen w-[500px]">
      <div className="border rounded-xl p-6">
        <h1 className="text-3xl font-bold mt-24">Hello 👋</h1>
        <p>Welcome back. You have been missed during this time.</p>
        <FromLogin />
      </div>
    </main>
  );
};

export default LoggedIn(Login);
