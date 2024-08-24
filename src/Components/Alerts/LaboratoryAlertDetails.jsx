import Swal from "sweetalert2";

const LaboratoryAlertDetails = async ({ row, getPatientNameById }) => {
    const {
        paciente,pedido,fecha,firma_medica,codigo_identificacion
    } = row;
    
    await Swal.fire({
        title: 'Detalle',
        html: `<div style="text-align: left;">
            <p><strong>Paciente:</strong> ${getPatientNameById(paciente)}</p>
            <p><strong>Pedido:</strong>${pedido}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>N° de pedido:</strong> ${codigo_identificacion}</p>            
            <p><strong>Firma:</strong> ${firma_medica}</p>
            `,
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Imprimir'
    });

};

export default LaboratoryAlertDetails