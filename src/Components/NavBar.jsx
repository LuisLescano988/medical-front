import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";


const NavBar = () => {
  return (
    <div className=' h-screen max-sm:hover:w-52 max-sm:w-[80%] z-50 w-[25%] lg:w-[30%] hover:w-full transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-300 shadow shadow-cyan-300 group'>
      <div className='flex flex-col h-screen justify-start pt-[5%] lg:gap-[5%] lg:px-5 px-3'>
        <div className='flex relative flex-row items-center'>
          <GoHome className=' max-sm:size-12 size-10' />
          {/* <div className=' w-1/12 text-base left-[8%] opacity-0 group-hover:opacity-100 transition-all duration-700'>Home</div> */}
          <div className='relative w-0 flex items-center'>
            <div className=' max-md:text-sm absolute w-44 flex flex-row group-hover:opacity-100 opacity-0 duration-700'>Home</div>
          </div>
        </div>
        <div className='flex relative flex-row items-center'>
          <IoPersonCircleOutline className=' max-sm:size-12 size-10' />
          <div className='relative w-0 flex items-center'>
            <div className=' max-md:text-sm absolute w-44 flex flex-row group-hover:opacity-100 opacity-0 duration-700'>Miguelo andrade</div>
          </div>
        </div>
        <div className='flex relative flex-row items-center'>
          <IoSettingsOutline className=' max-sm:size-12 size-10' />
          <div className='relative w-0 flex items-center'>
            <div className=' max-md:text-sm absolute w-44 flex flex-row group-hover:opacity-100 opacity-0 duration-700'>Cambiar contraseña</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar