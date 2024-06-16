import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './content.scss'
import { OrdersTab } from './tabs/orders/orders';
import { NewContractForm } from './tabs/create-new-order/create.component';

export const Layout = () => {
    const [key, setKey] = useState<string>('home');

    return (
        <div className="home">
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(key) => setKey(key!)}
                className="mb-3"
            >
                <Tab eventKey="home" title="Pregled ugovora">
                    <OrdersTab />
                </Tab>
                <Tab eventKey="order-creation" title="Izrada nove narudžbe">
                    <NewContractForm />
                </Tab>
            </Tabs>
        </div>
    )
}