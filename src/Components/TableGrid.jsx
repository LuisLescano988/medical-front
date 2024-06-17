import React, { useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'

const TableGrid = ({ elements }) => {
    if (!elements || elements.length === 0) {
        return <div>No data available</div>;
    }
    const columnHelper = createColumnHelper()
    const keys = Object.keys(elements[0]).filter(key => key !== 'id')
    const columns = keys.map(key =>
        columnHelper.accessor(key, {
            cell: (info) => <span>{info.getValue()}</span>,
            header: key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)
        })
    )
    const [globalFilter, setGlobalFilter] = useState("")

    const table = useReactTable({
        data: elements,
        columns,
        state:{
            globalFilter,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    console.log(table.getRowModel().rows, "ROWS")


    return (
        <div className=' flex justify-center max-xl:ml-[5%]'>
            <table>
                <thead className=' bg-teal-200 text-slate-700 '>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className=' ' >
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className=' rounded-t-3xl text-left pr-5 max-xl:pr-1 font-medium max-xl:font-normal max-lg:text-xs font-sans'>
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
                    ?table.getRowModel().rows.map((row, i)=>(
                        <tr key={row.id} className={`${i%2?'bg-teal-100':'bg-teal-200'}`}>
                            {row.getVisibleCells().map(cell=>(
                                <td key={cell.id} className=' px-1 pr-1 text-left'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))
                    :(
                        <tr>
                            <td colSpan={12}>No se encontraron datos</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableGrid