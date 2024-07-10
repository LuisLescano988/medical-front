import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from '../Middleware/Actions'
import Swal from 'sweetalert2'

const Login = () => {
    const dispatch = useDispatch()

    const [userLogin, setUserLogin] = useState({
        username: "",
        password: "",
    })

    const handleInputChange = (e, key) => {
        setUserLogin({
            ...userLogin,
            [key]: e.target.value
        })
    }

    console.log(userLogin)

    const handleLogin = () => {
        dispatch(loginUser(userLogin))
            .then(() => {
                setUserLogin({})
                Swal.fire(`Si anda`);
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
                    Ingrese usuario y contraseña
                </div>
            </div>
            <div className=' h-3/4'>
                <form className='flex flex-col relative h-full pb-[1%] justify-evenly' action="">
                    <div className=' flex flex-col h-[40%] justify-around'>
                        <div>
                            <input className=' p-1 rounded-md border border-slate-400 w-full' 
                            type="text" placeholder='Email' onChange={(e) => handleInputChange(e, 'username')}/>
                        </div>
                        <div>
                            <input className=' p-1 rounded-md border border-slate-400 w-full' 
                            type="text" placeholder='Contraseña' onChange={(e) => handleInputChange(e, 'password')}/>
                        </div>
                    </div>
                    <div className=' bg-yellow-50 rounded-md p-2'
                    onClick={handleLogin}>
                        Ingresar
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login