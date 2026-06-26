import React from 'react'
import avatar from '../images/avatar.png'
import { GiBullseye } from "react-icons/gi";
import { GrTechnology } from "react-icons/gr";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { IoCodeSlash } from "react-icons/io5";
const Footer = () => {
  return (
    <div className="w-full bg-[#1e1e1e] rounded-t-3xl  shadow-lg ">
      
      {/* 🔹 Fake VS Code title bar on full footer */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] text-gray-400 text-sm font-mono border-b border-gray-700">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        <span className="ml-4 text-white">index.html</span>
      </div>

      {/* 🔹 Footer content area (sidebar + code) */}
      <div className="flex w-full h-full ">
        
        {/* Left Sidebar */}
        <div className="w-[30%] flex flex-col gap-4 border-r border-gray-700 p-4 text-center justify-center">
          <div>
          <div className="mb-3 flex justify-center"><div className='w-[40%] flex justify-center border-b-2 border-white pr-6 rounded-full'><img src={avatar} alt=""  className='w-[90%] '/></div></div>
          <div className="mb-3 font-bold text-white text-center nunito ">Lokesh vats</div></div>
          <ul className="space-y-2 text-gray-300 bg-slate-700 rounded-t-2xl">
            <li className="hover:text-white cursor-pointer w-full  flex justify-center items-center gap-1"><span>Preview</span><GiBullseye /></li>
            <li className="hover:text-white cursor-pointer "><span className='bg-slate-400 p-1 px-3 font-bold flex justify-center rounded-xl items-center gap-2'> Code <IoCodeSlash className='text-xl text-purple'/> </span> </li>
            <li className="hover:text-white cursor-pointer flex justify-center items-center gap-2" >Techstack <GrTechnology /></li>
            <li className="hover:text-white cursor-pointer flex justify-center items-center gap-2">Dabas <BsFileEarmarkPerson /></li>
          </ul>
        </div>

        {/* Right Code Editor */}
        <div className="w-[70%]">
          <pre className="p-6 text-lg leading-relaxed font-mono text-gray-200 overflow-x-auto pt-3">
            <code>
              <span className="text-gray-500">&lt;!DOCTYPE html&gt;</span>
              {"\n"}
              <span className="text-green-400">&lt;html </span>
              <span className="text-yellow-400">lang=</span>
              <span className="text-pink-400">"en"</span>
              <span className="text-green-400">&gt;</span>
              {"\n"}
              &nbsp;&nbsp;<span className="text-green-400">&lt;head&gt;</span>
              {"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">&lt;title&gt;</span>
              <span className="text-cyan-400">My Colorful Page</span>
              <span className="text-green-400">&lt;/title&gt;</span>
            
             
      
              {"\n"}
              &nbsp;&nbsp;<span className="text-green-400">&lt;/head&gt;</span>
              {"\n"}
              &nbsp;&nbsp;<span className="text-green-400">&lt;body&gt;</span>
              {"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">&lt;h1&gt;</span>
              <span className="text-cyan-400">Hello 🌈 World!</span>
              <span className="text-green-400">&lt;/h1&gt;</span>
              {"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">&lt;p&gt;</span>
              <span className="text-amber-300">This looks like VS Code with Tailwind colors 🎨</span>
              <span className="text-green-400">&lt;/p&gt;</span>
              {"\n"}
              &nbsp;&nbsp;<span className="text-green-400">&lt;/body&gt;</span>
              {"\n"}
              <span className="text-green-400">&lt;/html&gt;</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default Footer
