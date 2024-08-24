import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

const RecipeAlertDetails = async ({ row, getPatientNameById }) => {
    const { paciente, receta_medicaciones, firma_medica, fecha_ultimo_laboratorio, proxima_fecha_empadronamiento, observaciones } = row;
    const medicationDetails = receta_medicaciones.map(med => `
        <p><strong>Droga:</strong> ${med.droga}</p>
        <p><strong>Dosis:</strong> ${med.dosis}</p>
        <p><strong>Presentación:</strong> ${med.presentacion}</p>
        <p><strong>Marca recomendada:</strong> ${med.marca_recomendada}</p>
        <p><strong>Cantidad unidades:</strong> ${med.cantidad_unidades}</p>
        <br>
        `).join('');

    const result = await Swal.fire({
        title: 'Detalle',
        html: `<div style="text-align: left;">
            <p><strong>Paciente:</strong> ${getPatientNameById(paciente)}</p>
            <p><strong>Firma Médica:</strong> ${firma_medica}</p>
            <p><strong>Fecha Último Laboratorio:</strong> ${fecha_ultimo_laboratorio}</p>
            <p><strong>Próxima Fecha Empadronamiento:</strong> ${proxima_fecha_empadronamiento}</p>
            <p><strong>Observaciones:</strong> ${observaciones}</p>
            <hr>
            <h3><strong>Medicación:</strong></h3>
            ${medicationDetails}
            </div>
            `,
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Imprimir'
    });

    if (result.isConfirmed) {
        const doc = new jsPDF();
        const itemsPerPage = 2;

        const addPatientInfo = (doc, offsetY = 10) => {
            doc.text('Detalle', 10, offsetY);
            doc.text(`Paciente: ${getPatientNameById(paciente)}`, 10, offsetY + 7);
            doc.text(`Firma Médica: ${firma_medica}`, 10, offsetY + 14);
            doc.text(`Fecha Último Laboratorio: ${fecha_ultimo_laboratorio}`, 10, offsetY + 21);
            doc.text(`Próxima Fecha Empadronamiento: ${proxima_fecha_empadronamiento}`, 10, offsetY + 28);
            doc.text(`Observaciones: ${observaciones}`, 10, offsetY + 35);
            doc.text('Medicación:', 10, offsetY + 49);
        };

        for (let i = 0; i < receta_medicaciones.length; i += itemsPerPage) {
            if (i !== 0) {
                doc.addPage();
            }
            addPatientInfo(doc);
            const medicationSubset = receta_medicaciones.slice(i, i + itemsPerPage);
            medicationSubset.forEach((med, index) => {
                const yPosition = 66 + (index * 42);
                doc.text(`Droga: ${med.droga}`, 15, yPosition);
                doc.text(`Dosis: ${med.dosis}`, 15, yPosition + 7);
                doc.text(`Presentación: ${med.presentacion}`, 15, yPosition + 14);
                doc.text(`Marca recomendada: ${med.marca_recomendada}`, 15, yPosition + 21);
                doc.text(`Cantidad unidades: ${med.cantidad_unidades}`, 15, yPosition + 28);
            });
        }

        const pdfBlobUrl = doc.output('bloburl');
        window.open(pdfBlobUrl, '_blank');
    }
};

export default RecipeAlertDetails;