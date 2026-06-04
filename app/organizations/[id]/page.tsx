"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    uploadDocument,
    listDocuments,
    deleteDocument
} from "../../services/document";

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
        <div>

            <h1>
                Organization Details
            </h1>

            <p>
                Organization ID:
                {organizationId}
            </p>

            <hr />

            <h2>
                Upload Document
            </h2>

            <input
                type="file"
                onChange={(e) =>
                    setFile(
                        e.target.files?.[0]
                        || null
                    )
                }
            />

            <button
                onClick={handleUpload}
                disabled={loading}
            >
                {
                    loading
                        ? "Uploading..."
                        : "Upload"
                }
            </button>

            <hr />

            <h2>
                Documents
            </h2>

            <ul>
                {
                    documents.map(
                        (doc) => (
                            <li
                                key={doc.id}
                            >
                                {
                                    doc.file_name
                                }

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            doc.id
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            </li>
                        )
                    )
                }
            </ul>

            <hr />

            <Link
                href={`/organizations/${organizationId}/chat`}
            >
                Open Chat
            </Link>

        </div>
    );
}