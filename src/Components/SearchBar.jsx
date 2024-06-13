import React from 'react'
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchElement }) => {


  return (
    <div className='flex flex-row h-16 border justify-center items-center'>
      <div className=' flex flex-row w-full'>
        <input className='border' type="text" placeholder={'Busca ' + searchElement} />
        <div className=' border p-1'>
          <FaSearch className='' />
        </div>
      </div>
    </div>
  )
}

export default SearchBar