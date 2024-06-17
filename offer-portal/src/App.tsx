import './App.css';
import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from './layout';
import { ContractDetails } from './layout/main/components/main-content/layout/tabs/pages/contact-details';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/contracts/:id" Component={ContractDetails} />
        <Route path="/" Component={Main} />
      </Routes>
    </Router>
  );
}
