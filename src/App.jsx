import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Home from './Views/Home';
import Patients from './Views/Patients';
import Recipes from './Views/Recipes';
import Statistics from './Views/Statistics';
import { IoPersonCircleOutline } from "react-icons/io5";
import NavBar from './Components/NavBar';
import ClinicHistory from './Views/ClinicHistory';

function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimatePresence mode='wait'>
        <div className='flex flex-row w-screen'>
          <div className='w-1/4 fixed'>
            <NavBar />
          </div>
          <div className=' w-screen'>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/patients" element={<PageWrapper><Patients /></PageWrapper>} />
              <Route path="/recipes" element={<PageWrapper><Recipes /></PageWrapper>} />
              <Route path="/statistics" element={<PageWrapper><Statistics /></PageWrapper>} />
              <Route path="/history" element={<PageWrapper><ClinicHistory/></PageWrapper>} />
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
    className=" w-full"
  >
    {children}
  </motion.div>
);

export default App;
