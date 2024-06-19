import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../Components/SearchBar'
import TableGrid from '../Components/TableGrid'
import { getPatients } from '../Middleware/Actions'
import AddPatient from '../Components/AddPatient'

const Patients = () => {
    const elements = useSelector(state => state.patients)
    const dispatch = useDispatch()
    const [prevLength, setPrevLength] = useState(elements?elements.length:0)

    useEffect(() => {
        if(elements.length !== prevLength){
            dispatch(getPatients())
            setPrevLength(elements.length)
        }
    }, [elements])


    return (
        <div id='pacientes' className='flex flex-col '>
            <div className=' flex flex-col'>
                <div className=' flex justify-around'>
                    <SearchBar searchElement='pacientes'/>
                </div>
                <div className=' '>
                    <TableGrid elements={elements} />
                </div>
            </div>
        </div>
    )
}

export default Patients