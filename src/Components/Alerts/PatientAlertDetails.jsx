import Swal from 'sweetalert2';

const PatientAlertDetails = async ({ row }) => {
    const {
        nombre, apellido, sexo, fecha_nacimiento, obra_social, numero_afiliado, dni, provincia, ciudad, edad
    } = row;
    
    await Swal.fire({
        title: 'Detalle',
        html: `<div style="text-align: left;">
            <p><strong>Paciente:</strong> ${nombre} ${apellido}</p>
            <p><strong>Fecha de nacimiento:</strong>${edad} ${fecha_nacimiento} <strong>Sexo:</strong> ${sexo}</p>
            <p><strong>Obra social:</strong> ${obra_social} <strong>Afiliado n°:</strong>${numero_afiliado}</p>
            <p><strong>Dni:</strong> ${dni}</p>
            <p><strong>Ciudad-Provincia:</strong> ${ciudad}, ${provincia}</p>
            
            `,
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Imprimir'
    });

};

export default PatientAlertDetails;