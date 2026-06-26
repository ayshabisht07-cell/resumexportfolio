import React, { useState } from 'react'
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from 'react-router';
const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
const navigate =   useNavigate()

const navigatoring =()=>{
    navigate('/login'); 
}
  return (
    <div className='relative p-3 sm:p-4'>
      {/* Animated background gradient */}
      <div className='absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-500/20 animate-pulse rounded-2xl sm:rounded-3xl'></div>
      
      <div className='relative w-full flex justify-between items-center backdrop-blur-xl bg-white/10 border border-white/20 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl shadow-2xl'>
        
        {/* Logo with glow effect */}
        <div className='relative group cursor-pointer'>
          <div className='absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200'></div>
          <div className='relative bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-black text-xl sm:text-2xl px-2 sm:px-3 py-1'>
            LOGO
          </div>
        </div>

        {/* Navigation menu with hover effects (hidden on small) */}
        <div className='hidden md:block'>
          <ul className='flex justify-center gap-6 lg:gap-8'>
            {['Home', 'Price', 'Work', 'About'].map((item, index) => (
              <li 
                key={item}
                className='relative cursor-pointer'
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className={`text-white font-semibold text-base sm:text-lg transition-all duration-300 hover:text-cyan-300 ${
                  hoveredItem === index ? 'text-cyan-300 scale-110' : ''
                }`}>
                  {item}
                </span>
                
                {/* Animated underline */}
                <div className={`absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 ${
                  hoveredItem === index ? 'w-full' : 'w-0'
                }`}></div>
                
                {/* Glow effect on hover */}
                {hoveredItem === index && (
                  <div className='absolute inset-0 bg-white/10 rounded-lg blur-sm -z-10 animate-pulse'></div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Login button with advanced effects */}
        <div className='relative group hidden sm:block'>
          <div className='absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse'></div>
          
          <button className='relative bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/30 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-bold text-white flex gap-2 sm:gap-3 items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl group text-sm sm:text-base'onClick={navigatoring}>
            <span className='bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent'>
              Login
            </span>
            <IoPersonAddSharp className='text-cyan-300 text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300' />
            
            {/* Shimmer effect */}
            <div className='absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-shimmer opacity-0 group-hover:opacity-100'></div>
          </button>
        </div>

        {/* Mobile menu toggle (shown only on small) */}
        <div className='md:hidden flex items-center'>
          <button className='text-white p-2'>
            <div className='w-6 h-0.5 bg-white mb-1.5 transition-all'></div>
            <div className='w-6 h-0.5 bg-white mb-1.5 transition-all'></div>
            <div className='w-6 h-0.5 bg-white transition-all'></div>
          </button>
        </div>
      </div>

      {/* Additional CSS for custom animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .group:hover .animate-shimmer {
          animation: shimmer 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Navbar
