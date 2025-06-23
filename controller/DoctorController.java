package com.project.back_end.controller;

import com.project.back_end.models.Doctor;
import com.project.back_end.models.DoctorAvailability;
import com.project.back_end.service.DoctorService;
import com.project.back_end.service.TokenValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private TokenValidationService tokenValidationService;

    // ✅ Get all doctors
    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    // ✅ Get doctor by ID
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        if (doctor != null) {
            return ResponseEntity.ok(doctor);
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ REQUIRED: Get availability by URL pattern '/availability/{role}/{doctorId}/{date}/{token}'
    @GetMapping("/availability/{role}/{doctorId}/{date}/{token}")
    public ResponseEntity<?> getDoctorAvailabilityByDate(
            @PathVariable String role,
            @PathVariable Long doctorId,
            @PathVariable String date,
            @PathVariable String token) {

        // Step 1: Validate token and role
        boolean isValid = tokenValidationService.validateToken(token, role);
        if (!isValid) {
            return ResponseEntity.status(401).body("Unauthorized access: Invalid token or role");
        }

        // Step 2: Get availability
        List<DoctorAvailability> availabilityList = doctorService.getDoctorAvailabilityByDate(doctorId, date);
        return ResponseEntity.ok(availabilityList);
    }
}
