import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Patients = () => {
    const patients = useSelector(state => state.patients)
    
    return (
        <div>
           
        </div>
    )
}

export default Patients