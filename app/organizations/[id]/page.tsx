"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    uploadDocument,
    listDocuments,
    deleteDocument
} from "../../services/document";
import Navbar from "../../components/Navbar";

interface Document {
    id: number;
    file_name: string;
}

export default function OrganizationPage() {
    const params = useParams();

    const organizationId =
        Number(params.id);

    const [documents, setDocuments] =
        useState<Document[]>([]);

    const [file, setFile] =
        useState<File | null>(null);

    const [loading, setLoading] =
        useState(false);

    const fetchDocuments =
        async () => {
            try {
                const response =
                    await listDocuments(
                        organizationId
                    );

                setDocuments(
                    response.documents
                );
            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleUpload =
        async () => {

            if (!file) {
                alert(
                    "Please select a file"
                );
                return;
            }

            try {
                setLoading(true);

                await uploadDocument(
                    organizationId,
                    file
                );

                setFile(null);

                await fetchDocuments();

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

    const handleDelete =
        async (
            documentId: number
        ) => {

            try {

                await deleteDocument(
                    organizationId,
                    documentId
                );

                await fetchDocuments();

            } catch (error) {
                console.error(error);
            }
        };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto max-w-4xl p-6">

                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">
                            Organization
                        </h1>

                        <p className="text-gray-600">
                            ID: {organizationId}
                        </p>
                    </div>

                    <div className="mb-8 rounded-lg bg-white p-6 shadow">

                        <h2 className="mb-4 text-xl font-semibold">
                            Upload Document
                        </h2>

                        <div className="flex gap-3">

                            <input
                                type="file"
                                onChange={(e) =>
                                    setFile(
                                        e.target.files?.[0] ||
                                        null
                                    )
                                }
                                className="flex-1 rounded border p-2"
                            />

                            <button
                                onClick={handleUpload}
                                disabled={loading}
                                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {
                                    loading
                                        ? "Uploading..."
                                        : "Upload"
                                }
                            </button>

                        </div>

                    </div>

                    <div className="mb-8 rounded-lg bg-white p-6 shadow">

                        <h2 className="mb-4 text-xl font-semibold">
                            Documents
                        </h2>

                        {
                            documents.length === 0 ? (
                                <p className="text-gray-500">
                                    No documents uploaded.
                                </p>
                            ) : (
                                <ul className="space-y-3">

                                    {
                                        documents.map(
                                            (doc) => (
                                                <li
                                                    key={doc.id}
                                                    className="flex items-center justify-between rounded border p-3"
                                                >
                                                    <span>
                                                        {doc.file_name}
                                                    </span>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                doc.id
                                                            )
                                                        }
                                                        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            )
                                        )
                                    }

                                </ul>
                            )
                        }

                    </div>

                    <Link
                        href={`/organizations/${organizationId}/chat`}
                        className="inline-block rounded bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                    >
                        Open AI Chat
                    </Link>

                </div>
            </div>
        </>
    );
}