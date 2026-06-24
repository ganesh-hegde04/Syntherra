package com.Syntherra.civilization.controller;

import com.Syntherra.civilization.dto.PlayerActionRequest;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
@Slf4j
public class AdminController {

    @PostMapping("/event")
    public ResponseEntity<String> createEvent(

            @RequestBody
            PlayerActionRequest request

    ) {

        if (request == null) {

            return ResponseEntity.badRequest()
                    .body("Invalid Request");

        }

        log.info(

                "PLAYER ACTION -> {} -> {} -> {}",

                request.getSource(),

                request.getTarget(),

                request.getAction()

        );

        return ResponseEntity.ok(
                "Event Received"
        );

    }

}