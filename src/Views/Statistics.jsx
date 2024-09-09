

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line } from 'recharts';

const StatisticsComponent = () => {
  const patients = useSelector(state => state.patients);
  const recipes = useSelector(state => state.recipes);
  const laboratories = useSelector(state => state.laboratories);
  const [tabSelected, setTabSelected] = useState('1')
  const [graphicVariables, setGraphicVariables] = useState([]);

  // const handleSetVariables = (data) => {
  //   setGraphicVariables(data);
  // };

  const handleTab = (tab) => {
    setTabSelected(tab)
  }

  const renderProperties = (obj) => {
    return Object.entries(obj).map(([key, value], index) => {
      if (Array.isArray(value)) {
        return (
          <li key={index}>
            {key}:
            <ul className="">
              {value.map((item, i) => (
                <li key={i}>
                  {renderProperties(item)}
                </li>
              ))}
            </ul>
          </li>
        );
      } else if (typeof value === 'object' && value !== null) {
        return (
          <li key={index}>
            {key}:
            <ul className="">
              {renderProperties(value)}
            </ul>
          </li>
        );
      } else {
        return (
          <li key={index}>
            {key}: {value}
          </li>
        );
      }
    });
  };

  return (
    <div className=' h-full flex flex-col items-center justify-top ml-auto pt-16 w-11/12'>
      <div className=' flex flex-row place-items-center justify-center w-full '>
        <button onClick={() => handleTab('1')}
          className={`${tabSelected !== '1' ? ' hover:bg-green-100 mt-8 ' : 'mt-9'} flex justify-center bg-green-50 group text-slate-600 font-medium w-2/12 p-1 mx-2 rounded-t cursor-default transition-all duration-500`}>
          <div className=' w-fit'>
            Barras
            <span className='block -mt-1 max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-slate-600'></span>
          </div>
        </button>
        <button onClick={() => handleTab('2')}
          className={`${tabSelected !== '2' ? ' hover:bg-yellow-100 mt-8 ' : 'mt-9'} flex justify-center bg-yellow-50 group text-slate-600 font-medium w-2/12 p-1 mx-2 rounded-t cursor-default transition-all duration-500`}>
          <div className=' w-fit'>
            Lineas
            <span className='block -mt-1 max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-slate-600'></span>
          </div>
        </button>
        <button onClick={() => handleTab('3')}
          className={`${tabSelected !== '3' ? ' hover:bg-violet-100 mt-8 ' : 'mt-9'} flex justify-center bg-violet-50 group text-slate-600 font-medium w-2/12 p-1 mx-2 rounded-t cursor-default transition-all duration-500`}>
          <div className=' w-fit'>
            Torta
            <span className='block -mt-1 max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-slate-600'></span>
          </div>
        </button>
        <button onClick={() => handleTab('4')}
          className={`${tabSelected !== '4' ? ' hover:bg-cyan-100 mt-8 ' : ' mt-9 '} flex justify-center bg-cyan-50 group text-slate-600 font-medium w-2/12 p-1 mx-2 mt-8 rounded-t cursor-default transition-colors duration-500 `}>
          <div className=' w-fit'>
            Barras agrupadas
            <span className='block -mt-1 max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-slate-600'></span>
          </div>
        </button>
      </div>
      <div className={`
      ${tabSelected == '1' ? 'bg-green-50' :
          tabSelected == '2' ? 'bg-yellow-50' :
            tabSelected == '3' ? 'bg-violet-50' :
              ' bg-cyan-50'} transition-colors duration-500 flex flex-col mr-10 mb-5 rounded-xl h-full w-full`}>
        <div className=' flex flex-row justify-between w-full'>
          <div className=" h-fit w-1/2 space-y-1">
            <div className=' font-semibold text-slate-600 mt-2'>Eje X</div>
            <button className="text-slate-600 font-semibold cursor-default hover:border-slate-700 border-transparent transition-colors duration-500 border-2 px-2 m-2 rounded">
              Paciente
            </button>
            <button className="text-slate-600 font-semibold cursor-default hover:border-slate-700 border-transparent transition-colors duration-500 border-2 px-2 m-2 rounded">
              Receta
            </button>
            <button className="text-slate-600 font-semibold cursor-default hover:border-slate-700 border-transparent transition-colors duration-500 border-2 px-2 m-2 rounded">
              Laboratorio
            </button>
          </div>
          <div className=" h-fit w-1/2 space-y-1">
            <div className=' font-semibold text-slate-600 mt-2'>Eje Y</div>
            <button className="text-slate-600 font-semibold cursor-default hover:border-slate-700 border-transparent transition-colors duration-500 border-2 px-2 m-2 rounded">
              Paciente
            </button>
            <button className="text-slate-600 font-semibold cursor-default hover:border-slate-700 border-transparent transition-colors duration-500 border-2 px-2 m-2 rounded">
              Receta
            </button>
            <button className="text-slate-600 font-semibold cursor-default hover:border-slate-700 border-transparent transition-colors duration-500 border-2 px-2 m-2 rounded">
              Laboratorio
            </button>
          </div>
        </div>
        <div className=' h-full w-full place-content-center '>
          <LineChart width={600} height={300}>
            <Line type="monotone" />
          </LineChart>
        </div>
      </div>
      {/* <ul className="list-disc ml-6">
        {graphicVariables.map((item, index) => (
          <li key={index}>
          <ul className="ml-4">
          {renderProperties(item)}
          </ul>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default StatisticsComponent;
