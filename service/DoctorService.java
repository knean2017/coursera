package com.project.back_end.service;

import com.project.back_end.models.Doctor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class DoctorService {

    private final Map<Long, Doctor> doctorStore = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

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
        return doctorStore.remove(id) != null;
    }
}
