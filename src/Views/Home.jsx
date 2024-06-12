import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='flex justify-center items-center h-screen w-full z-30'>
            <div className=" p-2 ">
                <nav className=" grid grid-cols-2 gap-10 max-sm:gap-3 h-full">
                    <Link to="/patients" className=" text-white cursor-default hover:shadow-2xl hover:border-opacity-80 border-black border-opacity-0 transition-all border duration-500 shadow-black-900 justify-center items-center flex text-xl bg-red-400 p-2 rounded-md max-sm:w-24 max-md:text-base lg:h-44 h-28 lg:w-44 w-28 ">Pacientes</Link>
                    <Link to="/recipes" className="text-white cursor-default hover:shadow-2xl hover:border-opacity-80 border-black border-opacity-0 transition-all border duration-500 shadow-black-900 justify-center items-center flex text-xl bg-red-400 p-2 rounded-md max-sm:w-24 max-md:text-base lg:h-44 h-28 lg:w-44 w-28">Recetas</Link>
                    <Link to="/statistics" className="text-white cursor-default hover:shadow-2xl hover:border-opacity-80 border-black border-opacity-0 transition-all border duration-500 shadow-black-900 justify-center items-center flex text-xl bg-red-400 p-2 rounded-md max-sm:w-24 max-md:text-base lg:h-44 h-28 lg:w-44 w-28">Estadisticas</Link>
                    <Link to="/history" className="text-white cursor-default hover:shadow-2xl hover:border-opacity-80 border-black border-opacity-0 transition-all border duration-500 shadow-black-900 justify-center items-center flex text-xl bg-red-400 p-2 rounded-md max-sm:w-24 max-md:text-base lg:h-44 h-28 lg:w-44 w-28 flex-col">
                        <div>
                            Historias
                        </div>
                        <div>
                            Clinicas
                        </div>
                    </Link>
                </nav>
            </div>
        </div>
    )
}

export default Home