import React from 'react'
import Navbar from './components/Navbar'
import RotatingText from './components/RotatingText'
import Footer from './components/Footer'
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const handleUploadClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/uploads');
    } else {
      navigate('/login');  
    }
  };

  return (
    <div className='relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden'>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main content container */}
      <div className='relative flex flex-col min-h-screen'>
        
        {/* Header */}
        <div className='w-full z-10 p-3 md:p-6'>
          <Navbar />
        </div>

        {/* Main Content Section */}
        <div className='flex-1 flex items-center justify-center px-4 py-8 md:py-16'>
          <div className='w-full max-w-7xl mx-auto'>
            
            {/* Hero Text */}
            <div className='flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-6 xl:gap-8 text-center lg:text-left mb-16 lg:mb-20'>
              <div className='text-black order-2 lg:order-1'>
                <RotatingText
                  texts={['Resume', 'Text', 'Design']}
                  mainClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl overflow-hidden resume-name rounded-2xl lg:rounded-3xl w-[280px] sm:w-[320px] md:w-[380px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-center flex justify-center shadow-2xl border border-white/20"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%"}}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-1 md:pb-2"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={4000}
                />
              </div>

              <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl playto text-white/90 font-light order-3 lg:order-2'>
                To
              </div>
              
              <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl portfolio-name bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-bold order-4 lg:order-3'>
                Portfolio
              </div>
              
              <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl order-4 animate-bounce flex justify-center'>
                🚀 
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 lg:gap-8 mb-16">
              
              {/* Upload Button */}
              <button 
                onClick={handleUploadClick}  
                className="group relative px-8 sm:px-10 md:px-12 lg:px-16 py-4 md:py-5 lg:py-6 
                  rounded-2xl lg:rounded-3xl text-black font-bold tracking-wide
                  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
                  shadow-[0_0_30px_rgba(255,0,150,0.6)] 
                  hover:shadow-[0_0_50px_rgba(255,0,150,0.8)] 
                  hover:scale-105 active:scale-95
                  transition-all duration-300 ease-out
                  flex items-center justify-center gap-3 md:gap-4
                  text-lg md:text-xl lg:text-2xl
                  w-full sm:w-auto min-w-[200px] sm:min-w-[240px] lg:min-w-[280px]
                  border border-white/20 backdrop-blur-sm
                  overflow-hidden"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl lg:rounded-3xl blur-xl"></div>
                
                <span className="relative z-10 flex items-center gap-3 md:gap-4">
                  Upload 
                  <IoCloudUploadOutline className='text-black text-xl md:text-2xl lg:text-3xl font-bold transition-transform group-hover:scale-110' />
                </span>
              </button>

              {/* Contact Me Button */}
              <button className="group relative px-8 sm:px-10 md:px-12 lg:px-16 py-4 md:py-5 lg:py-6 
                rounded-2xl lg:rounded-3xl font-semibold tracking-wide 
                border-2 border-pink-400/80 text-pink-400 bg-black/40 backdrop-blur-sm
                shadow-[0_0_30px_rgba(255,0,150,0.3)] 
                hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600
                hover:text-white hover:border-transparent
                hover:shadow-[0_0_50px_rgba(255,0,150,0.6)] 
                hover:scale-105 active:scale-95
                transition-all duration-300 ease-out
                text-lg md:text-xl lg:text-2xl 
                w-full sm:w-auto min-w-[200px] sm:min-w-[240px] lg:min-w-[280px]
                overflow-hidden"
              >
                {/* Button background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl lg:rounded-3xl"></div>
                
                <span className="relative z-10">Contact Me</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Footer Section */}
        <div className="relative w-full px-2 md:px-4 pb-0">
          <div className="relative mx-auto max-w-6xl">
            <div className="relative h-[180px] sm:h-[200px] md:h-[240px] lg:h-[280px] xl:h-[300px] w-full">
              
              {/* Enhanced glowing border container */}
              <div className="absolute inset-0 rounded-t-3xl overflow-hidden">
                
                {/* Multiple layered glow effects */}
                <div className="absolute inset-0 rounded-t-3xl">
                  {/* Primary glow */}
                  <div className="absolute -top-1 -left-1 -right-1 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-t-3xl shine-animation blur-sm"></div>
                  <div className="absolute top-0 -left-1 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 shine-animation blur-sm"></div>
                  <div className="absolute top-0 -right-1 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 shine-animation blur-sm"></div>
                  
                  {/* Secondary glow */}
                  <div className="absolute -top-2 -left-2 -right-2 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-t-3xl shine-animation blur-md opacity-60"></div>
                  <div className="absolute top-0 -left-2 bottom-0 w-2 bg-gradient-to-b from-pink-400 via-purple-400 to-indigo-400 shine-animation blur-md opacity-60"></div>
                  <div className="absolute top-0 -right-2 bottom-0 w-2 bg-gradient-to-b from-pink-400 via-purple-400 to-indigo-400 shine-animation blur-md opacity-60"></div>
                  
                  {/* Outer glow */}
                  <div className="absolute -top-4 -left-4 -right-4 h-4 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-t-3xl shine-animation blur-xl opacity-30"></div>
                  <div className="absolute top-0 -left-4 bottom-0 w-4 bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-300 shine-animation blur-xl opacity-30"></div>
                  <div className="absolute top-0 -right-4 bottom-0 w-4 bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-300 shine-animation blur-xl opacity-30"></div>
                </div>
              </div>

              {/* Footer content container */}
              <div className="relative w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-t-3xl border-t-2 border-l-2 border-r-2 border-white/30 shadow-2xl backdrop-blur-sm">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .shine-animation {
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 0, 150, 0.8) 25%, 
            rgba(138, 43, 226, 0.8) 50%, 
            rgba(0, 191, 255, 0.8) 75%, 
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shine 3s ease-in-out infinite;
        }
        
        .resume-name, .playto, .portfolio-name {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
        
        @media (max-width: 640px) {
          .resume-name {
            padding: 0.75rem;
          }
        }
        
        @media (min-width: 641px) {
          .resume-name {
            padding: 1rem;
          }
        }
        
        @media (min-width: 1024px) {
          .resume-name {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Home