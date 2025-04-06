import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { ToastContainer } from 'react-toastify';
import awsExports from './aws-exports';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import '@aws-amplify/ui-react/styles.css';

import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Category from './Pages/Category';
import Profile from './Pages/Profile';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import { CartProvider } from './Contexts/CartContext';

Amplify.configure(awsExports);

function App() {
  return (
<Authenticator>
  {({ signOut, user }) => (
    user ? (
      <CartProvider user={user}>
        <BrowserRouter>
          <Navbar signOut={signOut} user={user} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/desktops" element={<Category category="desktop" />} />
            <Route path="/laptops" element={<Category category="laptop" />} />
            <Route path="/pc-components" element={<Category category="pc-components" />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={2000} />
        </BrowserRouter>
      </CartProvider>
    ) : <div>Loading user...</div>
  )}
</Authenticator>

  );
}

export default App;
