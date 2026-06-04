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

                router.push("/organizations");
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

                setIsLogin(true);
                router.push("/organizations");

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
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <div
                style={{
                    width: "400px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                }}
            >
                <h1>
                    {isLogin
                        ? "Login"
                        : "Sign Up"}
                </h1>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <label>
                                Name
                            </label>
                            <br />

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                            />

                            <br />
                            <br />
                        </>
                    )}

                    <label>
                        Email
                    </label>

                    <br />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />

                    <br />
                    <br />

                    <label>
                        Password
                    </label>

                    <br />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    <br />
                    <br />

                    {error && (
                        <>
                            <p
                                style={{
                                    color: "red",
                                }}
                            >
                                {error}
                            </p>
                            <br />
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Loading..."
                            : isLogin
                                ? "Login"
                                : "Sign Up"}
                    </button>
                </form>

                <br />

                <button
                    type="button"
                    onClick={() =>
                        setIsLogin(
                            !isLogin
                        )
                    }
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