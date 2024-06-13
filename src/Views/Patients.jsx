import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import SearchBar from '../Components/SearchBar'

const Patients = () => {
    const patients = useSelector(state => state.patients)
    const currentElement = 'pacientes'

    return (
        <div id='pacientes' className=' h-screen '>
            <div className=' flex flex-col w-fit'>
                <div className=' w-full'>
                    <SearchBar searchElement={currentElement} />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Patients