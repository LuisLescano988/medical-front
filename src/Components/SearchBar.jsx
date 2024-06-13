import React from 'react'
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchElement }) => {


  return (
    <div className='flex flex-row h-16 lg:h-20 w-[50%] justify-center items-center'>
      <div className=' flex flex-row ml-[29%]'>
        <input className=' px-1 border lg:w-96 lg:text-xl text-base rounded-l-lg rounded-r-none w-48' type="text" placeholder={'Busca ' + searchElement} />
        <div className=' border hover:border-black hover:border-2 p-1 rounded-r-lg bg-cyan-100 '>
          <FaSearch className='' />
        </div>
      </div>
    </div>
  )
}

export default SearchBar