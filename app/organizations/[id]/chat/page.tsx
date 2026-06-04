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
        <div>

            <h1>
                Chat
            </h1>

            <div>
                {
                    messages.map(
                        (message) => (
                            <div
                                key={message.id}
                            >
                                <strong>
                                    {message.role}
                                </strong>

                                <p>
                                    {message.content}
                                </p>

                                <hr />
                            </div>
                        )
                    )
                }
            </div>

            <div>

                <input
                    type="text"
                    value={question}
                    placeholder="Ask a question..."
                    onChange={(e) =>
                        setQuestion(
                            e.target.value
                        )
                    }
                />

                <button
                    onClick={handleSend}
                    disabled={loading}
                >
                    {
                        loading
                            ? "Thinking..."
                            : "Send"
                    }
                </button>

            </div>
<h1 className="text-4xl font-bold text-green-500">
    Hello Tailwind
</h1>
        </div>
    );
}