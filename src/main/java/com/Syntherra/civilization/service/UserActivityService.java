package com.Syntherra.civilization.service;

import lombok.extern.slf4j.Slf4j;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class UserActivityService {

    private static final int
            INACTIVE_TIMEOUT_SECONDS = 30;

    private final Map<String, LocalDateTime>
            activeDevices =
            new ConcurrentHashMap<>();

    public void heartbeat(
            String deviceId
    ) {

        if (
                deviceId == null ||
                deviceId.length() > 100
        ) {

            return;

        }

        activeDevices.put(
                deviceId,
                LocalDateTime.now()
        );
    }

    public void disconnect(
            String deviceId
    ) {

        if (
                deviceId == null
        ) {

            return;

        }

        activeDevices.remove(
                deviceId
        );
    }

    public int getActiveUserCount() {

        removeInactiveUsers();

        return activeDevices.size();
    }

    public boolean hasActiveUsers() {

        removeInactiveUsers();

        return !activeDevices.isEmpty();
    }

    @Scheduled(fixedRate = 10000)
    public void removeInactiveUsers() {

        LocalDateTime now =
                LocalDateTime.now();

        activeDevices
                .entrySet()
                .removeIf(

                        entry ->

                                entry
                                        .getValue()
                                        .plusSeconds(
                                                INACTIVE_TIMEOUT_SECONDS
                                        )
                                        .isBefore(now)

                );

    }

    @Scheduled(fixedRate = 30000)
public void printActiveUsers() {

    removeInactiveUsers();

    log.info(
            "Current Active Devices: {}",
            activeDevices.size()
    );

}

}