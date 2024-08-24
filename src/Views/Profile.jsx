/* eslint-disable no-unused-vars */
import React from 'react'

const Profile = () => {
  return (
    <div className='py-5 w-full h-full flex flex-col items-center'>
      <div className=' w-9/12 bg-pink-50 h-full space-y-2'>
        <h1 className=' bg-green-50 w-full text-2xl font-sans text-left font-bold'>Configuracion de perfil</h1>
        <div className=' bg-yellow-50 w-5/12 space-y-1 text-left'>
          <div>Nombre</div>
          <div>Email</div>
          <div>Tabla para administrar asistentes</div>
          <div>Contraseña</div>
          <div>Eliminar cuenta y suscripcion</div>
        </div>
      </div>
    </div>
  )
}

export default Profile