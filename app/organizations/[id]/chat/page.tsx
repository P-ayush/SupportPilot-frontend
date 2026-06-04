"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    createChat,
    chatHistory
} from "../../../services/chat";

interface Message {
    id: number;
    role: "user" | "assistant";
    content: string;
}

export default function ChatPage() {

    const params = useParams();

    const organizationId =
        Number(params.id);

    const [question, setQuestion] =
        useState("");

    const [messages, setMessages] =
        useState<Message[]>([]);

    const [loading, setLoading] =
        useState(false);

    const fetchHistory =
        async () => {
            try {
                const response =
                    await chatHistory(
                        organizationId
                    );

                setMessages(
                    response.messages
                );

            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleSend =
        async () => {

            if (!question.trim()) {
                return;
            }

            try {

                setLoading(true);

                await createChat(
                    organizationId,
                    question
                );

                setQuestion("");

                await fetchHistory();

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="mx-auto max-w-4xl p-6">

                <h1 className="mb-6 text-3xl font-bold">
                    AI Chat
                </h1>

                <div className="mb-4 h-[600px] overflow-y-auto rounded-lg bg-white p-4 shadow">

                    {
                        messages.map(
                            (message) => (
                                <div
                                    key={message.id}
                                    className={`mb-4 flex ${message.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                        }`}
                                >

                                    <div
                                        className={`max-w-[70%] rounded-lg p-3 ${message.role === "user"
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 text-black"
                                            }`}
                                    >
                                        <p className="mb-1 text-xs font-semibold uppercase">
                                            {message.role}
                                        </p>

                                        <p>
                                            {message.content}
                                        </p>
                                    </div>

                                </div>
                            )
                        )
                    }

                </div>

                <div className="flex gap-2">

                    <input
                        type="text"
                        value={question}
                        placeholder="Ask a question..."
                        onChange={(e) =>
                            setQuestion(
                                e.target.value
                            )
                        }
                        className="flex-1 rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {
                            loading
                                ? "Thinking..."
                                : "Send"
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}