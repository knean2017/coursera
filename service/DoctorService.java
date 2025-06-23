package com.project.back_end.service;

import com.project.back_end.models.Doctor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    private final Map<Long, Doctor> doctorStore = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    // Dummy time slot data
    private final Map<Long, Map<LocalDate, List<String>>> doctorAvailability = new HashMap<>();

    // Get all doctors
    public List<Doctor> getAllDoctors() {
        return new ArrayList<>(doctorStore.values());
    }

    // Get doctor by ID
    public Doctor getDoctorById(Long id) {
        return doctorStore.get(id);
    }

    // Save a new doctor
    public Doctor saveDoctor(Doctor doctor) {
        Long id = idGenerator.getAndIncrement();
        doctor.setId(id);
        doctorStore.put(id, doctor);

        // Initialize dummy availability for demo
        Map<LocalDate, List<String>> availability = new HashMap<>();
        availability.put(LocalDate.now(), Arrays.asList("09:00", "10:00", "11:00"));
        doctorAvailability.put(id, availability);

        return doctor;
    }

    // Update an existing doctor
    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {
        Doctor existing = doctorStore.get(id);
        if (existing != null) {
            updatedDoctor.setId(id);
            doctorStore.put(id, updatedDoctor);
            return updatedDoctor;
        }
        return null;
    }

    // Delete a doctor
    public boolean deleteDoctor(Long id) {
        doctorAvailability.remove(id);
        return doctorStore.remove(id) != null;
    }

    // ✅ Get available time slots for a doctor on a specific date
    public List<String> getAvailableTimeSlots(Long doctorId, LocalDate date) {
        Map<LocalDate, List<String>> availability = doctorAvailability.get(doctorId);
        if (availability != null) {
            return availability.getOrDefault(date, Collections.emptyList());
        }
        return Collections.emptyList();
    }

    // ✅ Validate doctor login
    public Doctor validateDoctorLogin(String email, String password) {
        return doctorStore.values().stream()
                .filter(d -> d.getEmail().equals(email) && d.getPassword().equals(password))
                .findFirst()
                .orElse(null);
    }
}
