import React from 'react'
import { Link } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";


const NavBar = () => {
  return (
    <div className=' h-screen bg-slate-100 max-sm:hover:w-52 max-sm:w-[80%] z-50 w-[25%] lg:w-[30%] hover:w-full transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-300 shadow shadow-cyan-300 group'>
      <div className='flex flex-col h-screen justify-start pt-[5%] lg:gap-[5%] lg:px-5 px-3'>
        <Link to='/' className='flex relative flex-row items-center'>
          <GoHome className=' max-sm:size-12 size-10' />
          <div className='relative w-0 flex items-center'>
            <div className=' hover:font-black max-md:text-sm absolute w-44 flex flex-row group-hover:opacity-100 opacity-0 duration-200'>Home</div>
          </div>
        </Link>
        <div className='flex relative flex-row items-center'>
          <IoPersonCircleOutline className=' max-sm:size-12 size-10' />
          <div className='relative w-0 flex items-center'>
            <div className=' hover:font-black max-md:text-sm absolute w-44 flex flex-row group-hover:opacity-100 opacity-0 duration-200'>Miguelo andrade</div>
          </div>
        </div>
        <div className='flex relative flex-row items-center'>
          <IoSettingsOutline className=' max-sm:size-12 size-10' />
          <div className='relative w-0 flex items-center'>
            <div className=' hover:font-black max-md:text-sm absolute w-44 flex flex-row group-hover:opacity-100 opacity-0 duration-200'>Cambiar contraseña</div>
          </div>
        </div>
        <div className='flex absolute bottom-[4%] flex-row items-center'>
          <ImExit className=' max-sm:size-12 lg:size-10 md:size-8 size-6' />
          <div className='relative w-0 flex items-center'>
            <div className=' hover:font-black max-md:text-sm absolute w-44 flex flex-row group-hover:opacity-100 opacity-0 duration-200'>Cerrar sesión</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar