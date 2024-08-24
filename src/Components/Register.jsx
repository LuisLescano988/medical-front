import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../Middleware/Actions'
import Swal from 'sweetalert2'

const Register = () => {
    const dispatch = useDispatch()

    const [userRegister, setUserRegister] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        username:"",
        is_medico: true,
        is_verified: false,
    })

    const handleInputChange = (e, key) => {
        if (key === 'email') {
            setUserRegister({
                ...userRegister,
                [key]: e.target.value,
                username: e.target.value // Set the value of 'username' to the 'email' input value
            })
        } else {
            setUserRegister({
                ...userRegister,
                [key]: e.target.value
            })
        }
    }

    
    const handleregister = () => {
        dispatch(addUser(userRegister))
            .then(() => {
                setUserRegister({})
                Swal.fire(`Revise su correo para confirmar la registración`);
            })
            .catch(error => {
                console.error('Error al registrar el usuario:', error);
                Swal.fire('Error al registrar el usuario')
            });
    }


    return (
        <div className='flex flex-col justify-between h-full w-full px-[4%]'>
            <div className=' text-left h-1/4 pt-[4%]'>
                <div className=' font-bold text-2xl'>
                    Mediramy
                </div>
                <div>
                    Registrarse para comenzar
                </div>
            </div>
            <div className=' h-3/4'>
                <form className='flex flex-col h-full pb-[5%] justify-between' action="">
                    <div className=' flex flex-row w-full justify-between'>
                        <input className=' p-1 rounded-md border border-slate-400 w-[48%]' 
                        type="text" placeholder='Nombre' onChange={(e) => handleInputChange(e, 'first_name')}
                        />
                        <input className=' p-1 rounded-md border border-slate-400 w-[48%]' 
                        type="text" placeholder='Apellido' onChange={(e) => handleInputChange(e, 'last_name')} />
                    </div>
                    <div>
                        <input className=' p-1 rounded-md border border-slate-400 w-full' 
                        type="text" placeholder='Email' onChange={(e) => handleInputChange(e, 'email')}/>
                    </div>
                    <div>
                        <input className=' p-1 rounded-md border border-slate-400 w-full' 
                        type="text" placeholder='Contraseña' onChange={(e) => handleInputChange(e, 'password')}/>
                    </div>
                    <div className='flex flex-row w-full justify-evenly'>
                        <div className=' flex flex-col'>
                            <div>Mas de 8 caracteres</div>
                            <div>Un caracter especial</div>
                        </div>
                        <div className=' flex flex-col'>
                            <div>Una mayuscula</div>
                            <div>Al menos un numero</div>
                        </div>
                    </div>
                    <div type='' onClick={handleregister}
                        className=' bg-yellow-50 p-2 rounded-md'>
                        Registrarme
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register