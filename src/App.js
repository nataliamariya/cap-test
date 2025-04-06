import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports.js';
import './App.css';

import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Category from './Pages/Category';
import Profile from './Pages/Profile';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout'; // Import Checkout page

Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <BrowserRouter>
          <Navbar signOut={signOut} user={user} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/desktops" element={<Category category="desktop" />} />
            <Route path="/laptops" element={<Category category="laptop" />} />
            <Route path="/pc-components" element={<Category category="pc-components" />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} /> {/* New route */}
          </Routes>
        <ToastContainer position="top-right" autoClose={2000} />

        </BrowserRouter>
      )}
    </Authenticator>
    
  );
}

export default App;
