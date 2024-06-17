export interface Contract {
    [x: string]: unknown;
    id: number;
    kupac: string;
    broj_ugovora: string;
    datum_akontacije: string;
    rok_isporuke: string;
    artikli: [
        {
            artikl: string;
            naziv: string;
            kolicina: number;
        }
    ];
    status: string;
}

export interface ContractListProps {
    contracts: Contract[];
}
