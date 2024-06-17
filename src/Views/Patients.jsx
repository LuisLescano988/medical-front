import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../Components/SearchBar'
import TableGrid from '../Components/TableGrid'
import { getPatients } from '../Middleware/Actions'

const Patients = () => {
    const elements = useSelector(state => state.patients)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPatients())
    }, [])


    return (
        <div id='pacientes' className=' h-screen flex flex-col items-center '>
            <div className=' flex flex-col w-full'>
                <div className=' flex justify-center w-full'>
                    <SearchBar />
                </div>
                <div className=''>
                    <TableGrid elements={elements} />
                </div>
            </div>
        </div>
    )
}

export default Patients