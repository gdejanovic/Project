import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { ContractListProps, Contract } from './contract-list.interfaces';
import './orders.scss';
import axios from 'axios';
import { statuses } from './const.statuses';

const statusOptions = ["KREIRANO", "NARUČENO", "ISPORUČENO"];

export const ContractList: React.FC<ContractListProps> = ({ contracts }) => {
    const [nameFilter, setNameFilter] = useState("");
    const [showOnlyActive, setShowOnlyActive] = useState(false);
    const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
    const [editableContracts, setEditableContracts] = useState<{ [key: number]: Contract }>({});

    const handleEditToggle = (contract: Contract) => {
        setEditMode((prev) => ({
            ...prev,
            [contract.id]: !prev[contract.id],
        }));

        if (!editMode[contract.id]) {
            setEditableContracts((prev) => ({
                ...prev,
                [contract.id]: { ...contract },
            }));
        }
    };

    const handleInputChange = (contractId: number, field: keyof Contract, value: string) => {
        setEditableContracts((prev) => ({
            ...prev,
            [contractId]: {
                ...prev[contractId],
                [field]: value,
            },
        }));
    };

    const handleSave = async (contract: Contract) => {
        try {
            await axios.post('/saveContract', editableContracts[contract.id]);
            console.log('Saving contract:', editableContracts[contract.id]);
            setEditMode((prev) => ({
                ...prev,
                [contract.id]: false,
            }));
        } catch (error) {
            console.error('Failed to save contract:', error);
        }
    };

    const filteredContracts = contracts.filter(contract => {
        const matchesName = contract.kupac.toLowerCase().includes(nameFilter.toLowerCase());
        const isActive = showOnlyActive ? contract.status !== "ISPORUČENO" : true;
        return matchesName && isActive;
    });

    return (
        <div>
            <div className="filters">
                <div className="form-group filter">
                    <label htmlFor="nameFilter">Naziv kupca:</label>
                    <input
                        id="nameFilter"
                        type="text"
                        className="form-control"
                        value={nameFilter}
                        onChange={
                            (e) => setNameFilter(e.target.value)
                        }
                    />
                </div>
                <div className="form-group filter">
                    <div className="form-check">
                        <input
                            id="showOnlyActive"
                            type="checkbox"
                            className="form-check-input"
                            checked={showOnlyActive}
                            onChange={
                                () => setShowOnlyActive(!showOnlyActive)
                            }
                        />
                        <label className="form-check-label" htmlFor="showOnlyActive">
                            Prikaži samo aktivne (ne "ISPORUČENO")
                        </label>
                    </div>
                </div>
            </div>
            <Accordion>
                {filteredContracts.length > 0 ? (
                    filteredContracts.map(contract => (
                        <Accordion.Item
                            key={contract.id}
                            eventKey={contract.id.toString()}
                        >
                            <Accordion.Header>{contract.kupac} - {contract.broj_ugovora}</Accordion.Header>
                            <Accordion.Body>
                                <div className="form-group">
                                    <label>Datum akontacije:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={editableContracts[contract.id]?.datum_akontacije || contract.datum_akontacije}
                                        onChange={
                                            (e) => handleInputChange(contract.id, 'datum_akontacije', e.target.value)
                                        }
                                        disabled={!editMode[contract.id]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Rok isporuke:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={editableContracts[contract.id]?.rok_isporuke || contract.rok_isporuke}
                                        onChange={
                                            (e) => handleInputChange(contract.id, 'rok_isporuke', e.target.value)
                                        }
                                        disabled={!editMode[contract.id]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status:</label>
                                    <select
                                        className="form-control"
                                        value={editableContracts[contract.id]?.status || contract.status}
                                        onChange={
                                            (e) => handleInputChange(contract.id, 'status', e.target.value)
                                        }
                                        disabled={!editMode[contract.id]}
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status} value={status} className={statuses[status]}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group mt-2">
                                    <button
                                    className="btn btn-secondary"
                                        onClick={
                                            () => handleEditToggle(contract)
                                        }
                                    >
                                        {editMode[contract.id] ? 'Otkaži' : 'Uredi'}
                                    </button>
                                    {editMode[contract.id] && (
                                        <button
                                            className="btn btn-primary ms-2"
                                            onClick={
                                                () => handleSave(contract)
                                            }
                                        >
                                            Spremi
                                        </button>
                                    )}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                ) : (
                    <div className="alert alert-warning">Niti jedan ugovor ne spada u kriterij pretrage.</div>
                )}
            </Accordion>
        </div>
    );
};
