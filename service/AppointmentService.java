package com.project.back_end.service;

import com.project.back_end.models.Appointment;
import com.project.back_end.models.Doctor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    private final List<Appointment> appointmentList;

    public AppointmentService() {
        this.appointmentList = new ArrayList<>();

        // Dummy data
        appointmentList.add(new Appointment(1L, LocalDateTime.of(2025, 6, 24, 9, 0), "Scheduled", new Doctor(1L, "Dr. Alice")));
        appointmentList.add(new Appointment(2L, LocalDateTime.of(2025, 6, 24, 10, 0), "Consulted", new Doctor(2L, "Dr. Bob")));
    }

    public List<Appointment> getAllAppointments() {
        return appointmentList;
    }

    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        List<Appointment> result = new ArrayList<>();
        for (Appointment a : appointmentList) {
            if (a.getDoctor().getId().equals(doctorId)) {
                result.add(a);
            }
        }
        return result;
    }
}
