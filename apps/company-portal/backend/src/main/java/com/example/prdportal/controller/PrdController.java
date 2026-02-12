package com.example.prdportal.controller;

import com.example.prdportal.model.Prd;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/prds")
@CrossOrigin(origins = "*")
public class PrdController {
    private final List<Prd> prds = new ArrayList<>(List.of(
        new Prd("001A", "Smart Task Allocation and Tracking System", "Accepted", "John Doe", "1.2"),
        new Prd("004E", "Inventory Management and Billing System", "Rejected", "James", "1.0"),
        new Prd("002B", "Student Information Management System", "Accepted", "Amanda", "1.1")
    ));

    @GetMapping
    public List<Prd> getAllPrds() {
        return prds;
    }
}
