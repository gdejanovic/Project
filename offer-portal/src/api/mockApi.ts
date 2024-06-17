import axios, { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { apiRoutes } from './api.routes';

const mock = new MockAdapter(axios);

const mockItems = [
    {
        "id": 1,
        "naziv": "Perilica posuđa ugradbena Electrolux EEA27200L",
        "dobavljač": "Sancta Domenica",
        "status": "KREIRANO"
    },
    {
        "id": 2,
        "naziv": "Napa ugradbena Gorenje TH60E3X",
        "dobavljač": "Sancta Domenica",
        "status": "NARUČENO"
    },
    {
        "id": 3,
        "naziv": "Ploča ugradbena kombinirana Gorenje GCE691BSC",
        "dobavljač": "Bijela tehnika",
        "status": "ISPORUČEO"
    }
];

let mockContracts = [
    {
        "id": 1,
        "kupac": "Petra Kranjčar",
        "broj_ugovora": "1/2024",
        "datum_akontacije": "2024-01-04",
        "rok_isporuke": "2024-04-20",
        "status": "KREIRANO"
    },
    {
        "id": 2,
        "kupac": "Franko Kasun",
        "broj_ugovora": "2/2024",
        "datum_akontacije": "2024-03-01",
        "rok_isporuke": "2024-05-01",
        "status": "ISPORUČENO"
    },
    {
        "id": 3,
        "kupac": "Stjepan Babić",
        "broj_ugovora": "3/2024",
        "datum_akontacije": "2024-03-03",
        "rok_isporuke": "2024-04-15",
        "status": "NARUČENO"
    },
    {
        "id": 4,
        "kupac": "Tia Janković",
        "broj_ugovora": "4/2024",
        "datum_akontacije": "2024-03-14",
        "rok_isporuke": "2024-08-13",
        "status": "KREIRANO"
    }
];
mock.onGet(apiRoutes.contracts).reply(200, mockContracts); 
mock.onPost(apiRoutes.saveContract).reply(config => {
    const updatedContract = JSON.parse(config.data);
    const index = mockContracts.findIndex(contract => contract.id === updatedContract.id);
    if (index !== -1) {
        mockContracts[index] = updatedContract;
        console.log("update ugovora s podacima: ", updatedContract);
        console.table(mockContracts);
        return [200, { message: 'Contract updated successfully' }];

    }
    return [404, { message: 'Contract not found' }];
});
mock.onPost(apiRoutes.createContract).reply(config => {

    const newContract = JSON.parse(config.data);
    newContract.id = mockContracts.length + 1;
    newContract.status = "KREIRANO";
    mockContracts.push(newContract);
    console.log("backend primio podatke za ugovor: ", newContract);
    console.table(mockContracts);


    return [200, { message: 'Contract created successfully', contract: newContract }];
});
mock.onGet(apiRoutes.items).reply(200, mockItems);

mock.onPost(apiRoutes.createItem).reply(200, { message: 'Order created successfully' });


export default axios;
