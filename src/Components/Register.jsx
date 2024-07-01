import React from 'react'

const Register = () => {
    return (
        <div className='flex flex-col '>
            <div className=' text-left mt-[3%] mb-[3%]'>
                <div className=' font-bold text-2xl'>
                    MEDIRAMY
                </div>
                <div>
                    Registrarse para comenzas
                </div>
            </div>
            <div>
                <form action="">
                    <div className=' flex flex-row justify-around'>
                        <input className=' w-11/12' type="text" placeholder='Nombre' />
                        <input className=' w-11/12' type="text" placeholder='Apellido' />
                    </div>
                    <div>
                        <select name="usuario" id="">
                            <option value=""></option>
                            <option value="true">Medico</option>
                            <option value="false">Asistente</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" placeholder='Email' />
                    </div>
                    <div>
                        <input type="text" placeholder='Contraseña' />
                    </div>
                    <div className='flex flex-row'>
                        <div className=' flex flex-col'>
                            <div>Mas de 8 caracteres</div>
                            <div>Un caracter especial</div>
                        </div>
                        <div className=' flex flex-col'>
                            <div>Una mayuscula</div>
                            <div>Al menos un numero</div>
                        </div>
                    </div>
                    <div>
                        Registrarme
                    </div>
                    <div>
                        Ya tiene cuenta? <span className=' underline'>Ingrese aqui</span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register