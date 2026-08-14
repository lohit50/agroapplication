import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import FarmerDashboard from './components/FarmerDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import DeliveryDashboard from './components/ui/DeliveryDashboard';
// import { ThemeProvider } from './components/theme-provider';

import './index.css';

function App() {
  const [role, setRole] = useState(null);

  return (
    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setRole={setRole} />} />
          <Route path="/sign-up" element={<Signup setRole={setRole} />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
          <Route path="*" element={<Login setRole={setRole} />} />
        </Routes>
      </div>
    // </ThemeProvider>
  );
}

export default App;
