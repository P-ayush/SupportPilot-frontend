"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import {
    listOrganisation,
    createOrganisation
} from "../services/organisation";

interface Organisation {
    id: number;
    name: string;
}

const OrganisationPage = () => {
    const [organisations, setOrganisations] =
        useState<Organisation[]>([]);

    const [error, setError] =
        useState<string | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [showCreateForm, setShowCreateForm] =
        useState(false);

    const [name, setName] =
        useState("");

    const [creating, setCreating] =
        useState(false);

    const fetchOrganisations =
        async () => {
            try {

                const response =
                    await listOrganisation();

                setOrganisations(
                    response.organizations
                );

            } catch (error: any) {

                setError(
                    error?.response?.data?.message ||
                    "Failed to fetch organisations"
                );
            }
        };

    useEffect(() => {
        fetchOrganisations()
            .finally(() =>
                setLoading(false)
            );
    }, []);

    const handleCreate =
        async () => {

            if (!name.trim()) {
                return;
            }

            try {

                setCreating(true);

                await createOrganisation(
                    name
                );

                setName("");

                setShowCreateForm(false);

                await fetchOrganisations();

            } catch (error: any) {

                setError(
                    error?.response?.data?.message ||
                    "Failed to create organisation"
                );

            } finally {

                setCreating(false);
            }
        };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="flex min-h-screen items-center justify-center">
                    Loading...
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100">

                <div className="mx-auto max-w-4xl p-6">

                    <div className="mb-6 flex items-center justify-between">

                        <h1 className="text-3xl font-bold">
                            Organizations
                        </h1>

                        {!showCreateForm && (
                            <button
                                onClick={() =>
                                    setShowCreateForm(true)
                                }
                                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                + Create Organization
                            </button>
                        )}

                    </div>

                    {showCreateForm && (
                        <div className="mb-6 rounded-lg bg-white p-4 shadow">

                            <h2 className="mb-4 text-lg font-semibold">
                                Create Organization
                            </h2>

                            <div className="flex gap-2">

                                <input
                                    type="text"
                                    placeholder="Organization Name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(
                                            e.target.value
                                        )
                                    }
                                    className="flex-1 rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <button
                                    onClick={handleCreate}
                                    disabled={creating}
                                    className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                                >
                                    {
                                        creating
                                            ? "Creating..."
                                            : "Save"
                                    }
                                </button>

                                <button
                                    onClick={() => {
                                        setShowCreateForm(false);
                                        setName("");
                                    }}
                                    className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>
                    )}

                    {error && (
                        <div className="mb-4 rounded bg-red-100 p-3 text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-4">

                        {organisations.map(
                            (org) => (
                                <Link
                                    key={org.id}
                                    href={`/organizations/${org.id}`}
                                >
                                    <div className="rounded-lg bg-white p-4 shadow transition hover:shadow-lg">

                                        <h2 className="text-lg font-semibold">
                                            {org.name}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Open Organization
                                        </p>

                                    </div>
                                </Link>
                            )
                        )}

                    </div>

                </div>

            </div>
        </>
    );
};

export default OrganisationPage;