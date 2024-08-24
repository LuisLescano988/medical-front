// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import store from './Middleware/Store';
import './App.css';
import Home from './Views/Home';
import Patients from './Views/Patients';
import Recipes from './Views/Recipes';
import Statistics from './Views/Statistics';
import NavBar from './Components/NavBar';
import Laboratory from './Views/Laboratory';
import LoginView from './Views/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import { IoMdArrowRoundBack } from "react-icons/io";
import Profile from './Views/Profile';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const isAuthenticated = useSelector(state => state.isAuthenticated);


  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <AnimatePresence mode='wait'>
          <div className='flex flex-row bg-slate-200'>
              {isAuthenticated && (
                <div className='fixed'>
                  <NavBar opened={opened} setOpened={setOpened} />
                  <div onClick={() => navigate(-1)} className={`z-0 ${opened ? ' -translate-y-20 opacity-50' : ''} transition-all duration-500 absolute left-[115%] top-[3.7%]`}>
                    <IoMdArrowRoundBack className='max-sm:size-7 size-8 border-4 border-teal-100 hover:border-teal-600 rounded-full' />
                  </div>
                </div>
              )}
            <div className=''>
              <Routes location={location} key={location.pathname}>
                <Route
                  path='/login'
                  element={!isAuthenticated ? <PageWrapper><LoginView /></PageWrapper> : <Navigate to="/" replace />}
                />
                <Route
                  path="/"
                  element={<ProtectedRoute><PageWrapper><Home /></PageWrapper></ProtectedRoute>}
                />
                <Route
                  path="/profile"
                  element={<ProtectedRoute><PageWrapper><Profile /></PageWrapper></ProtectedRoute>}
                />
                <Route
                  path="/patients"
                  element={<ProtectedRoute><PageWrapper><Patients /></PageWrapper></ProtectedRoute>}
                />
                <Route
                  path="/recipes"
                  element={<ProtectedRoute><PageWrapper><Recipes /></PageWrapper></ProtectedRoute>}
                />
                <Route
                  path="/statistics"
                  element={<ProtectedRoute><PageWrapper><Statistics /></PageWrapper></ProtectedRoute>}
                />
                <Route
                  path="/laboratory"
                  element={<ProtectedRoute><PageWrapper><Laboratory /></PageWrapper></ProtectedRoute>}
                />
              </Routes>
            </div>
          </div>
        </AnimatePresence>
      </Suspense>
    </Provider>
  );
};

// eslint-disable-next-line react/prop-types
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0.1 }}
    transition={{ duration: 0.5 }}
    className="w-screen bg-slate-200 h-screen"
  >
    {children}
  </motion.div>
);

export default App;