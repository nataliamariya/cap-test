import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Contexts/CartContext';
import './Navbar.css';

const Navbar = ({ signOut, user }) => {
  const [menu, setMenu] = useState("home");
  const { cartItems } = useContext(CartContext);
  const [images, setImages] = useState({
    logo: '',
    cartIcon: '',
    profileIcon: '',
  });

  // Calculate total items in cart
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    // Fetch dynamic navbar images from your API endpoint
    fetch("https://ndruy9xx1a.execute-api.ca-central-1.amazonaws.com/devamp/navbar")
      .then(res => res.json())
      .then(data => setImages({
        logo: data.logo,
        cartIcon: data.cartIcon,
        profileIcon: data.profileIcon,
      }))
      .catch(err => console.error("Error fetching navbar images", err));
  }, []);

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        {/* Use the dynamic logo URL */}
        {images.logo && <img src={images.logo} alt='Logo' />}
      </div>

      <ul className='nav-menu'>
        {user && (
          <>
            <li onClick={() => setMenu("home")}>
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/home'>
                Home
              </Link>
              {menu === "home" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("desktops")}>
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/desktops'>
                Desktops
              </Link>
              {menu === "desktops" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("laptops")}>
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/laptops'>
                Laptops
              </Link>
              {menu === "laptops" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("pc components")}>
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/pc components'>
                PC Components
              </Link>
              {menu === "pc components" ? <hr /> : null}
            </li>
          </>
        )}
      </ul>

      <div className='nav-view-profile'>
        <Link to='/profile'>
          {/* Use the dynamic profile icon URL */}
          {images.profileIcon && <img src={images.profileIcon} alt='Profile' />}
        </Link>
      </div>
      <div className='nav-view-cart'>
        <Link to='/cart'>
          {/* Use the dynamic cart icon URL */}
          {images.cartIcon && <img src={images.cartIcon} alt='Cart' />}
        </Link>
        <div className="nav-view-count">{totalCartCount}</div>
      </div>

      <div className='logout'>
        <button onClick={signOut}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
