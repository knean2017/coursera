import { API_BASE_URL } from "../config/config.js";
const PATIENT_API = API_BASE_URL + "/patient";

export async function patientSignup(data) {
    try {
        const res = await fetch(`${PATIENT_API}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        return { success: res.ok, message: json.message };
    } catch (e) {
        console.error(e);
        return { success: false, message: "Signup failed" };
    }
}

export async function patientLogin(data) {
    try {
        const res = await fetch(`${PATIENT_API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return res;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function getPatientData(token) {
    try {
        const res = await fetch(`${PATIENT_API}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return await res.json();
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function getPatientAppointments(id, token, user) {
    try {
        const res = await fetch(`${PATIENT_API}/${id}/appointments?user=${user}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return await res.json();
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function filterAppointments(condition, name, token) {
    try {
        const url = `${PATIENT_API}/appointments/filter?condition=${condition || ""}&name=${name || ""}`;
        const res = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}
