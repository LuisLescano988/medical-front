/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
// eslint-disable-next-line no-unused-vars
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegAddressBook } from "react-icons/fa";
import { PiTestTubeFill } from "react-icons/pi";
import { FaChartBar } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { logoutUser } from '../Middleware/Actions';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie'


const NavBar = ({ opened, setOpened }) => {
  const dispatch = useDispatch()
  const first = Cookies.get('first_name')
  const firstName = first.charAt(0).toUpperCase() + first.slice(1);
  const last = Cookies.get('last_name')
  const lastName = last.charAt(0).toUpperCase() + last.slice(1);

  const handleLogOut = () => {
    dispatch(logoutUser())
  }

  return (
    <div className={` flex flex-row  ${opened ? ' w-72 pr-2' : 'w-16'} h-screen bg-slate-300 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-600 shadow-cyan-300`}
      onClick={() => setOpened(!opened)}
    onMouseLeave={()=>setOpened(false)}
    >
      <div className='flex flex-col h-screen w-full justify-between py-4 '>
        <div className=' flex flex-col justify-center items-start pl-2 gap-y-3'>
          <Link to='/' className=' flex flex-row items-center cursor-default w-full rounded-l-lg hover:bg-slate-400 transition-colors duration-200'>
            <GoHome className=' min-h-9 min-w-8' />
            <div className=''>
              <div className={` text-sm text-left ${opened ? 'opacity-100 hover:font-semibold' : 'opacity-0 -translate-x-60 '} transition-transform duration-300`}>Inicio</div>
            </div>
          </Link>
          <Link to='/profile' className=' flex flex-row h-9 items-center cursor-default w-full rounded-l-lg hover:bg-slate-400 transition-colors duration-200'>
            <IoPersonCircleOutline className=' min-h-8 min-w-8' />
            <div className=''>
              <div className={` text-sm text-left ${opened ? 'opacity-100 hover:font-semibold' : 'opacity-0 -translate-x-60 '} transition-transform duration-300`}>{firstName + ' ' + lastName}</div>
            </div>
          </Link>
          <Link to='/patients' className=' flex flex-row items-center cursor-default w-full rounded-l-lg hover:bg-slate-400 transition-colors duration-200'>
            <FaRegAddressBook className=' pl-1 mr-1 min-h-9 min-w-7' />
            <div className=''>
              <div className={` text-sm text-left ${opened ? 'opacity-100 hover:font-semibold' : 'opacity-0 -translate-x-60 '} transition-transform duration-300`}>Pacientes</div>
            </div>
          </Link>
          <Link to='/recipes' className=' flex flex-row items-center cursor-default w-full rounded-l-lg hover:bg-slate-400 transition-colors duration-200'>
            <CgFileDocument className=' pr-1 -mr-[1.2%] min-h-9 min-w-9' />
            <div className=''>
              <div className={` text-sm text-left ${opened ? 'opacity-100 hover:font-semibold' : 'opacity-0 -translate-x-60 '} transition-transform duration-300`}>Recetas</div>
            </div>
          </Link>
          <Link to='/laboratory' className=' flex h-9 flex-row items-center cursor-default w-full rounded-l-lg hover:bg-slate-400 transition-colors duration-200'>
            <PiTestTubeFill className='pl-1 min-h-9 min-w-8' />
            <div className=''>
              <div className={` text-sm text-left ${opened ? 'opacity-100 hover:font-semibold' : 'opacity-0 -translate-x-60 '} transition-transform duration-300`}>Pedidos de laboratorio</div>
            </div>
          </Link>
          <Link to='/statistics' className=' flex flex-row items-center cursor-default w-full rounded-l-lg hover:bg-slate-400 transition-colors duration-200'>
            <FaChartBar className=' text-slate-950 text-opacity-80 pl-1 min-h-9 min-w-8' />
            <div className=''>
              <div className={` text-sm text-left ${opened ? 'opacity-100 hover:font-semibold' : 'opacity-0 -translate-x-60 '} transition-transform duration-300`}>Estadisticas</div>
            </div>
          </Link>
        </div>
        <div className='flex flex-col justify-center items-start pl-2 gap-y-4 '>
          <div className=' w-full rounded-l-lg transition-all duration-300 hover:bg-slate-400 flex relative flex-row items-center'>
            <ImExit className=' min-h-10 min-w-10 pl-2 ' />
            <div className='relative flex items-center'>
              <div className={` text-sm text-left ${opened ? 'opacity-100 hover:font-semibold' : 'opacity-0 -translate-x-60 '} transition-transform duration-300`}
                onClick={handleLogOut}>Cerrar sesión</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar