/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='flex flex-col justify-between items-center h-3/5 w-full'>
            <h1 className=' place-content-center self-start font-bold text-2xl w-2/6 h-3/6'>Logo</h1>
            <div className=" p-2 ">
                <nav className=" grid grid-cols-2 lg:grid-cols-4 gap-10 max-sm:gap-3 h-full">
                    <div className=' hover:shadow-2xl hover:shadow-violet-400 transition-all duration-300'>
                        <Link to="/patients" className=" text-slate-300 hover:text-white font-semibold cursor-default  justify-center items-center flex text-xl duration-200 bg-teal-900 p-2 rounded-md max-sm:w-24 max-md:text-base lg:h-44 h-28 lg:w-56 w-28 ">Pacientes</Link>
                    </div>
                    <div className=' hover:shadow-2xl hover:shadow-violet-400 transition-all duration-300 rounded-lg'>
                        <Link to="/recipes" className=" text-slate-300 hover:text-white font-semibold cursor-default hover:shadow-2xl transition-all duration-200 shadow-red-100 justify-center items-center flex text-xl bg-teal-900 p-2 rounded-md max-sm:w-24 max-md:text-base lg:h-44 h-28 lg:w-56 w-28">Recetas</Link>
                    </div>
                    <div className=' hover:shadow-2xl hover:shadow-violet-400 transition-all duration-300'>
                        <Link to="/laboratory" className=" text-slate-300 hover:text-white font-semibold cursor-default hover:shadow-2xl hover:border-opacity-80  transition-all duration-200 shadow-black-900 justify-center items-center flex text-xl bg-teal-900 p-2 rounded-md max-sm:w-24 max-md:text-base lg:h-44 h-28 lg:w-56 w-28 flex-col">
                            <div>
                                Laboratorio
                            </div>
                        </Link>
                    </div>
                    <div className=' hover:shadow-2xl hover:shadow-violet-400 transition-all duration-300'>
                        <Link to="/statistics" className="text-slate-300 hover:text-white font-semibold cursor-default hover:shadow-2xl hover:border-opacity-80  transition-all duration-200 shadow-black-900 justify-center items-center flex text-xl bg-teal-900 p-2 rounded-md max-sm:w-24 max-md:text-base lg:h-44 h-28 lg:w-56 w-28">Estadisticas</Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Home