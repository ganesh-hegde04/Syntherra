package com.Syntherra.civilization.service;

import com.Syntherra.civilization.entity.Civilization;
import com.Syntherra.civilization.entity.WorldEvent;
import com.Syntherra.civilization.repository.CivilizationRepository;
import com.Syntherra.civilization.repository.WorldEventRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class WorldInfluenceService {

    private final CivilizationRepository civilizationRepository;

    private final WorldEventRepository worldEventRepository;

    private final SimpMessagingTemplate messagingTemplate;

    public String applyInfluence(
            Long civilizationId,
            String action
    ) {

        Civilization civ =
                civilizationRepository
                        .findById(civilizationId)
                        .orElseThrow();

        switch (action) {

            case "ECONOMIC_AID" -> {
                civ.setEconomy(civ.getEconomy() + 20);
            }

            case "FOOD_SHIPMENT" -> {
                civ.setFood(civ.getFood() + 25);
            }

            case "MILITARY_FUNDING" -> {
                civ.setMilitary(civ.getMilitary() + 15);
            }

            case "SPREAD_REBELLION" -> {
                civ.setHappiness(
                        Math.max(
                                0,
                                civ.getHappiness() - 20
                        )
                );
            }

            case "OIL_EMBARGO" -> {
                civ.setEconomy(
                        Math.max(
                                0,
                                civ.getEconomy() - 15
                        )
                );

                civ.setFood(
                        Math.max(
                                0,
                                civ.getFood() - 15
                        )
                );
            }

            default -> {
                return "Invalid Action";
            }
        }

        civilizationRepository.save(civ);

        WorldEvent event =
                WorldEvent.builder()
                        .title("Human Intervention")
                        .description(
                                action +
                                " applied to " +
                                civ.getName()
                        )
                        .type("HUMAN")
                        .severity(5)
                        .timestamp(LocalDateTime.now())
                        .build();

        worldEventRepository.save(event);

        messagingTemplate.convertAndSend(
                "/topic/events",
                event
        );

        messagingTemplate.convertAndSend(
                "/topic/world",
                civilizationRepository.findAll()
        );

        return "Influence Applied Successfully";
    }
}