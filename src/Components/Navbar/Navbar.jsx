import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Contexts/CartContext';// Import CartContext
import './Navbar.css';
import logo from '../Assets/Logo.png';
import cart_icon from '../Assets/cart-icon.png';
import profile_icon from '../Assets/profile.png';

const Navbar = ({ signOut, user }) => {
    const [menu, setMenu] = useState("home");
    const { cartItems } = useContext(CartContext); // Get cart items

    // Calculate total items in cart
    const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt='Logo' />
            </div>

            <ul className='nav-menu'>
                {user && (
                    <>
                        <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration: 'none', color: 'inherit'}} to ='/home'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
                        <li onClick={()=>{setMenu("desktops")}}><Link style={{textDecoration: 'none', color: 'inherit'}} to ='/desktops'>Desktops</Link>{menu==="desktops"?<hr/>:<></>}</li>
                        <li onClick={()=>{setMenu("laptops")}}><Link style={{textDecoration: 'none', color: 'inherit'}} to ='/laptops'>Laptops</Link>{menu==="laptops"?<hr/>:<></>}</li>
                        <li onClick={()=>{setMenu("pc components")}}><Link style={{textDecoration: 'none', color: 'inherit'}} to ='/pc components'>PC Components</Link>{menu==="pc components"?<hr/>:<></>}</li>
                    </>
                )}
            </ul>

            <div className='nav-view-profile'>
                <Link to='/profile'><img src={profile_icon} alt='Profile' /></Link>
            </div>
            <div className='nav-view-cart'>
                <Link to='/cart'><img src={cart_icon} alt='Cart' /></Link>
                <div className="nav-view-count">{totalCartCount}</div> {/* Update cart count dynamically */}
            </div>

            <div className='logout'>
                <button onClick={signOut}>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;
