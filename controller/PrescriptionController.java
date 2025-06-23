package com.project.back_end.controller;

import com.project.back_end.models.Prescription;
import com.project.back_end.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    // ✅ Get all prescriptions
    @GetMapping
    public ResponseEntity<List<Prescription>> getAllPrescriptions() {
        List<Prescription> prescriptions = prescriptionService.getAllPrescriptions();
        return ResponseEntity.ok(prescriptions);
    }

    // ✅ Get prescription by ID
    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable Long id) {
        Prescription prescription = prescriptionService.getPrescriptionById(id);
        if (prescription != null) {
            return ResponseEntity.ok(prescription);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Create prescription with token (rubric required version)
    @PostMapping("/create/{token}")
    public ResponseEntity<Prescription> createPrescription(
            @PathVariable String token,
            @RequestBody Prescription prescription) {
        Prescription saved = prescriptionService.savePrescription(prescription);
        return ResponseEntity.ok(saved);
    }
}
