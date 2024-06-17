import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";


const NavBar = ({ opened, setOpened }) => {
  
  

  return (
    <div className={` flex flex-row pl-[15%] ${opened ? 'pr-[500%]' : 'pr-0'} h-screen bg-slate-100 w-16 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-300 shadow-cyan-300`}
      onClick={() => setOpened(!opened)}
      onMouseLeave={() => setOpened(false)}
    >
      
      <div className='flex flex-col h-screen justify-between '>
        <div className=' flex flex-col justify-center items-center gap-5 pt-[50%]'>
          <Link to='/' className='flex relative flex-row items-center'>
            <GoHome className=' size-10' />
            <div className='relative flex items-center'>
              <div className={` text-sm text-left absolute w-44 ${opened ? 'opacity-100 hover:font-extrabold' : 'opacity-0 -translate-x-60 '} flex-row duration-75`}>Inicio</div>
            </div>
          </Link>
          <div className='flex relative flex-row items-center'>
            <IoPersonCircleOutline className=' size-10' />
            <div className='relative w-0 flex items-center'>
              <div className={` text-sm text-left absolute w-44 ${opened ? 'opacity-100 hover:font-extrabold' : 'opacity-0 -translate-x-72 '} flex-row duration-75`}>Miguelo Andrade</div>
            </div>
          </div>
          <div className='flex relative flex-row  items-center'>
            <IoSettingsOutline className=' size-10' />
            <div className='relative w-0 flex items-center'>
              <div className={` text-sm text-left absolute w-44 ${opened ? 'opacity-100 hover:font-extrabold' : 'opacity-0 -translate-x-72 '} flex-row duration-75`}>Cambiar contraseña</div>
            </div>
          </div>
        </div>
        <div className=' mb-[50%]'>
          <div className='flex relative flex-row items-center'>
            <ImExit className=' size-10 ' />
            <div className='relative w-0 flex items-center'>
              <div className={` text-sm text-left absolute w-44 ${opened ? 'opacity-100 hover:font-extrabold' : 'opacity-0 -translate-x-72 '} flex-row duration-75`}>Cerrar sesión</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar