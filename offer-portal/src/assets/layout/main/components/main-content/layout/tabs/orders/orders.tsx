import './orders-overview.scss';
import { useEffect, useState } from 'react';
import axios from '../../../../../../../api/mockApi';
import { apiRoutes } from '../../../../../../../api/api.routes';
import { ContractList } from './contracts-list';

export const OrdersTab = () => {
    const [orders, setOrders] = useState<any[]>([]);
    console.log(orders);
    
    useEffect(() => {
        axios.get(apiRoutes.contracts)
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching contracts:', error);
            });
    }, []);
    return (
        <ContractList contracts={orders}/>
    );
};