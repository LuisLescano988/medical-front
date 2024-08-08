import React, { useEffect, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useSelector } from 'react-redux'
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import AddRecipe from './AddRecipe';
import Swal from 'sweetalert2';

const TableRecipes = ({ itemsToSearch }) => {
    const recipes = useSelector(state => state.recipes)
    const patients = useSelector(state => state.patients)
    const columnHelper = createColumnHelper()
    const [formData, setFormData] = useState({})

    const getPatientNameById = (id) => {
        const patient = patients.find(patient => patient.id === id);
        console.log(patient)
        return patient ? `${patient.nombre} ${patient.apellido}` : id;
    };
    const keys = recipes && recipes.length > 0 ? Object.keys(recipes[0]).filter(key => key !== 'id' && key !== 'user') : [];

    const columns = keys.map(key =>
        columnHelper.accessor(key, {
            cell: (info) => {
                const value = info.getValue();
                if (key === 'paciente') {
                    return <span onClick={() => handleCellClick(info)}>{getPatientNameById(info.getValue())}</span>;
                } else if (key === 'medicacion') {
                    const concatenatedString = value.map(item => item[Object.keys(item)[0]]).join(', ');
                    return <span onClick={() => handleCellClick(info)}>{concatenatedString}</span>;
                }
                return <span onClick={() => handleCellClick(info)}>{info.getValue()}</span>;
            },
            header: key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1),
            meta: { width: 'w-[50px]' }
        })
    )

    const handleCellClick = (cell) => {
        const value = cell.getValue();
        let content;
        if (cell.column.columnDef.header === 'Paciente') {
            content = getPatientNameById(value)
        }
        else if (Array.isArray(value)) {
            content = value.map(item => item[Object.keys(item)[0]]).join(', ');
        }
        else {
            content = value;
        }
        Swal.fire({
            title: 'Detalle',
            html: `<p>${cell.column.columnDef.header}: ${content}</p>`,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Detalle',
            cancelButtonText: 'Cerrar',

        });
    };

    const handleInputChange = (e, key) => {
        setFormData({
            ...formData,
            [key]: e.target.value
        });
        handleInputUpdate(key, e.target.value)
    }

    const table = useReactTable({
        data: recipes || [],
        columns,
        state: {
            globalFilter: itemsToSearch,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        table.setPageSize(15)
    }, []);



    if (!recipes || recipes.length === 0) {
        return <div>
            cargue informacion para empezar
        </div>
    }

    return (
        <div className=' flex flex-col items-end w-full pr-[2%]'>
            <table className=' w-[91%]'>
                <thead className=' bg-teal-900 text-slate-100 border'>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className=' text-left font-medium max-xl:font-normal max-lg:text-xs font-sans' >
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className='pl-1 first:rounded-tl-2xl'>
                                        {flexRender(header.column.columnDef.header,
                                            header.getContext())}
                                    </th>
                                ))}
                                <th className=' bg-teal-900'></th>
                                <th className=' bg-teal-900 rounded-tr-2xl'></th>
                            </tr>
                        ))
                    }
                </thead>
                <tbody className=''>
                    {table.getRowModel().rows.length
                        ? table.getRowModel().rows.map((row, i) => (
                            <tr key={row.id} className={` bg-teal-600 hover:bg-teal-500 `}>
                                {row.getVisibleCells().map((cell) => (
                                    <td className={` ${cell.column.id.includes('firma') || cell.column.id.includes('fecha') ? ' w-[11%]' : ''} 
                                         ${row.index === table.getRowModel().rows.length - 1 ? 'first:rounded-bl-2xl' : ''}
                                        border-b-2 max-w-1 whitespace-nowrap overflow-hidden px-1 pr-2 text-slate-100 text-left`}
                                        key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                                <td className=' border-b-2 w-4 text-slate-100 size-7'><FiEdit /></td>
                                <td className=' border-b-2 w-4 text-slate-100 size-7'><MdOutlineDeleteForever /></td>
                            </tr>
                        ))
                        : (
                            <tr>
                                <td colSpan={12} className=' text-slate-100 bg-teal-600'>No hay resultados que coincidan</td>
                            </tr>
                        )
                    }
                </tbody>

            </table>
            <div className=' flex flex-row justify-between w-[91%]'>
                <div className=" flex flex-row">
                    <button
                        onClick={() => {
                            table.previousPage();
                        }}
                        hidden={!table.getCanPreviousPage()}
                        className="max-sm:text-xs p-1 border border-gray-300 px-2 disabled:opacity-30"
                    >
                        {"<"}
                    </button>
                    <button
                        onClick={() => {
                            table.nextPage();
                        }}
                        hidden={!table.getCanNextPage()}
                        className="max-sm:text-xs p-1 border border-gray-300 px-2 disabled:opacity-30"
                    >
                        {">"}
                    </button>
                    <span className="flex max-sm:text-xs items-center gap-1">
                        <div>Pagina</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </strong>
                    </span>
                    <span className="flex max-sm:text-xs items-center gap-1">
                        | Ir a pagina:
                        <input
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                table.setPageIndex(page);
                            }}
                            className=" border p-1 rounded w-16 bg-transparent"
                        />
                    </span>
                </div>
                <button className=' flex flex-col items-end '>
                    <AddRecipe />
                </button>
            </div>
        </div>
    )
}

export default TableRecipes