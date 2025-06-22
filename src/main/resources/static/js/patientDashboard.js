// patientDashboard.js
import { createDoctorCard } from "./components/doctorCard.js";
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import { patientLogin, patientSignup } from "./services/patientServices.js";

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
            contentDiv.innerHTML = "<p>No doctors found with the given filters.</p>";
            return;
        }
        doctors.forEach((doctor) => {
            const card = createDoctorCard(doctor);
            contentDiv.appendChild(card);
        });
    });
}

window.signupPatient = async function () {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const phone = document.getElementById("signupPhone").value;
    const address = document.getElementById("signupAddress").value;

    const result = await patientSignup({ name, email, password, phone, address });

    if (result.success) {
        alert("Signup successful!");
        openModal(null);
        location.reload();
    } else {
        alert("Signup failed: " + result.message);
    }
};

window.loginPatient = async function () {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await patientLogin({ email, password });
        if (!response.ok) {
            alert("Invalid credentials");
            return;
        }
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "loggedPatient");
        window.location.href = "/loggedPatientDashboard.html";
    } catch (error) {
        alert("Login failed: " + error.message);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    loadDoctorCards();

    const signupBtn = document.getElementById("patientSignup");
    if (signupBtn) signupBtn.addEventListener("click", () => openModal("patientSignup"));

    const loginBtn = document.getElementById("patientLogin");
    if (loginBtn) loginBtn.addEventListener("click", () => openModal("patientLogin"));

    document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
    document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
    document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);
});
