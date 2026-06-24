package com.Syntherra.civilization.controller;

import com.Syntherra.civilization.entity.Civilization;
import com.Syntherra.civilization.repository.CivilizationRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/civilizations")
@RequiredArgsConstructor
public class CivilizationController {

    private final CivilizationRepository civilizationRepository;

    @GetMapping
    public ResponseEntity<List<Civilization>>
    getAllCivilizations() {

        return ResponseEntity.ok(
                civilizationRepository.findAll()
        );
    }
}