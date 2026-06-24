package com.Syntherra.civilization.controller;

import com.Syntherra.civilization.entity.WorldEvent;
import com.Syntherra.civilization.repository.WorldEventRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class WorldEventController {

    private final WorldEventRepository worldEventRepository;

    @GetMapping
    public ResponseEntity<List<WorldEvent>> getAllEvents() {

        return ResponseEntity.ok(
                worldEventRepository.findAll()
        );
    }
}