/* eslint-disable no-unused-vars */
import React from 'react'
import Cookies from 'js-cookie'

const Profile = () => {
  const first = Cookies.get('first_name')
  const firstName = first.charAt(0).toUpperCase() + first.slice(1);
  const last = Cookies.get('last_name')
  const lastName = last.charAt(0).toUpperCase() + last.slice(1);
  const userEmail = Cookies.get('email')

  return (
    <div className='py-4 w-full h-full text-lg flex flex-col'>
      <div className='flex flex-row h-12 lg:h-12 lg:mt-[0%] w-[91.2%] ml-auto pr-[2%] max-sm:mt-1 justify-between items-center '>
        <h1 className=' font-semibold text-xl'>Perfil</h1>
      </div>
      <div className=' flex flex-row h-full w-11/12 ml-auto '>
        <div className=' w-4/12 bg-pink-50 h-full ml-3 space-y-2'>
          <div className=' bg-yellow-50 px-2 w-full font-medium space-y-1 text-left'>
            <div className=''>Nombre</div>
            <span className=' font-normal'>
              {firstName + ' ' + lastName}
            </span>
            <div>Email</div>
            <span className=' font-normal'>
              {userEmail}
            </span>
            <div className=' flex flex-row justify-between pr-2'>
              <div >Contraseña</div>
              <div className=' space-x-1'>
                <button className=' border-2 rounded-md px-2 text-sm border-green-800'>Cambiar</button>
              </div>
            </div>
            <div>Eliminar cuenta y suscripcion</div>
          </div>
        </div>
        <div className=' w-8/12 bg-blue-50 mr-4 pl-8 text-left'>Tabla para administrar asistentes</div>
      </div>
    </div >
  )
}

export default Profile