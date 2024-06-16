export interface Contract {
    id: number;
    kupac: string;
    broj_ugovora: string;
    datum_akontacije: string;
    rok_isporuke: string;
    status: string;
}

export interface ContractListProps {
    contracts: Contract[];
}
