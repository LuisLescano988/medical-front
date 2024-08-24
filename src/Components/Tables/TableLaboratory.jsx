/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useSelector } from 'react-redux'
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Swal from 'sweetalert2';
import { RiStickyNoteAddLine } from 'react-icons/ri';
import LaboratoryAlertDetails from '../Alerts/LaboratoryAlertDetails';
import AddLaboratoryComponent from '../Forms/AddLaboratory';

const TableLaboratory = ({ itemsToSearch }) => {
    const laboratories = useSelector(state => state.laboratories);
    const patients = useSelector(state => state.patients);
    const columnHelper = createColumnHelper();
    // eslint-disable-next-line no-unused-vars
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    
    
    const getPatientNameById = (id) => {
        const patient = patients.find(patient => patient.id === id);
        return patient ? `${patient.nombre} ${patient.apellido}` : id;
    };
    const keys = laboratories && laboratories.length > 0 ? Object.keys(laboratories[0]).filter(key => key !== 'id' && key !== 'user') : [];
    
    const columns = keys.map(key =>
        columnHelper.accessor(key, {
            cell: (info) => {
                if (key === 'paciente') {
                    return <span onClick={() => handleCellClick(info)}>{getPatientNameById(info.getValue())}</span>;
                }
                return <span onClick={() => handleCellClick(info)}>{info.getValue()}</span>;
            },
            header: key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1),
            meta: { width: 'w-[50px]' },
        })
    )

    const handleCellClick = async (cell) => {
        const row = cell.row.original;
        setSelectedRow(row);

        const value = cell.getValue();
        let content;
        if (cell.column.columnDef.header === 'Paciente') {
            content = getPatientNameById(value)
        }
        else {
            content = value;
        }
        const result = await Swal.fire({
            title: 'Detalle',
            html: `<p>${cell.column.columnDef.header}: ${content}</p>`,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Detalle',
            cancelButtonText: 'Cerrar',
        });


        if (result.isConfirmed && row) {
            await LaboratoryAlertDetails({ row, getPatientNameById });
        }
    };

    const table = useReactTable({
        data: laboratories || [],
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



    if (!laboratories || laboratories.length === 0) {
        return <div>
            cargue informacion
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
                                    <th
                                        key={header.id}
                                        className='pl-1 first:rounded-tl-2xl' onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
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
                        ? table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className={` bg-teal-600 hover:bg-teal-500 `}>
                                {row.getVisibleCells().map((cell) => (
                                    <td className={` ${cell.column.id.includes('firma') || cell.column.id.includes('paciente') || cell.column.id.includes('fecha') || cell.column.id.includes('codigo') ? ' w-[11%]' : ''} 
                                        border-b-2 max-w-1 transition-colors duration-500 hover:text-slate-700 whitespace-nowrap overflow-hidden px-1 pr-2 text-slate-100 text-left`}
                                        key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                                <td className=' border-b-2 w-4 text-slate-100 transition-colors duration-300 hover:text-slate-600 size-7'><FiEdit /></td>
                                <td className=' border-b-2 w-4 text-slate-100 transition-colors duration-300 hover:text-slate-600 size-7'><MdOutlineDeleteForever /></td>
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
                <div className=' flex flex-col items-end '
                    onClick={handleOpenModal}>
                    <div className=' flex flex-row rounded-b-lg pl-2 items-start justify-between transition-all duration-300 border-black bg-teal-200 hover:bg-teal-300 pt-[2%] '>
                        <h5>Agregar</h5>
                        <RiStickyNoteAddLine className=' w-12 h-6' />
                    </div>
                    <AddLaboratoryComponent isOpen={isModalOpen} onClose={handleCloseModal} patientsList={patients} />
                </div>
            </div>
        </div>
    )
}

export default TableLaboratory