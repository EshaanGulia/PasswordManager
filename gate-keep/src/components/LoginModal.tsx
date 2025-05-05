import React, { useState } from 'react';
import CreateAccountForm from './CreateAccountForm';

// LoginModal component props: manages login state and modal visibility
const LoginModal = ({ isLoggedIn, setIsLoggedIn, setOpenLoginModal }) => {

    // State to manage input values for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [activeTab, setActiveTab] = useState<'login' | 'create'>('login');

    // Handles login form submission
    const handleLogin = async () => {
        // Make a POST request to the login endpoint with username and password
        await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        })
        .then(async response => {
            if (response.ok) {
                // If login is successful
                console.log("Login successful", response);
                const responseData = response.json();
                responseData.then(data => {
                    console.log("Response Data:", data);

                    // Store user info in sessionStorage
                    sessionStorage.setItem('user', JSON.stringify(data.user));

                    // Update the login state in the app
                    setIsLoggedIn(true);

                    alert("Login successful!");
                });

                // Close the login modal
                setOpenLoginModal(false);
            } else {
                // If login fails, alert the user
                console.error("Login failed");
                alert("Login failed. Please check your credentials.");
                
            }
        })
        .catch(error => {
            // Handle unexpected errors
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again later.");
        });
    };

    return (
        // Modal background that closes modal when clicked
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            
            {/* Modal content area - stops propagation to prevent modal from closing when clicked inside */}
            <div className="bg-white p-6 rounded shadow-md w-80 relative" onClick={(e) => e.stopPropagation()}>

                <div className="flex justify-center mb-4">
                  <button
                    className={`px-4 py-2 font-semibold ${activeTab === 'login' ? 'border-b-2 border-green-700 text-green-700' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('login')}
                  >
                    Login
                  </button>
                  <button
                    className={`px-4 py-2 font-semibold ${activeTab === 'create' ? 'border-b-2 border-green-700 text-green-700' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('create')}
                  >
                    Create Account
                  </button>
                </div>

                {activeTab === 'login' ? (
                  <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        required
                        className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        required
                        className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-green-700 text-white p-2 rounded w-full"
                    >
                      <span className="font-bold px-2">Login</span>
                    </button>
                  </form>
                ) : (
                  <CreateAccountForm setIsLoggedIn={setIsLoggedIn} setOpenLoginModal={setOpenLoginModal} />
                )}
            </div>
        </div>
    );
};

export default LoginModal;