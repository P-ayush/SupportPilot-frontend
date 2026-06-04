"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { listOrganisation } from "../services/organisation";

const OrganisationPage = () => {
    const [organisations, setOrganisations] = useState([]);
    const [error, setError] =
        useState<string | null>(null);
    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchOrganisations =
            async () => {
                try {

                    const organisations =
                        await listOrganisation();
                    setOrganisations(
                        organisations.organizations
                    );

                } catch (error: any) {

                    setError(
                        error?.response?.data?.message ||
                        "Failed to fetch organisations"
                    );

                } finally {
                    setLoading(false);
                }
            };

        fetchOrganisations();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="mx-auto max-w-4xl p-6">

                <div className="mb-6 flex items-center justify-between">

                    <h1 className="text-3xl font-bold">
                        Organizations
                    </h1>

                    <button
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Create Organization
                    </button>

                </div>

                {error && (
                    <div className="mb-4 rounded bg-red-100 p-3 text-red-600">
                        {error}
                    </div>
                )}

                <div className="grid gap-4">

                    {organisations.map(
                        (org: any) => (
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
    );
};

export default OrganisationPage;