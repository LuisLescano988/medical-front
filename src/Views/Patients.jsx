import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import SearchBar from '../Components/SearchBar'

const Patients = () => {
    const patients = useSelector(state => state.patients)
    const currentElement = 'pacientes'

    return (
        <div id='pacientes' className=' h-screen flex flex-col items-center '>
            <div className=' flex flex-col w-full'>
                <div className=' flex justify-center w-full'>
                    <SearchBar searchElement={currentElement} />
                </div>
                <div className=' flex ml-[20%]'>
                    <ul className='bg-slate-200 h-full w-11/12'>
                        <li>a</li>
                        <li>b</li>
                    </ul>
                    {/* {
                        patients.map()
                    } */}
                </div>
            </div>
        </div>
    )
}

export default Patients