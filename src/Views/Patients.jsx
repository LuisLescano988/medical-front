import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../Components/SearchBar'
import TableGrid from '../Components/TableGrid'
import { addPatient, getPatients } from '../Middleware/Actions'
import AddPatient from '../Components/AddPatient'
import Swal from 'sweetalert2'

const Patients = () => {
    const elements = useSelector(state => state.patients)
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [addPatientForm, setAddPatientForm] = useState({
        nombre: '',
        apellido: '',
        sexo: '',
        fecha_nacimiento: '',
        obra_social: '',
        numero_afiliado: '',
        dni: '',
        provincia: '',
        ciudad: '',
        medicacion: '',
        historia_clinica: '',
        edad: ''
    })

    const handleInputChange = (e, key) => {
        setAddPatientForm({
            ...addPatientForm,
            [key]: e.target.value
        })
    }
    
    const handleSubmit = () => {
        dispatch(addPatient(addPatientForm))
        .then(() => {
            setAddPatientForm({})
            Swal.fire(`Se agregó correctamente`);
        })
        .then(() => {
            location.reload()
        })
        .catch(error => {
            console.error('Error al agregar paciente:', error);
            Swal.fire('Error al agregar paciente')
        });
    }

    const handleSearchChange = (value)=>{
        setSearchValue(value)
    }
    
    const handleInputUpdate = (key, value) => {
        setAddPatientForm({
            ...addPatientForm,
            [key]: value
        });
    }

    useEffect(() => {
        dispatch(getPatients())
    }, [])

    if (elements.length < 1) {
        return <div id='pacientes' className='flex flex-col items-end w-full'>
            <div className=' flex flex-col w-11/12'>
                <div className=' flex justify-around'>
                    <SearchBar onSearchChange={handleSearchChange} searchElement='pacientes' />
                </div>
                <div className=' mt-[2%]'>
                    {Object.keys(addPatientForm).map((key, index) => (
                        <input
                            className=' w-[8%] pr-2'
                            key={index}
                            type={key == "fecha_nacimiento" ? "date" : "text"}
                            placeholder={key.replace(/_/g, '')}
                            value={addPatientForm[key]}
                            onChange={(e) => handleInputChange(e, key)}
                        />
                    ))}
                    <button className=' flex justify-end pr-[2%] pt-[0.1%] w-full' onClick={handleSubmit}>
                        <AddPatient />
                    </button>
                </div>
            </div>
        </div>
    }


    return (
        <div id='pacientes' className='flex flex-col '>
            <div className=' flex flex-col'>
                <div className=' flex justify-around'>
                    <SearchBar onSearchChange={handleSearchChange} searchElement='pacientes' />
                </div>
                <div className=' flex flex-col items-end'>
                    <TableGrid itemsToSearch={searchValue} elements={elements} handleInputUpdate={handleInputUpdate} />
                    <button className=' flex justify-end pr-[2%] pt-[0.1%] w-full' onClick={handleSubmit}>
                        <AddPatient />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Patients