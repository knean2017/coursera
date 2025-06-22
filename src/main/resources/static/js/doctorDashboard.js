// doctorDashboard.js
import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

let selectedDate = new Date().toISOString().slice(0, 10);
let token = localStorage.getItem("token");
let patientName = null;

function clearTable() {
    const tbody = document.getElementById("patientTableBody");
    tbody.innerHTML = "";
}

async function loadAppointments() {
    const tbody = document.getElementById("patientTableBody");
    tbody.innerHTML = "";

    try {
        const appointments = await getAllAppointments(selectedDate, patientName, token);

        if (!appointments || appointments.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5">No Appointments found for today</td></tr>`;
            return;
        }

        appointments.forEach((appointment) => {
            const row = createPatientRow(appointment);
            tbody.appendChild(row);
        });
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="5">Error loading appointments: ${error.message}</td></tr>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchBar").addEventListener("input", (e) => {
        patientName = e.target.value.trim() || null;
        loadAppointments();
    });

    document.getElementById("todayButton").addEventListener("click", () => {
        selectedDate = new Date().toISOString().slice(0, 10);
        document.getElementById("datePicker").value = selectedDate;
        loadAppointments();
    });

    document.getElementById("datePicker").addEventListener("change", (e) => {
        selectedDate = e.target.value;
        loadAppointments();
    });

    loadAppointments();
});
