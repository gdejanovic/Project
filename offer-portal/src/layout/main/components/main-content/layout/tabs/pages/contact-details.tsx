import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Contract } from '../orders/contract-list.interfaces';

export const ContractDetails = () => {
    const { contractId } = useParams<{ contractId: string }>();
    const [contract, setContract] = useState<Contract | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    if (loading) return <div>Učitavanje...</div>; // botstrapov spinner bolje
    if (error) return <div>{error}</div>;

    useEffect(() => {
        const fetchContractDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/contracts/${contractId}`);
                setContract(response.data);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    setError('Contract not found');
                } else {
                    setError('Error fetching contract details');
                }
            } finally {
                setLoading(false);
            }
        };

        if (contractId) {
            fetchContractDetails();
        }
    }, [contractId]);

    return (
        <div>
            <h1>Contract Details</h1>
            {contract ? (
                <>
                    <p>ID: {contract.id}</p>
                    <p>Kupac: {contract.kupac}</p>
                    <p>Broj Ugovora: {contract.broj_ugovora}</p>
                    <p>Datum Akontacije: {contract.datum_akontacije}</p>
                    <p>Rok Isporuke: {contract.rok_isporuke}</p>
                    <p>Status: {contract.status}</p>
                </>
            ) : (
                <p>No contract details available.</p>
            )}
        </div>
    );
};
