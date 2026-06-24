package com.Syntherra.civilization.controller;

import com.Syntherra.civilization.service.UserActivityService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/activity")
@RequiredArgsConstructor
public class UserActivityController {

    private final UserActivityService userActivityService;

    @PostMapping("/heartbeat/{deviceId}")
    public ResponseEntity<Map<String, String>> heartbeat(
            @PathVariable String deviceId
    ) {

        userActivityService.heartbeat(deviceId);

        return ResponseEntity.ok(
                Map.of(
                        "status", "active",
                        "deviceId", deviceId
                )
        );
    }

 @PostMapping("/disconnect/{deviceId}")
public ResponseEntity<Map<String, String>> disconnect(
        @PathVariable String deviceId
) {

    userActivityService.disconnect(deviceId);

    return ResponseEntity.ok(
            Map.of(
                    "status",
                    "disconnected",
                    "deviceId",
                    deviceId
            )
    );
}

    @GetMapping("/count")
    public ResponseEntity<Map<String, Integer>> getCount() {

        return ResponseEntity.ok(
                Map.of(
                        "activeDevices",
                        userActivityService.getActiveUserCount()
                )
        );
    }
}