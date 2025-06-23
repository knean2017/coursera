package com.project.back_end.service;

import com.project.back_end.models.Appointment;
import com.project.back_end.models.Doctor;
import com.project.back_end.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // ✅ Book a new appointment
    public Appointment bookAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    // ✅ Get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // ✅ Get appointments by doctor ID
    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    // ✅ Get appointments by doctor and date
    public List<Appointment> getAppointmentsByDoctorAndDate(Long doctorId, LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(23, 59, 59);
        return appointmentRepository.findByDoctorIdAndAppointmentTimeBetween(doctorId, start, end);
    }
}
