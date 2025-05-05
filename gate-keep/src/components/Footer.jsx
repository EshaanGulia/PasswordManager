import React from "react";

// Footer component
const Footer = () => {
    return (
        // Container div with background color, text color, flex layout, and full width
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'>

            {/* Logo section styled similarly to header/logo */}
            <div className='logo font-bold text-white text-2x1'>
                <span className='text-green-500'> &lt;</span>
                <span>Gate</span><span className='text-green-500'>KEEP/&gt;</span>
            </div>

            {/* Attribution text */}
            <div className='flex justify-center items-center'>
                Created by Eshaan Gulia, Ayaan Akram, Samuel Diriba, Hadi Elkhaled
            </div>
        </div>
    );
}

export default Footer;