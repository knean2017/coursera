// patientRows.js

export function createPatientRow(appointment) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${appointment.patientName}</td>
    <td>${appointment.date}</td>
    <td>${appointment.time}</td>
    <td>${appointment.status}</td>
    <td>${appointment.notes || "-"}</td>
  `;

    return tr;
}
