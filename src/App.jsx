import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Home from './Views/Home';
import Patients from './Views/Patients';
import Recipes from './Views/Recipes';
import Statistics from './Views/Statistics';
import NavBar from './Components/NavBar';
import ClinicHistory from './Views/ClinicHistory';
import { IoMdArrowRoundBack } from "react-icons/io";
import { getPatients, getRecipes } from './Middleware/Actions';
import { useDispatch, useSelector } from 'react-redux';


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch()
  const patients = useSelector(state => state.patients)
  const recipes = useSelector(state => state.recipes)
  // const historys = useSelector(state => state.historys)
  // const elements = [...patients, ...recipes]
  const [prevPatients, setPrevPatients] = useState(patients ? patients.length : 0)
  const [prevRecipes, setPrevRecipes] = useState(recipes ? recipes.length : 0)


  useEffect(() => {
    if (recipes.length == 0 || recipes.length !== prevRecipes) {
      dispatch(getRecipes())
      setPrevRecipes(recipes.length)
    }
    if (patients.length == 0 || patients.length !== prevPatients) {
      dispatch(getPatients())
      setPrevPatients(patients.length)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'F5') {
        // alert("No actualizar a menos que sea esctrictamente necesario")
        event.preventDefault();
      }
    };

    // const handleBeforeUnload = (event) => {
    //   event.preventDefault(alert('No reinixciar la web a menos que sea estrictamente necesario'));      
    //   event.returnValue = '';
    // };

    window.addEventListener('keydown', handleKeyDown);
    // window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [])



  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimatePresence mode='wait'>
        <div className='flex flex-row bg-slate-200'>
          <div className=' fixed'>
            <NavBar opened={opened} setOpened={setOpened} />
            <div onClick={() => navigate(-1)} className={` z-0 ${opened ? 'hidden' : 'absolute'} left-[115%] top-[3.7%] `}>
              <IoMdArrowRoundBack className=' max-sm:size-7 size-8 border-4 border-teal-100 hover:border-teal-600 transition-all duration-300 rounded-full' />
            </div>
          </div>
          <div className=''>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/patients" element={<PageWrapper><Patients /></PageWrapper>} />
              <Route path="/recipes" element={<PageWrapper><Recipes /></PageWrapper>} />
              <Route path="/statistics" element={<PageWrapper><Statistics /></PageWrapper>} />
              <Route path="/history" element={<PageWrapper><ClinicHistory /></PageWrapper>} />
            </Routes>
          </div>
        </div>
      </AnimatePresence>
    </Suspense>
  );
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0.1 }}
    transition={{ duration: 0.2 }}
    className=" w-screen bg-slate-200 h-screen"
  >
    {children}
  </motion.div>
);

export default App;
