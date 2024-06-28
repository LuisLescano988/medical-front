import React, { useEffect, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { MdOutlineDeleteForever } from "react-icons/md";

const TableGrid = ({ elements: initialElements, handleInputUpdate, itemsToSearch }) => {
    const [elements, setElements] = useState(initialElements)
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
        });
        handleInputUpdate(key, e.target.value)
    }

    const table = useReactTable({
        data: elements || [],
        columns,
        state: {
            globalFilter:itemsToSearch,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        setElements(initialElements);
    }, [initialElements]);



    if (!elements || elements.length === 0) {
        return <div>
            cargue informacion para empezar
        </div>
    }

    return (
        <div className=' flex flex-col w-full items-end justify-center pr-[2%] '>
            <table className=' w-11/12 '>
                <thead className=' bg-teal-900 border-b-2 border-slate-300 text-slate-100'>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className='' >
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className={` ${(header.id=='fecha_nacimiento' || header.id == 'sexo' || header.id == 'edad' )?' pr-0 w-[1%]':''} text-left pr-3 pl-1 max-xl:pr-1 font-medium max-xl:font-normal max-lg:text-xs font-sans`}>
                                        {flexRender(header.column.columnDef.header,
                                            header.getContext())}
                                    </th>
                                ))}
                                <th className=' flex flex-row justify-center mt-[35%] font-medium max-xl:font-normal max-lg:text-xs font-sans'> <MdOutlineDeleteForever className=' size-6'/> </th>
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
                                <td className=' text-slate-100'><input type="checkbox" /></td>
                            </tr>
                        ))
                        : (
                            <tr>
                                <td colSpan={12}>No hay resultados que coincidan</td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot>
                    <tr className='hover:bg-teal-500 bg-teal-600'>
                        {keys.map((key, index) => (
                            <td key={index} className=' w-2'>
                                <input
                                    className={` w-[90%] ${key=='fecha_nacimiento'? ' ' :''} cursor-default px-1 bg-white bg-opacity-20 rounded-md text-slate-200 mr-2 appearance-none placeholder:text-opacity-50 placeholder:text-slate-200 outline-none`}
                                    type={key == "fecha_nacimiento" ? "date" : "text"}
                                    placeholder={`${key.replace(/_/g, ' ').slice(0, 13)}`}
                                    value={formData[key] || ''}
                                    onChange={(e) => handleInputChange(e, key)}
                                />
                            </td>
                        ))}
                        <td className=' w-2'></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default TableGrid