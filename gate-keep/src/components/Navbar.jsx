import React from 'react'
import LoginModal from './LoginModal';

// Navbar component with login/logout button and brand logo
const Navbar = ({ isLoggedIn, setIsLoggedIn, openLoginModal, setOpenLoginModal }) => {

    const logout = () => {
        // Clear local storage and reset login state
        sessionStorage.removeItem('user');
        setIsLoggedIn(false);
        setOpenLoginModal(true);
    }
    return (
        // Navigation bar with dark background and white text
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

                {/* Brand logo */}
                <div className="logo font-bold text-white text-2x1">
                    <span className='text-green-500'> &lt;</span>
                    <span>Gate</span>
                    <span className='text-green-500'>KEEP/&gt;</span>
                </div>

                {/* Login / Logout button */}
                {isLoggedIn ? (
                    <button
                        onClick={() => {
                            // Toggle the login modal
                            logout();
                            setIsLoggedIn(false);
                        }}
                        className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center p-1 border-none'
                    >
                        {/* Display 'Login' or 'Log Out' based on login state */}
                        <span className='font-bold px-2'>Logout</span>
                    </button>


                ) : (null)}

            </div>
        </nav>
    );
}

export default Navbar;