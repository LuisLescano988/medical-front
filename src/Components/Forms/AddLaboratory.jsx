/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { addRecipe, getRecipes } from '../../Middleware/Actions';

const AddLaboratoryComponent = ({ isOpen, onClose, patientsList }) => {
  const userId = Cookies.get("user_id");
  const dispatch = useDispatch()
  const [addRecipeForm, setAddRecipeForm] = useState({
    paciente: "",
    user: userId,
    medicacion: [{
      droga: "",
      dosis: "",
      presentacion: "",
      marca_recomendada: "",
      cantidad_unidades: ""
    }],
    firma_medica: "",
    fecha_ultimo_laboratorio: "",
    proxima_fecha_empadronamiento: "",
    observaciones: "",
  });

  const handleChange = (e, key, index) => {
    const { name, value } = e.target;

    if (key.startsWith('medicacion')) {
      const medicacionCopy = [...addRecipeForm.medicacion];
      medicacionCopy[index][name] = value;
      setAddRecipeForm({ ...addRecipeForm, medicacion: medicacionCopy });
    } else {
      setAddRecipeForm({ ...addRecipeForm, [key]: value });
    }
  };

  const handleAddMedication = () => {
    setAddRecipeForm({
      ...addRecipeForm,
      medicacion: [...addRecipeForm.medicacion, {
        droga: "",
        dosis: "",
        presentacion: "",
        marca_recomendada: "",
        cantidad_unidades: ""
      }]
    });
  };

  const handleRemoveLastMedication = () => {
    setAddRecipeForm(prevState => ({
      ...prevState,
      medicacion: prevState.medicacion.slice(0, -1)
    }));
  };

  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: 'Receta agregada correctamente',
      icon: 'success',
      confirmButtonText: 'Ok',
      customClass: {
        title: 'text-lg',
      },
    });
    if (result.isConfirmed) {
      await dispatch(addRecipe(addRecipeForm));
      await dispatch(getRecipes());
      setAddRecipeForm({
        paciente: "",
        user: userId,
        medicacion: [{
          droga: "",
          dosis: "",
          presentacion: "",
          marca_recomendada: "",
          cantidad_unidades: ""
        }],
        firma_medica: "",
        fecha_ultimo_laboratorio: "",
        proxima_fecha_empadronamiento: "",
        observaciones: "",
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-xl ">
      <h4 className="text-xl font-semibold mb-4 text-center">Crear receta</h4>
        <form className=' flex flex-col'>
          <select name="paciente" id="paciente" defaultValue="" onChange={(e) => handleChange(e, 'paciente')}
            className="border mb-1 rounded">
            <option value="" disabled >Seleccione un paciente</option>
            <option value="/patients">Agregar paciente nuevo</option>
            {patientsList.map((patient, index) => (
              <option key={index} value={patient.id}>{patient.nombre + ' ' + patient.apellido}</option>
            ))}
          </select>
          <input type="text" name="firma_medica" placeholder="Firma médica" value={addRecipeForm.firma_medica}
            onChange={(e) => handleChange(e, 'firma_medica')}
            className="border mb-1 px-1 rounded" />
          <div className=' flex flex-col px-1 w-full'>
            <div className=' flex flex-row justify-between mb-1'>
              <label htmlFor="">Ultimo laboratorio</label>
              <input type="date" name="fecha_ultimo_laboratorio" placeholder="Fecha último laboratorio" value={addRecipeForm.fecha_ultimo_laboratorio}
                onChange={(e) => handleChange(e, 'fecha_ultimo_laboratorio')}
                className="border rounded" />
            </div>
            <div className=' flex flex-row justify-between mb-1'>
              <label htmlFor="">Proximo empadronamiento</label>
              <input type="date" name="proxima_fecha_empadronamiento" placeholder="Próxima fecha empadronamiento" value={addRecipeForm.proxima_fecha_empadronamiento}
                onChange={(e) => handleChange(e, 'proxima_fecha_empadronamiento')}
                className="border rounded" />
            </div>
          </div>
          <textarea name="observaciones" placeholder="Observaciones" value={addRecipeForm.observaciones}
            onChange={(e) => handleChange(e, 'observaciones')}
            className="border mb-1 px-1 rounded" />
          {addRecipeForm.medicacion.map((med, index) => (
            <div key={index} className="space-y-1">
              <input type="text" name="droga" placeholder="Droga" value={med.droga}
                onChange={(e) => handleChange(e, `medicacion-${index}`, index)}
                className="border pb-1 px-1 rounded" />
              <input type="text" name="presentacion" placeholder="Presentación" value={med.presentacion}
                onChange={(e) => handleChange(e, `medicacion-${index}`, index)}
                className="border pb-1 px-1 rounded" />
              <input type="text" name="dosis" placeholder="Dosis" value={med.dosis}
                onChange={(e) => handleChange(e, `medicacion-${index}`, index)}
                className="border pb-1 px-1 rounded" />
              <input type="text" name="marca_recomendada" placeholder="Marca recomendada" value={med.marca_recomendada}
                onChange={(e) => handleChange(e, `medicacion-${index}`, index)}
                className="border pb-1 px-1 rounded" />
              <input type="number" name="cantidad_unidades" placeholder="Cantidad unidades" value={med.cantidad_unidades}
                onChange={(e) => handleChange(e, `medicacion-${index}`, index)}
                className="border pb-1 px-1 rounded" />
            </div>
          ))}
          <span onClick={handleAddMedication} className="bg-blue-500 text-white py-1 my-2 px-4 rounded">
            Añadir Medicación
          </span>
          <span onClick={handleRemoveLastMedication} disabled={addRecipeForm.medicacion.length === 1} className="bg-red-500 text-white py-1 mb-2 px-4 rounded">
            Quitar Última
          </span>
          <div className="flex justify-around">
            <span onClick={handleSubmit} className="bg-teal-500 text-white py-1 my-1 px-4 rounded">
              Agregar
            </span>
            <button onClick={onClose} className="bg-red-500 text-white py-1 my-1 px-4 rounded">
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLaboratoryComponent