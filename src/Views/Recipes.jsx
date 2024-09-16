/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../Components/SearchBar'
import { addRecipe, getPatients, getRecipes } from '../Middleware/Actions'
import Cookies from 'js-cookie'
import AddRecipe from '../Components/Forms/AddRecipe'
import TableRecipes from '../Components/Tables/TableRecipes'
import Swal from 'sweetalert2'
import { RiStickyNoteAddLine } from 'react-icons/ri'

const Recipes = () => {
    const elements = useSelector(state => state.recipes)
    const patients = useSelector(state => state.patients)
    const userId = Cookies.get('user_id')
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSearchChange = (value) => {
        setSearchValue(value)
    }

    useEffect(() => {
        dispatch(getRecipes(userId))
        dispatch(getPatients(userId))
    }, [])

    if (elements.length < 1) {
        return <div id='pacientes' className='flex flex-col items-end w-full'>
            <div className=' flex flex-col w-11/12'>
                <div className=' flex justify-around'>
                    <SearchBar onSearchChange={handleSearchChange} searchElement='recetas' />
                </div>
                <div className=' flex flex-col items-center '
                    onClick={handleOpenModal}>
                    <div className=' flex rounded-lg p-3 font-medium transition-all duration-300 border-black bg-teal-200 hover:bg-teal-300 '>
                        <h5>Agregar receta</h5>
                        <RiStickyNoteAddLine className=' w-12 h-6' />
                    </div>
                    <AddRecipe isOpen={isModalOpen} onClose={handleCloseModal} patientsList={patients} />
                </div>
            </div>
        </div>
    }


    return (
        <div id='recetas' className='flex flex-col '>
            <div className=' flex flex-col'>
                <div className=' flex justify-around'>
                    <SearchBar onSearchChange={handleSearchChange} searchElement='recetas' />
                </div>
                <div className=' flex flex-col items-end'>
                    <TableRecipes itemsToSearch={searchValue} />
                </div>
            </div>
        </div>
    )
}

export default Recipes