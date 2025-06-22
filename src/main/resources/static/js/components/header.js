function renderHeader() {
    if (window.location.pathname.endsWith("/")) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
    }

    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");
    const headerDiv = document.getElementById("header");

    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
        localStorage.removeItem("userRole");
        alert("Session expired or invalid login. Please log in again.");
        window.location.href = "/";
        return;
    }

    let headerContent = "";

    if (role === "admin") {
        headerContent += `
      <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
      <a href="#" onclick="logout()">Logout</a>`;
    } else if (role === "doctor") {
        headerContent += `
      <a href="/templates/doctor/doctorDashboard.html">Home</a>
      <a href="#" onclick="logout()">Logout</a>`;
    } else if (role === "patient") {
        headerContent += `
      <a href="/login">Login</a>
      <a href="/signup">Sign Up</a>`;
    } else if (role === "loggedPatient") {
        headerContent += `
      <a href="/static/pages/patientDashboard.html">Home</a>
      <a href="/static/pages/patientAppointments.html">Appointments</a>
      <a href="#" onclick="logoutPatient()">Logout</a>`;
    }

    headerDiv.innerHTML = headerContent;
    attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
    const logoutBtn = document.querySelector("a[onclick='logout()']");
    const logoutPatientBtn = document.querySelector("a[onclick='logoutPatient()']");
    if (logoutBtn) logoutBtn.addEventListener("click", logout);
    if (logoutPatientBtn) logoutPatientBtn.addEventListener("click", logoutPatient);
}

function logout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    window.location.href = "/";
}

function logoutPatient() {
    localStorage.setItem("userRole", "patient");
    localStorage.removeItem("token");
    window.location.href = "/static/pages/patientDashboard.html";
}

renderHeader();
