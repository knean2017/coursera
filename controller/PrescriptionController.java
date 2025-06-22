package com.project.back_end.controller;

import com.project.back_end.models.Prescription;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {



    @GetMapping
    public ResponseEntity<List<Prescription>> getAllPrescriptions() {
        PrescriptionController prescriptionService = null;
        return ResponseEntity.ok(prescriptionService.getAllPrescriptions().getBody());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable Long id) {
        PrescriptionController prescriptionService = null;
        Prescription p = prescriptionService.getPrescriptionById(id).getBody();
        if (p != null) {
            return ResponseEntity.ok(p);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
