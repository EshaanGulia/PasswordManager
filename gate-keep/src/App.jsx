import { useEffect, useState } from 'react'
import './App.css'

// Importing app components
import Navbar from './components/NavBar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'

function App() {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to toggle login modal visibility
  const [openLoginModal, setOpenLoginModal] = useState(false);

  useEffect(() => {
    // Check local storage for login state on initial load
    const storedLoginState = sessionStorage.getItem('user');
    if (storedLoginState) {
      setIsLoggedIn(JSON.parse(storedLoginState));
    }
    else {
      setIsLoggedIn(false);
      setOpenLoginModal(true); // Open login modal if no user is logged in
    }
  }
  , []);

  return (
    <>
      {/* Navigation bar with login state and modal control props */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />

      {/* Main content area, holds the password manager */}
      <div className='min-h-[80vh]'>
        {isLoggedIn ?
          <Manager /> : null}
      </div>

      {/* Footer always shown at the bottom */}
      <Footer />

      {/* Conditionally render the Login Modal when openLoginModal is true */}
      {openLoginModal && (
        <LoginModal
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setOpenLoginModal={setOpenLoginModal}
        />
      )}
    </>
  );
}

export default App;