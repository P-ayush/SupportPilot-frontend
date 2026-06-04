"use client"
import { useState, useEffect } from "react";
import { listOrganisation } from "../services/organisation";
import Link from "next/link";

const OrganisationPage = () => {
    const [organisations, setOrganisations] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrganisations = async () => {
            try {
                const organisations = await listOrganisation();
                setOrganisations(organisations);
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
        return <h1>Loading...</h1>;
    }
    return (
        <div>
            <h1>Organisations</h1>
            {error && <p>{error}</p>}
            <ul>
                {organisations.map((org: any) => (
                    <li key={org.id}><Link href={`/organizations/${org.id}`}>
                        {org.name}
                    </Link></li>
                ))}
            </ul>
        </div>
    );
}

export default OrganisationPage