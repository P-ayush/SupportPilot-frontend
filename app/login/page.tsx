"use client";

import { useState } from "react";
import { login, signUp } from "../services/auth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const router = useRouter();

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        try {
            setLoading(true);

            if (isLogin) {
                const response = await login(
                    email,
                    password
                );

                localStorage.setItem(
                    "token",
                    response.token
                );

                router.push(
                    "/organizations"
                );
            } else {
                const response = await signUp(
                    name,
                    email,
                    password
                );

                localStorage.setItem(
                    "token",
                    response.token
                );

                router.push(
                    "/organizations"
                );
            }
        } catch (error: any) {
            setError(
                error?.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">

                <h1 className="mb-6 text-center text-3xl font-bold">
                    {isLogin
                        ? "Login"
                        : "Sign Up"}
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {!isLogin && (
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-blue-600 p-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Loading..."
                            : isLogin
                                ? "Login"
                                : "Sign Up"}
                    </button>
                </form>

                <button
                    type="button"
                    onClick={() =>
                        setIsLogin(
                            !isLogin
                        )
                    }
                    className="mt-4 w-full text-center text-blue-600 hover:underline"
                >
                    {isLogin
                        ? "Create Account"
                        : "Already have an account?"}
                </button>

            </div>
        </div>
    );
};

export default LoginPage;