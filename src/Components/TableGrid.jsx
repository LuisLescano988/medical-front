import React, { useEffect, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useDispatch } from 'react-redux'
import { addPatient } from '../Middleware/Actions'
import Swal from 'sweetalert2'
import AddPatient from './AddPatient'

const TableGrid = ({ elements:initialElements }) => {
    const [elements, setElements] = useState(initialElements)
    const dispatch = useDispatch()
    const [globalFilter, setGlobalFilter] = useState()
    const [formData, setFormData] = useState({})
    const columnHelper = createColumnHelper()
    const keys = elements && elements.length > 0 ? Object.keys(elements[0]).filter(key => key !== 'id') : [];
    const columns = keys.map(key =>
        columnHelper.accessor(key, {
            cell: (info) => <span>{info.getValue()}</span>,
            header: key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)
        })
    )

    const handleInputChange = (e, key) => {
        setFormData({
            ...formData,
            [key]: e.target.value
        })
    }

    const table = useReactTable({
        data: elements || [],
        columns,
        state: {
            globalFilter,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const handleSubmit = () => {
        dispatch(addPatient(formData))
            .then(newPatient => {
                setElements([...elements, newPatient]);
                Swal.fire('Se agregó correctamente');
            })
            .catch(error => {
                console.error('Error al agregar paciente:', error);
                Swal.fire('Error al agregar paciente');
            });
    };

    useEffect(() => {
        setElements(initialElements);
    }, [initialElements]);
    


    if (!elements || elements.length === 0) {
        return <div>Cargue informacion para ver</div>;
    }

    return (
        <div className=' flex flex-col w-fit justify-center items-start max-sm:ml-[20%] ml-[8%]'>
            <table className=' '>
                <thead className=' bg-teal-900 text-slate-100'>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className='' >
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className=' text-left pr-3 pl-1 max-xl:pr-1 font-medium max-xl:font-normal max-lg:text-xs font-sans'>
                                        {flexRender(header.column.columnDef.header,
                                            header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {table.getRowModel().rows.length
                        ? table.getRowModel().rows.map((row, i) => (
                            <tr key={row.id} className={`${i % 2 ? 'bg-teal-600 hover:bg-teal-500' : 'hover:bg-teal-700 bg-teal-900'}`}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className=' px-1 pr-2 text-slate-100 text-left'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                        : (
                            <tr>
                                <td colSpan={12}>Cargue informacion para ver</td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot>
                    <tr className='hover:bg-teal-500 bg-teal-600'>
                        {keys.map((key, index) => (
                            <td key={index} className=' w-2'>
                                <input
                                    className=' w-[90%] cursor-default px-1 bg-white bg-opacity-20 rounded-md text-slate-200 mr-2 appearance-none placeholder:text-opacity-50 placeholder:text-slate-200 outline-none'
                                    type={key == "fecha_nacimiento" ? "date" : "text"}
                                    placeholder={`${key.replace(/_/g, ' ').slice(0, 13)}`}
                                    value={formData[key] || ''}
                                    onChange={(e) => handleInputChange(e, key)}
                                />
                            </td>
                        ))}
                    </tr>
                </tfoot>
            </table>
            <div className=' flex w-full justify-end max-sm:justify-start'>
                <button onClick={handleSubmit} >
                    <AddPatient />
                </button>
            </div>
        </div>
    )
}

export default TableGrid