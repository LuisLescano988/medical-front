/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import AddPatient from '../Forms/AddPatient';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { addPatient } from '../../Middleware/Actions';
import PatientAlertDetails from '../Alerts/PatientAlertDetails';

const TablePatient = ({ itemsToSearch }) => {
    const dispatch = useDispatch()
    const patients = useSelector(state => state.patients)
    const columnHelper = createColumnHelper()
    const userId = Cookies.get("user_id")
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
        user_id:userId
    })

    

    const getPatientNameById = (id) => {
        const patient = patients.find(patient => patient.id === id);
        return patient ? `${patient.nombre} ${patient.apellido}` : id;
    };
    const keys = patients && patients.length > 0 ? Object.keys(patients[0]).filter(key => key !== 'id') : [];

    const columns = keys.map(key =>
        columnHelper.accessor(key, {
            cell: (info) => {
                // eslint-disable-next-line no-unused-vars
                const value = info.getValue();
                if (key === 'paciente') {
                    return <span onClick={() => handleCellClick(info)}>{getPatientNameById(info.getValue())}</span>;
                }
                return <span onClick={() => handleCellClick(info)}>{info.getValue()}</span>;
            },
            header: key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1),
            meta: { width: 'w-[50px]' }
        })
    )

    const handleCellClick = async(cell) => {
        const row = cell.row.original;
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
        const result = await Swal.fire({
            title: 'Info',
            html: `<p>${cell.column.columnDef.header}: ${content}</p>`,
            showConfirmButton: true,
            showCancelButton:true,
            confirmButtonText:'Detalle',
            cancelButtonText:'Cancel'            
        });
        if(result.isConfirmed && row){
            await PatientAlertDetails({row, getPatientNameById})
        }
    };

    const handleSubmit = () => {
        dispatch(addPatient(addPatientForm))
        .then(() => {
            setAddPatientForm({})
            Swal.fire(`Se agregó correctamente`);
        })
        .then(() => {
            location.reload()
        })
        .catch(error => {
            console.error('Error al agregar paciente:', error);
            Swal.fire('Error al agregar paciente')
        });
    }

    const handleInputChange = (e, key) => {
        setAddPatientForm({
            ...addPatientForm,
            [key]: e.target.value
        });
        console.log(addPatientForm)
    }

    const table = useReactTable({
        data: patients || [],
        columns,
        state: {
            globalFilter: itemsToSearch,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const calculateAge = (fechaNacimiento) => {
        const today = new Date();
        const birthDate = new Date(fechaNacimiento);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleFechaNacimientoBlur = (e) => {
        const value = e.target.value;

        const age = calculateAge(value);
        const today = new Date();
        console.log(age)
        const birthDate = new Date(value);

        if (birthDate > today) {
            Swal.fire('La fecha de nacimiento no puede ser futura.');
            return;
        }
        if (age > 125) {
            Swal.fire('La edad calculada es mayor a 125 años, ingrese una fecha válida.');
            return;
        }

        setAddPatientForm({
            ...addPatientForm,
            edad: age
        });
    };

    useEffect(() => {
        table.setPageSize(15)
    }, []);



    if (!patients || patients.length === 0) {
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
                            <tr key={headerGroup.id} className='rounded-2xl text-left font-medium max-xl:font-normal max-lg:text-xs font-sans' >
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className='pl-1 first:rounded-tl-2xl '>
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
                <tbody>
                    {table.getRowModel().rows.length
                        ? table.getRowModel().rows.map((row, i) => (
                            <tr key={row.id} className={`${i % 2 ? 'bg-teal-600 hover:bg-teal-500' : 'hover:bg-teal-500 bg-teal-600'}`}>
                                {row.getVisibleCells().map(cell => (
                                    <td className={` border-b max-w-1 whitespace-nowrap overflow-hidden px-1 pr-2 text-slate-100 text-left`}
                                        key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                                <td className=' border-b w-4 text-slate-100 size-7'><FiEdit /></td>
                                <td className=' border-b w-4 text-slate-100 size-7'><MdOutlineDeleteForever /></td>
                            </tr>
                        ))
                        : (
                            <tr>
                                <td colSpan={13} className=' text-slate-100 bg-teal-600'>No hay resultados que coincidan</td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot>
                    <tr className='hover:bg-teal-500 bg-teal-600'>
                        {keys.map((key, index) => (
                            <td key={index} className=' py-[0.18%] '>
                                <input
                                    className={` w-[90%] ${key == 'fecha_nacimiento' ? ' w-[90%]' : ''} cursor-default px-1 bg-white bg-opacity-20 rounded-md text-slate-200 mr-2 appearance-none placeholder:text-opacity-50 placeholder:text-slate-200 outline-none`}
                                    type={key.includes("fecha") ? "date" : "text"}
                                    placeholder={`${key.replace(/_/g, ' ').slice(0, 13)}`}
                                    value={addPatientForm[key] || ''}
                                    onChange={(e) => handleInputChange(e, key)}
                                    onBlur={key === 'fecha_nacimiento' ? handleFechaNacimientoBlur : null}
                                    readOnly={key === 'edad'}                                   
                                />
                            </td>
                        ))}
                        <td className=''></td>
                        <td className=''></td>
                    </tr>
                </tfoot>
            </table>
            <div className=' flex flex-row justify-between w-[91%]'>
                <div className=" flex flex-row mt-2">
                    <button
                        onClick={() => {
                            table.previousPage();
                        }}
                        hidden={!table.getCanPreviousPage()}
                        className="max-sm:text-xs p-1 rounded-lg border border-gray-300 px-2 disabled:opacity-30"
                    >
                        {"<"}
                    </button>
                    <button
                        onClick={() => {
                            table.nextPage();
                        }}
                        hidden={!table.getCanNextPage()}
                        className="max-sm:text-xs p-1 rounded-lg border border-gray-300 px-2 disabled:opacity-30"
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
                <button className=' flex flex-col items-end ' onClick={handleSubmit}>
                    <AddPatient />
                </button>
            </div>
        </div>
    )
}

export default TablePatient