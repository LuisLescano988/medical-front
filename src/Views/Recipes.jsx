import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../Components/SearchBar'
import { addRecipe, getPatients, getRecipes } from '../Middleware/Actions'
import AddRecipeComponent from '../Components/AddRecipe'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import TableRecipes from '../Components/Tables/TableRecipes'

const Recipes = () => {
    const elements = useSelector(state => state.recipes)
    const userId = Cookies.get('user_id')
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [addRecipeForm, setAddRecipeForm] = useState({
        paciente: '',
        user: userId,
        fecha: '',
        medicacion: '',
        droga: '',
        dosis: '',
        presentacion: '',
        marca_recomendada: '',
        cantidad_unidades: '',
        firma_medica: '',
        qr_codigo_barras: '',
        fecha_ultimo_laboratorio: '',
        proxima_fecha_empadronamiento: '',
        observaciones: ''
    })

    const handleInputChange = (e, key) => {
        setAddRecipeForm({
            ...addRecipeForm,
            [key]: e.target.value
        })
    }

    const handleSubmit = () => {
        dispatch(addRecipe(addRecipeForm))
            .then(() => {
                setAddRecipeForm({})
                Swal.fire(`Se agregó correctamente`);
            })
            .then(() => {
                location.reload()
            })
            .catch(error => {
                console.error('Error al registrar la receta:', error);
                Swal.fire('Error al registrar la receta')
            });
    }

    const handleSearchChange = (value) => {
        setSearchValue(value)
    }

    const handleInputUpdate = (key, value) => {
        setAddRecipeForm({
            ...addRecipeForm,
            [key]: value
        });
    }

    useEffect(() => {
      dispatch(getRecipes())
      dispatch(getPatients())
    }, [])
    


    if (elements.length < 1) {
        return <div id='pacientes' className='flex flex-col items-end w-full'>
            <div className=' flex flex-col w-11/12'>
                <div className=' flex justify-around'>
                    <SearchBar onSearchChange={handleSearchChange} searchElement='recetas' />
                </div>
                <div className=' mt-[2%]'>
                    {Object.keys(addRecipeForm).map((key, index) => (
                        <input
                            className=' w-[8%] pr-2'
                            key={index}
                            type={key == "fecha_nacimiento" ? "date" : "text"}
                            placeholder={key.replace(/_/g, '')}
                            value={addRecipeForm[key]}
                            onChange={(e) => handleInputChange(e, key)}
                        />
                    ))}
                    <button className=' flex justify-end pr-[2%] pt-[0.1%] w-full' onClick={handleSubmit}>
                        <AddRecipeComponent />
                    </button>
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
                    {/* <TableGrid
                        itemsToSearch={searchValue}
                        elements={elements}
                        handleInputUpdate={handleInputUpdate}
                        hiddenColumns={['user']}
                    />
                    <button className=' flex justify-end pr-[2%] pt-[0.1%] w-fit' onClick={handleSubmit}>
                        <AddRecipeComponent />
                    </button> */}
                    <TableRecipes itemsToSearch={searchValue}/>
                </div>
            </div>
        </div>
    )
}

export default Recipes