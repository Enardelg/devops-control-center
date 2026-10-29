package com.enardelg.backend.controller;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/services")
public class ServiceStatusController {

    private final JdbcTemplate jdbcTemplate;

    public ServiceStatusController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public record ServiceStatus(
        String name,
        String status
    ) {}

    @GetMapping
    public List<ServiceStatus> getServices() {
        return List.of(
            new ServiceStatus("Spring Boot API", "UP"),
            new ServiceStatus("Database", checkDatabase())
        );
    }

    private String checkDatabase() {
        try {
            Integer result =
                jdbcTemplate.queryForObject("SELECT 1", Integer.class);

            return result != null && result == 1
                ? "UP"
                : "DOWN";

        } catch (Exception e) {
            return "DOWN";
        }
    }
}