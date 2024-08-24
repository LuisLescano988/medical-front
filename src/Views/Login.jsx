/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Register from '../Components/Register'
import Login from '../Components/Login'

const LoginView = () => {
    const [switcher, setSwitcher] = useState(true)

    return (
        <div className=' flex flex-col h-screen w-full items-center justify-center'>
            <div className=' flex justify-center items-start max-sm:w-7/12 w-4/12 h-2/3 rounded-2xl bg-teal-200'>{switcher ?
                <Login /> :
                <Register />
            }
            </div>
            <div className=' flex flex-row justify-center  w-3/12  '>
                <div className={`bg-teal-200 px-2 rounded-b-2xl transition-all ${switcher?
                    ' opacity-50 bg-teal-400':
                    ' opacity-100'}`}>
                    <button className='cursor-default'
                    disabled={switcher==false?true:false} onClick={() => setSwitcher(!switcher)}>
                        Crear cuenta
                    </button>
                </div>
                <div className={`bg-teal-200 px-2 rounded-b-2xl transition-all ${switcher?
                    ' opacity-100':
                    ' opacity-50 bg-teal-400'
                }`}>
                    <button className='cursor-default'
                    disabled={switcher==true?true:false} onClick={() => setSwitcher(!switcher)}>
                        Ingresar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginView