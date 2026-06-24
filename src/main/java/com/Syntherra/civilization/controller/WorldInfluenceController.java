package com.Syntherra.civilization.controller;

import com.Syntherra.civilization.dto.InfluenceRequest;
import com.Syntherra.civilization.service.WorldInfluenceService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/world")
@RequiredArgsConstructor
public class WorldInfluenceController {

    private final WorldInfluenceService worldInfluenceService;

    @PostMapping("/influence")
    public ResponseEntity<String> influenceWorld(
            @RequestBody InfluenceRequest request
    ) {

        if (
                request == null ||
                request.getCivilizationId() == null ||
                request.getAction() == null ||
                request.getAction().isBlank()
        ) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid Request");
        }

        return ResponseEntity.ok(
                worldInfluenceService.applyInfluence(
                        request.getCivilizationId(),
                        request.getAction()
                )
        );
    }
}