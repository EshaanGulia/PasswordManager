import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

            <div className="logo font-bold text-white text-2x1">
                <span className='text-green-500'> &lt;</span>
                
                <span>Gate</span><span className='text-green-500'>KEEP/&gt;</span>
                
                </div>
          {/*  <ul>
                <li className='flex gap-4'>
                    <a className='hover:font-bold' href='/'>Home</a>
                    <a className='hover:font-bold' href='/'>About</a>
                    <a className='hover:font-bold' href='/'>Contact</a>
                    <img ref={ref} className='p-1' width={45} src="src/assets/eye.png" alt="eye" />
                      toast.success("Password saved!", {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                theme: "colored",
                            });
                        };
                </li>
            </ul>}*/}
            <button onClick={() => window.open('https://github.com/EshaanGulia/PasswordManager')}className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center ring-white ring-1'>
                <img className='invert w-10 p-1' src="src/assets/github.png" alt="github logo" />
                <span className='font-bold px-2'>Github</span>
            </button>

            </div>
        </nav>
    )
}

export default Navbar