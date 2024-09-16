import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../Components/SearchBar';
import { addPatient, getPatients } from '../Middleware/Actions';
import Cookies from 'js-cookie';
import TablePatient from '../Components/Tables/TablePatient';
import Swal from 'sweetalert2';

const Patients = () => {
    const elements = useSelector(state => state.patients);
    const userId = Cookies.get('user_id');
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [addPatientForm, setAddPatientForm] = useState({
        nombre: "",
        apellido: "",
        sexo: "",
        fecha_nacimiento: "",
        edad: "",
        obra_social: "",
        numero_afiliado: "",
        dni: "",
        provincia: "",
        ciudad: "",
        medicacion: "",
        user_id: userId
    });


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

    const handleInputChange = (e, key) => {
        const value = e.target.value;
        setAddPatientForm({
            ...addPatientForm,
            [key]: value
        });
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

    const handleSubmit = () => {
        dispatch(addPatient(addPatientForm))
            .then(() => {
                setAddPatientForm({
                    nombre: "",
                    apellido: "",
                    sexo: "",
                    fecha_nacimiento: "",
                    edad: "",
                    obra_social: "",
                    numero_afiliado: "",
                    dni: "",
                    provincia: "",
                    ciudad: "",
                    medicacion: "",
                    user_id: userId
                });
                Swal.fire('Se agregó correctamente');
            })
            .then(() => {
                location.reload();
            })
            .catch(error => {
                console.error('Error al agregar paciente:', error);
                Swal.fire('Error al agregar paciente');
            });
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    useEffect(() => {
        dispatch(getPatients(userId));
    }, [dispatch, userId]);

    if (elements.length < 1) {
        return (
            <div id='pacientes' className='flex flex-col items-end w-full'>
                <div className='flex flex-col justify-end w-11/12'>
                    <div>
                        <SearchBar onSearchChange={handleSearchChange} searchElement='pacientes' />
                    </div>
                    <div className='mt-[2%]'>
                        {Object.keys(addPatientForm).map((key, index) => (
                            <input
                                className={`w-[8%] pr-2 ${key === 'user_id' ? 'hidden' : ''}`}
                                key={index}
                                type={key === "fecha_nacimiento" ? "date" : "text"}
                                placeholder={key.replace(/_/g, '')}
                                value={addPatientForm[key]}
                                onChange={(e) => handleInputChange(e, key)}
                                onBlur={key === "fecha_nacimiento" ? handleFechaNacimientoBlur : null}
                                readOnly={key === 'edad'}
                            />
                        ))}
                    </div>
                    <div className='text-end mr-20'>
                        <button className='w-40 rounded-b-lg text-sm h-7 bg-teal-200'
                            onClick={handleSubmit}>
                            Agregar paciente
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id='pacientes' className='flex flex-col items-center w-screen'>
            <div className='flex flex-col w-full'>
                <div className='flex justify-around'>
                    <SearchBar onSearchChange={handleSearchChange} searchElement='pacientes' />
                </div>
                <div className='flex flex-col items-center'>
                    <TablePatient itemsToSearch={searchValue} />
                </div>
            </div>
        </div>
    );
};

export default Patients;