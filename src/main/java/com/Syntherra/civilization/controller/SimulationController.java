package com.Syntherra.civilization.controller;

import com.Syntherra.civilization.simulation.WorldSimulationService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simulation")
@RequiredArgsConstructor
public class SimulationController {

    private final WorldSimulationService worldSimulationService;

    @PostMapping("/start")
    public ResponseEntity<String> startSimulation() {

        worldSimulationService.startSimulation();

        return ResponseEntity.ok(
                "Simulation Started"
        );

    }

    @PostMapping("/stop")
    public ResponseEntity<String> stopSimulation() {

        worldSimulationService.stopSimulation();

        return ResponseEntity.ok(
                "Simulation Stopped"
        );

    }

}