import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Manager component handles password creation, editing, deletion, and UI rendering
const Manager = () => {
    const ref = useRef();
    const [form, setform] = useState({ site: "", username: "", passwords: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    // Fetches saved passwords from backend
    const getPasswords = async () => {
        const userId = JSON.parse(sessionStorage.getItem("user"))._id;
        let req = await fetch(`http://localhost:3000/getPasswordsForUser?userId=${userId}`);
        let passwords = await req.json();
        console.log(passwords);
        setPasswordArray(passwords);
    }

    // Fetch passwords on component mount
    useEffect(() => {
        getPasswords();
    }, []);

    // Copies text to clipboard and shows a toast
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
        });
    };

    // Saves a new or edited password entry
    const savePassword = async () => {
        const userId = JSON.parse(sessionStorage.getItem("user"))._id;
        console.log("Saving password for userId: ", userId);
        console.log("Form data: ", form);



        if(form.site.length < 3 || form.username.length < 3 || form.passwords.length < 3) {
            toast.error('Error: All fields must be at least 3 characters long!', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
            return;
        } else {
            if(form.id) {
                // If form has an id, update existing password
                console.log("Updating existing password with id: ", form.id);
                await fetch("http://localhost:3000/update-password", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...form, userId: userId })
                });
                setform({ site: "", username: "", passwords: "" }); // Clear form after update
                getPasswords(); // Refresh password list
                toast.success('Password updated successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                });
                return;
            }

            await fetch("http://localhost:3000/create-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, userId: userId })
            });

            // Clear form and show success message
            setform({ site: "", username: "", passwords: "" });
            getPasswords(); // Refresh password list
            toast.success('Password saved successfully!', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        }
    };

    // Deletes a password entry by ID
    const deletePassword = async (item) => {
        console.log("Deleting password with id ", item);
        let c = confirm("Do you really want to delete this password?");
        if (c) {
        await fetch("http://localhost:3000/delete-password", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: item._id })
            });
            getPasswords(); // Refresh password list
            toast.success('Password deleted successfully!', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        }
    };

    // Pre-fills the form for editing and removes the old entry
    const editPassword = (item) => {
        setform({
            site: item.site,
            username: item.username,
            passwords: item.password,
            id: item._id
        })
    };

    // Handles input field changes
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            {/* Toast notifications container */}
            <ToastContainer theme="light" transition={Bounce} />

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-200 opacity-20 blur-[100px]"></div>
            </div>

            {/* Main content */}
            <div className="p-2 md:p-0 mycontainer min-h-[90.25vh]">
                <h1 className='text-5x1 font-bold text-center mt-4'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Gate</span><span className='text-green-500'>KEEP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                {/* Password entry form */}
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />
                        <div className='relative'>
                            <input value={form.passwords} onChange={handleChange} placeholder='Enter password' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="passwords" id="passwords" />
                        </div>
                    </div>

                    {/* Save password button */}
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit border border-green-900'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                        Save Password
                    </button>
                </div>

                {/* Display saved passwords */}
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site} target='_blank' rel="noreferrer">{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                    <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                    <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                                                    <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => editPassword(item)}>
                                                <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => deletePassword(item)}>
                                                <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default Manager;