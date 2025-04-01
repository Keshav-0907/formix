'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/dashboard');
  }
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-slate-900">
      <button className="bg-white text-black px-4 py-2 rounded-md">
        <Link href={'/auth'}>
          Get Started
        </Link>
      </button>
    </div>
  );
}
