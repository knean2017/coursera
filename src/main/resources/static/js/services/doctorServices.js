import { API_BASE_URL } from "../config/config.js";
const DOCTOR_API = API_BASE_URL + "/doctor";

export async function getDoctors() {
    try {
        const res = await fetch(DOCTOR_API);
        if (!res.ok) throw new Error("Failed to fetch doctors");
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}

export async function deleteDoctor(id, token) {
    try {
        const res = await fetch(`${DOCTOR_API}/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        return { success: res.ok, message: data.message };
    } catch (e) {
        console.error(e);
        return { success: false, message: "Delete failed" };
    }
}

export async function saveDoctor(doctor, token) {
    try {
        const res = await fetch(DOCTOR_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(doctor)
        });

        const data = await res.json();
        return { success: res.ok, message: data.message };
    } catch (e) {
        console.error(e);
        return { success: false, message: "Save failed" };
    }
}

export async function filterDoctors(name, time, specialty) {
    try {
        const url = `${DOCTOR_API}/filter?name=${name || ""}&time=${time || ""}&specialty=${specialty || ""}`;
        const res = await fetch(url);
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}
