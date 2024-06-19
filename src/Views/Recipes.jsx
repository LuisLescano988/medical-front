import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../Components/SearchBar'
import TableGrid from '../Components/TableGrid'
import { getRecipes } from '../Middleware/Actions'

const Recipes = () => {
    const elements = useSelector(state => state.recipes)
    const dispatch = useDispatch()
    const [prevLength, setPrevLength] = useState(elements ? elements.length : 0)

    useEffect(() => {
        if (elements.length !== prevLength) {
            dispatch(getRecipes())
            setPrevLength(elements.length)
        }
    }, [])

    return (
        <div id='pacientes' className=' h-screen flex flex-col items-center '>
            <div className=' flex flex-col w-full'>
                <div className=' flex justify-start w-full'>
                    <SearchBar searchElement='recetas' />
                </div>
                <div className=''>
                    <TableGrid elements={elements} />
                </div>
            </div>
        </div>
    )
}
export default Recipes