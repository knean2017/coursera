// appointmentRecordService.js

import { API_BASE_URL } from "../config/config.js";

const APPOINTMENT_API = `${API_BASE_URL}/appointments`;

export async function getAllAppointments(date, patientName, token) {
    try {
        const params = new URLSearchParams();
        if (date) params.append("date", date);
        if (patientName) params.append("patientName", patientName);

        const response = await fetch(`${APPOINTMENT_API}?${params.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Failed to load appointments");

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
