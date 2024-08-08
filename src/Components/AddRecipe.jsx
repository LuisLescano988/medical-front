import React from 'react'
import { RiStickyNoteAddLine } from "react-icons/ri";

const AddRecipeComponent = () => {
  

  return (
    <div className=' flex items-start justify-start'>
      <div className=' flex flex-row rounded-b-lg pl-2 items-start justify-between transition-all duration-300 border-black bg-teal-200 hover:bg-teal-300 pt-[2%] '>
        <h5>Agregar</h5>
        <RiStickyNoteAddLine className=' w-12 h-6' />
      </div>
    </div>
  )
}

export default AddRecipeComponent