import React from 'react';


const CreateAccountForm = ({ setIsLoggedIn, setOpenLoginModal }) => {
    // State to manage input values for username and password
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    // Handles account creation form submission
    const handleCreateAccount = async () => {
        // Make a POST request to the create account endpoint with username and password
        await fetch('http://localhost:3000/create-account', {
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
                // If account creation is successful
                console.log("Account created successfully", response);
                const responseData = await response.json();
                console.log("Response Data:", responseData);

                alert("Account created successfully!");
                sessionStorage.setItem('user', JSON.stringify(responseData.user));
                setIsLoggedIn(true);
                setOpenLoginModal(false);
            } else {
                // If account creation fails, alert the user
                console.error("Account creation failed");
                alert("Account creation failed. Please try again.");
            }
        })
        .catch(error => {
            // Handle unexpected errors
            console.error("Error during account creation:", error);
            alert("An error occurred during account creation. Please try again later.");
        });
    };

    return (
        <div className="bg-white">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            <button
                onClick={handleCreateAccount}
                className="bg-green-700 text-white p-2 rounded w-full"
            >
                Create Account
            </button>
        </div>
    );
}
export default CreateAccountForm;