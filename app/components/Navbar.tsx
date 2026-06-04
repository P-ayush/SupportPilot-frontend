"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <nav className="bg-white shadow">
            <div className="mx-auto flex max-w-6xl items-center justify-between p-4">

                <Link
                    href="/organizations"
                    className="text-xl font-bold"
                >
                    SupportPilot
                </Link>

                <div className="flex gap-4">

                    <Link
                        href="/organizations"
                        className="text-gray-700 hover:text-black"
                    >
                        Organizations
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
}