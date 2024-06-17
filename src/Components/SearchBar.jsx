import React from 'react'
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchElement }) => {


  return (
    <div className='flex flex-row h-16 lg:h-20 w-[50%] max-sm:mt-1 justify-center items-center '>
      <div className=' flex flex-row max-sm:ml-[27%] group'>
        <input className=' px-1 border-2 group-hover:border-slate-500 transition-all duration-200 lg:w-96 lg:text-xl text-base max-sm:text-xs rounded-l-lg rounded-r-none w-48 max-sm:w-36' type="text" placeholder={'Busca ' + searchElement} />
        <div className=' border-2 group-hover:border-slate-500 p-1 rounded-r-lg bg-cyan-100 transition-all duration-200 '>
          <FaSearch className='' />
        </div>
      </div>
    </div>
  )
}

export default SearchBar