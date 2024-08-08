import React from 'react'

const AddMedication = ({ formData, handleInputChange }) => {
    return (
        <form>
            <div>
                <label htmlFor="droga">Droga:</label>
                <input
                    type="text"
                    id="droga"
                    name="droga"
                    value={formData.droga || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="dosis">Dosis:</label>
                <input
                    type="text"
                    id="dosis"
                    name="dosis"
                    value={formData.dosis || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="presentacion">Presentación:</label>
                <input
                    type="text"
                    id="presentacion"
                    name="presentacion"
                    value={formData.presentacion || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="marca_recomendada">Marca Recomendada:</label>
                <input
                    type="text"
                    id="marca_recomendada"
                    name="marca_recomendada"
                    value={formData.marca_recomendada || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="cantidad_unidades">Cantidad Unidades:</label>
                <input
                    type="text"
                    id="cantidad_unidades"
                    name="cantidad_unidades"
                    value={formData.cantidad_unidades || ''}
                    onChange={handleInputChange}
                />
            </div>
        </form>
    );
};

export default AddMedication