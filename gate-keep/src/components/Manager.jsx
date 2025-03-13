import React from 'react'
import { useRef, useState, useEffect } from 'react';

const Manager = () => {
    const ref = useRef()
    const [form, setform] = useState({ site: "", username: "", passwords: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])

    const showPassword = () => {
        alert("show the password");
        if (ref.current.src.includes('src/assets/eyecros.png')) {
            ref.current.src = 'src/assets/eye.png'
        }
        else {
            ref.current.src = 'src/assets/eyecros.png'
        }

    }

    const savePassword = () => {
        console.log(form)
        setPasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div class="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-
        [linear-gradient(to_right,#8080800a_1px,transparent_1px),
        linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-
        [size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-200 opacity-20 blur
        -[100px]"></div></div>
            <div className="mycontainer">
                <h1 className='text-4x1 text font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>

                    <span>Gate</span><span className='text-green-500'>KEEP/&gt;</span>

                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="" />
                    <div className="flex w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="" />
                        <div className='relative'>

                            <input value={form.passwords} onChange={handleChange} placeholder='Enter password' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="passwords" id="" />
                            <span className='absolute right-[3px] top-[3px] cursor-pointer onClick={showPassword}'>
                                <img ref={ref} className='p-1' width={45} src="src/assets/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jectmwqf.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add Password</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length !=0 &&<table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index)=> {
                                return <tr key={index}>
                                <td className='py-2 border border-white text-center w-32'><a href={item.site} target='_blank'>{item.site}</a></td>
                                <td className='py-2 border border-white text-center w-32'>{item.username}</td>
                                <td className='py-2 border border-white text-center w-32'>{item.passwords}</td>
                            </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager