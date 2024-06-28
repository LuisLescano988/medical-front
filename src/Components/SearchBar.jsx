import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchElement, onSearchChange }) => {
  const [itemsToSearch, setItemsToSearch] = useState('')

  const handleInputChange = (e) => {
    const value = e.target.value
    setItemsToSearch(value)
    onSearchChange(value)
  }
  
  return (
    <div className='flex flex-row h-12 lg:h-12 lg:mt-[1%] w-[50%] max-sm:mt-1 justify-center items-center '>
      <div className=' flex flex-row max-sm:ml-[27%] group'>
        <input className=' px-1 cursor-default border-b-2 border-gray-300 group-hover:border-b-black outline-none bg-slate-200 transition-all duration-300 lg:w-96 lg:text-xl text-base max-sm:text-xs w-48 max-sm:w-36'
          type="text"
          placeholder={'Buscar ' + searchElement}
          value={itemsToSearch}
          onChange={handleInputChange}
          />
        <div className=' border-2 group-hover:text-black text-gray-500 p-1 rounded-r-lg bg-slate-200 transition-all duration-300 '>
          <FaSearch className='' />
        </div>
      </div>
    </div>
  )
}

export default SearchBar