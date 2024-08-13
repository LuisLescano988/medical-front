import React, { useEffect, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import AddMedication from '../AddMedication';

const TableGrid = ({ elements: initialElements, handleInputUpdate, itemsToSearch, hiddenColumns = [] }) => {
    const navigate = useNavigate()
    const [elements, setElements] = useState(initialElements)
    const [formData, setFormData] = useState({})
    const columnHelper = createColumnHelper()
    const patients = useSelector(state => state.patients)

    const getPatientNameById = (id) => {
        const patient = patients.find(patient => patient.id === id);
        return patient ? `${patient.nombre} ${patient.apellido}` : id;
    };

    const keys = elements && elements.length > 0 ? Object.keys(elements[0]).filter(key => key !== 'id' && !hiddenColumns.includes(key)) : [];
    const columns = keys.map(key =>
        columnHelper.accessor(key, {
            cell: (info) => {
                const value = info.getValue();
                if (key === 'paciente') {
                    return <span onClick={() => handleCellClick(info)}>{getPatientNameById(info.getValue())}</span>;
                }
                if (Array.isArray(value)) {
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
            confirmButtonText: 'Editar',
            cancelButtonText: 'Borrar',
            preConfirm: () => {
                console.log('Editar', cell);
            },
            preCancel: () => {
                console.log('Borrar', cell);
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('Confirmado editar');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                console.log('Confirmado borrar');
            }
        });
    };

    const handleAddMedication =  () => {
        Swal.fire({
            title: 'Agregar Medicación',
            html: <AddMedication formData={formData} handleInputChange={handleInputChange} />,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                // Lógica para manejar la validación y guardar los datos
                console.log('Form Data:', formData);
            }
        });
    }

    const handlePatientNavigate = (event) => {
        const selectedPath = event.target.value;
        if (selectedPath === "/patients") {
            navigate(selectedPath);
        }
    }    

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
            globalFilter: itemsToSearch,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        setElements(initialElements);
        table.setPageSize(15)
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
                            <tr key={headerGroup.id} className=' ' >
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className={` text-left pr-3 pl-1 max-xl:pr-1 font-medium max-xl:font-normal max-lg:text-xs font-sans`}>
                                        {flexRender(header.column.columnDef.header,
                                            header.getContext())}
                                    </th>
                                ))}
                                <th className=' flex flex-col justify-center items-center mt-[15%] font-medium max-xl:font-normal max-lg:text-xs font-sans'></th>
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {table.getRowModel().rows.length
                        ? table.getRowModel().rows.map((row, i) => (
                            <tr key={row.id} className={`${i % 2 ? 'bg-teal-600 hover:bg-teal-500' : 'hover:bg-teal-700 bg-teal-900'}`}>
                                {row.getVisibleCells().map(cell => (
                                    <td className={` max-w-1 whitespace-nowrap overflow-hidden px-1 pr-2 text-slate-100 text-left`}
                                    key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                                <td className=' flex flex-row text-slate-100'><FiEdit /><MdOutlineDeleteForever /></td>
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
                            <td key={index} className=' '>
                                {!key.includes("paciente") ?
                                    <input
                                        className={` w-[90%] ${key == 'fecha_nacimiento' ? ' w-[80%]' : ''} cursor-default px-1 bg-white bg-opacity-20 rounded-md text-slate-200 mr-2 appearance-none placeholder:text-opacity-50 placeholder:text-slate-200 outline-none`}
                                        type={key.includes("fecha") ? "date" : "text"}
                                        placeholder={`${key.replace(/_/g, ' ').slice(0, 13)}`}
                                        value={formData[key] || ''}
                                        onChange={(e) =>  handleInputChange(e, key)}
                                        onClick={ key=='medicacion'? handleAddMedication():null}
                                    /> :
                                    <select
                                        className=' flex items-start bg-teal-500 opacity-70 rounded-md text-white '
                                        defaultValue={"default"}
                                        onChange={handlePatientNavigate}
                                        name="" id="">
                                        <option value="default" disabled >Seleccione un paciente</option>
                                        <option value="/patients">
                                            Agregar paciente
                                        </option>
                                        {patients.map(patient => (
                                        <option key={patient.id} value={patient.id}>
                                            {patient.nombre} {patient.apellido}
                                        </option>
                                        ))}
                                    </select>
                                }
                            </td>
                        ))}
                        <td className=''></td>
                    </tr>
                </tfoot>
            </table>
            <div className=" bottom-[5%] flex items-center justify-end mt-2 gap-2">
                <button
                    onClick={() => {
                        table.previousPage();
                    }}
                    disabled={!table.getCanPreviousPage()}
                    className="max-sm:text-xs p-1 border border-gray-300 px-2 disabled:opacity-30"
                >
                    {"<"}
                </button>
                <button
                    onClick={() => {
                        table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
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
                <div className="flex max-sm:text-xs items-center gap-1">
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
                </div>
            </div>
        </div>
    )
}

export default TableGrid