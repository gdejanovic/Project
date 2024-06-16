import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import './create.scss'

export const NewContractForm = () => {
    const [kupac, setKupac] = useState('');
    const [brojUgovora, setBrojUgovora] = useState('');
    const [datumAkontacije, setDatumAkontacije] = useState('');
    const [rokIsporuke, setRokIsporuke] = useState('');

    const handleSubmit = () => {
        const newContract = {
            kupac,
            broj_ugovora: brojUgovora,
            datum_akontacije: datumAkontacije,
            rok_isporuke: rokIsporuke
        };
        if (newContract.broj_ugovora && newContract.datum_akontacije && newContract.kupac && newContract.rok_isporuke) {
            try {
                axios.post('/createContract', newContract);
            } catch (error) {
                // prije produkcije dodati TOAST poruke
                console.error('Failed to create contract:', error);
            }
        } else console.log("No")
    };

    return (
        <Form onSubmit={handleSubmit} className='create-form'>
            <Form.Group controlId="formKupac">
                <Form.Label>Kupac</Form.Label>
                <Form.Control
                    type="text"
                    value={kupac}
                    onChange={
                        (e) => setKupac(e.target.value)
                    }
                />
            </Form.Group>
            <Form.Group controlId="formBrojUgovora">
                <Form.Label>Broj Ugovora</Form.Label>
                <Form.Control
                    type="text"
                    value={brojUgovora}
                    onChange={
                        (e) => setBrojUgovora(e.target.value)
                    }
                />
            </Form.Group>
            <Form.Group controlId="formDatumAkontacije">
                <Form.Label>Datum Akontacije</Form.Label>
                <Form.Control
                    type="date"
                    placeholder='dd.mm.yyyy'
                    value={datumAkontacije ? moment.utc(datumAkontacije, "DD-MM-YYYY").format("YYYY-MM-DD") : ''}
                    onChange={
                        (e) => setDatumAkontacije(e.target.value)
                    }
                />
            </Form.Group>
            <Form.Group controlId="formRokIsporuke">
                <Form.Label>Rok Isporuke</Form.Label>
                <Form.Control
                    type="date"
                    value={rokIsporuke ? moment.utc(rokIsporuke, "DD-MM-YYYY").format("YYYY-MM-DD") : ''}

                    placeholder='dd.mm.yyyy'
                    onChange={
                        (e) => setRokIsporuke(e.target.value)
                    }
                />
            </Form.Group>
            <Button
                variant="primary"
                type="button"
                className='mt-2'
                onClick={() => handleSubmit()}
            >
                Kreiraj Ugovor
            </Button>
        </Form>
    );
};
