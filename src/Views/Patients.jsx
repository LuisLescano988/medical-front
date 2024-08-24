import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../Components/SearchBar'
import { getPatients } from '../Middleware/Actions'
import Cookies from 'js-cookie'
import TablePatient from '../Components/Tables/TablePatient'

const Patients = () => {
    const elements = useSelector(state => state.patients)
    const userId = Cookies.get('user_id')
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [addPatientForm, setAddPatientForm] = useState({
        nombre: "",
        apellido: "",
        sexo: "",
        fecha_nacimiento: "",
        obra_social: "",
        numero_afiliado: "",
        dni: "",
        provincia: "",
        ciudad: "",
        medicacion: "",
        user_id: userId
    })


    const handleInputChange = (e, key) => {
        setAddPatientForm({
            ...addPatientForm,
            [key]: e.target.value
        })
    }

    const handleSearchChange = (value) => {
        setSearchValue(value)
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
                </div>
            </div>
        </div>
    }


    return (
        <div id='pacientes' className='flex flex-col items-center w-screen'>
            <div className=' flex flex-col w-full'>
                <div className=' flex justify-around'>
                    <SearchBar onSearchChange={handleSearchChange} searchElement='pacientes' />
                </div>
                <div className=' flex flex-col items-center'>
                    <TablePatient itemsToSearch={searchValue} />
                </div>
            </div>
        </div>
    )
}

export default Patients