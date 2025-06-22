// adminDashboard.js
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

async function loadDoctorCards() {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";

    const doctors = await getDoctors();
    if (!doctors.length) {
        contentDiv.innerHTML = "<p>No doctors found.</p>";
        return;
    }

    doctors.forEach((doctor) => {
        const card = createDoctorCard(doctor);
        contentDiv.appendChild(card);
    });
}

function filterDoctorsOnChange() {
    const name = document.getElementById("searchBar").value;
    const time = document.getElementById("filterTime").value;
    const specialty = document.getElementById("filterSpecialty").value;

    filterDoctors(name, time, specialty).then((doctors) => {
        const contentDiv = document.getElementById("content");
        contentDiv.innerHTML = "";

        if (doctors.length === 0) {
            contentDiv.innerHTML = "<p>No doctors found</p>";
            return;
        }
        doctors.forEach((doctor) => {
            const card = createDoctorCard(doctor);
            contentDiv.appendChild(card);
        });
    });
}

async function adminAddDoctor(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in.");
        return;
    }

    const name = document.getElementById("doctorName").value;
    const specialty = document.getElementById("doctorSpecialty").value;
    const email = document.getElementById("doctorEmail").value;
    const password = document.getElementById("doctorPassword").value;
    const mobile = document.getElementById("doctorMobile").value;

    const availabilityCheckboxes = document.querySelectorAll("input[name='availability']:checked");
    const availability = Array.from(availabilityCheckboxes).map((checkbox) => checkbox.value);

    const doctor = { name, specialty, email, password, mobile, availability };

    const result = await saveDoctor(doctor, token);

    if (result.success) {
        alert("Doctor added successfully!");
        openModal(null); // close modal
        loadDoctorCards();
    } else {
        alert("Failed to add doctor: " + result.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addDocBtn").addEventListener("click", () => openModal("addDoctor"));
    document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
    document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
    document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);
    document.getElementById("addDoctorForm").addEventListener("submit", adminAddDoctor);

    loadDoctorCards();
});
