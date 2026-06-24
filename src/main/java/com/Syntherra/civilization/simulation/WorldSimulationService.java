package com.Syntherra.civilization.simulation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.Syntherra.civilization.ai.AiDecisionService;
import com.Syntherra.civilization.entity.Civilization;
import com.Syntherra.civilization.entity.WorldEvent;
import com.Syntherra.civilization.repository.CivilizationRepository;
import com.Syntherra.civilization.repository.WorldEventRepository;
import com.Syntherra.civilization.service.UserActivityService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class WorldSimulationService {

    private final CivilizationRepository civilizationRepository;

    private final WorldEventRepository worldEventRepository;

    private final SimpMessagingTemplate messagingTemplate;

    private final AiDecisionService aiDecisionService;

    private final UserActivityService userActivityService;

    private final Random random = new Random();

    private long lastAiExecutionTime = 0;
private volatile boolean simulationStarted = false;
private final Map<String, Long> eventCooldowns =
        new ConcurrentHashMap<>();
    public WorldSimulationService(
            CivilizationRepository civilizationRepository,
            WorldEventRepository worldEventRepository,
            SimpMessagingTemplate messagingTemplate,
            AiDecisionService aiDecisionService,
            UserActivityService userActivityService
    ) {

        this.civilizationRepository = civilizationRepository;
        this.worldEventRepository = worldEventRepository;
        this.messagingTemplate = messagingTemplate;
        this.aiDecisionService = aiDecisionService;
        this.userActivityService = userActivityService;
    }

    public void startSimulation() {

    simulationStarted = true;

    log.info("World Simulation Started");

}

public void stopSimulation() {

    simulationStarted = false;

    log.info("World Simulation Stopped");

}

    @Scheduled(fixedRate = 5000)
    public void simulateWorld() {

        if (!simulationStarted) {

    return;

}
        List<Civilization> civilizations =
                civilizationRepository.findAll();

        boolean aiMode =
                userActivityService.hasActiveUsers();

        boolean runAiThisTick =
                aiMode && shouldRunAi();

       

        for (Civilization civ : civilizations) {

            updateCivilizationStats(civ);

            if (runAiThisTick) {

                processAiDecision(
                        civ,
                        civilizations
                );
            }

            checkForWorldEvents(civ);

            civilizationRepository.save(civ);

            
        }

        messagingTemplate.convertAndSend(
                "/topic/world",
                civilizations
        );
    }

    private boolean shouldRunAi() {

        long currentTime =
                System.currentTimeMillis();

        long twoMinutes =
                120000;

        if (currentTime - lastAiExecutionTime
                >= twoMinutes) {

            lastAiExecutionTime =
                    currentTime;

            return true;
        }

        return false;
    }

    private void updateCivilizationStats(
            Civilization civ
    ) {

        civ.setEconomy(
                civ.getEconomy()
                        + random.nextInt(11) - 5
        );

        civ.setFood(
                civ.getFood()
                        + random.nextInt(11) - 5
        );

        civ.setHappiness(
                civ.getHappiness()
                        + random.nextInt(11) - 5
        );

        civ.setPopulation(
                civ.getPopulation()
                        + random.nextInt(50)
        );

        civ.setEconomy(
                Math.max(civ.getEconomy(), 0)
        );

        civ.setFood(
                Math.max(civ.getFood(), 0)
        );

        civ.setHappiness(
                Math.max(civ.getHappiness(), 0)
        );
    }

    private void processAiDecision(
            Civilization civ,
            List<Civilization> civilizations
    ) {

        String decision =
                aiDecisionService.generateDecision(
                        civ,
                        civilizations
                );

        decision = decision
                .replace("*", "")
                .replace("#", "")
                .replace("</assistant>", "")
                .replace("\n", " ")
                .trim();

        log.debug(
        "AI Decision For {}",
        civ.getName()
);

        if (decision.contains("BUILD_MILITARY")) {

            civ.setMilitary(
                    civ.getMilitary() + 10
            );

            createWorldEvent(
                    "Military Expansion",
                    civ.getName()
                            + " is strengthening military forces.",
                    "MILITARY",
                    6
            );
        }

        else if (decision.contains("IMPROVE_ECONOMY")) {

            civ.setEconomy(
                    civ.getEconomy() + 8
            );

            createWorldEvent(
                    "Economic Reform",
                    civ.getName()
                            + " launched economic reforms.",
                    "ECONOMY",
                    4
            );
        }

        else if (decision.contains("TRADE_RESOURCES")) {

            civ.setFood(
                    civ.getFood() + 12
            );

            civ.setEconomy(
                    civ.getEconomy() + 3
            );

            createWorldEvent(
                    "Trade Agreement",
                    civ.getName()
                            + " signed trade agreements.",
                    "TRADE",
                    3
            );
        }

        else if (decision.contains("SPREAD_PROPAGANDA")) {

            civ.setHappiness(
                    civ.getHappiness() + 5
            );

            createWorldEvent(
                    "Government Propaganda",
                    civ.getName()
                            + " launched propaganda campaigns.",
                    "POLITICS",
                    5
            );
        }

        else if (decision.contains("FORM_ALLIANCE")) {

            Civilization target =
                    findTargetCivilization(
                            decision,
                            civilizations,
                            civ
                    );

            civ.setEconomy(
                    civ.getEconomy() + 5
            );

            civ.setHappiness(
                    civ.getHappiness() + 5
            );

            if (target != null) {

                target.setEconomy(
                        target.getEconomy() + 5
                );

                target.setHappiness(
                        target.getHappiness() + 5
                );

                civilizationRepository.save(target);

                createWorldEvent(
                        "Alliance Formed",
                        civ.getName()
                                + " formed alliance with "
                                + target.getName(),
                        "DIPLOMACY",
                        5
                );
            }
        }

        else if (decision.contains("DECLARE_WAR")) {

            Civilization target =
                    findTargetCivilization(
                            decision,
                            civilizations,
                            civ
                    );

            civ.setMilitary(
                    Math.max(
                            civ.getMilitary() - 10,
                            0
                    )
            );

            civ.setEconomy(
                    Math.max(
                            civ.getEconomy() - 5,
                            0
                    )
            );

            if (target != null) {

                target.setPopulation(
                        Math.max(
                                target.getPopulation() - 100,
                                0
                        )
                );

                target.setEconomy(
                        Math.max(
                                target.getEconomy() - 15,
                                0
                        )
                );

                target.setHappiness(
                        Math.max(
                                target.getHappiness() - 20,
                                0
                        )
                );

                target.setFood(
                        Math.max(
                                target.getFood() - 10,
                                0
                        )
                );

                civilizationRepository.save(target);

                createWorldEvent(
                        "War Declared",
                        civ.getName()
                                + " declared war on "
                                + target.getName(),
                        "WAR",
                        10
                );
            }
        }
    }

    private Civilization findTargetCivilization(
            String decision,
            List<Civilization> civilizations,
            Civilization current
    ) {

        for (Civilization civ : civilizations) {

            if (!civ.getId().equals(current.getId())) {

                if (decision.contains(civ.getName())) {

                    return civ;
                }
            }
        }

        return null;
    }
    private boolean canCreateEvent(
        String eventKey,
        long cooldownMillis
) {

    long now =
            System.currentTimeMillis();

    Long lastCreated =
            eventCooldowns.get(eventKey);

    if (
            lastCreated == null
                    ||
                    now - lastCreated >= cooldownMillis
    ) {

        eventCooldowns.put(
                eventKey,
                now
        );

        return true;
    }

    return false;
}
    private void checkForWorldEvents(
        Civilization civ
) {

    if (
            civ.getFood() < 40
                    &&
                    canCreateEvent(
                            civ.getId() + "-food",
                            60000
                    )
    ) {

        createWorldEvent(
                "Food Crisis",
                civ.getName()
                        + " is facing food shortages.",
                "CRISIS",
                8
        );
    }

    if (
            civ.getHappiness() < 30
                    &&
                    canCreateEvent(
                            civ.getId() + "-unrest",
                            60000
                    )
    ) {

        createWorldEvent(
                "Civil Unrest",
                civ.getName()
                        + " citizens are protesting.",
                "UNREST",
                7
        );
    }

    if (
            civ.getPopulation() < 300
                    &&
                    canCreateEvent(
                            civ.getId() + "-collapse",
                            120000
                    )
    ) {

        createWorldEvent(
                "Population Collapse",
                civ.getName()
                        + " population is dangerously low.",
                "COLLAPSE",
                9
        );
    }
}

private void createWorldEvent(
        String title,
        String description,
        String type,
        int severity
) {

    WorldEvent event =
            WorldEvent.builder()
                    .title(title)
                    .description(description)
                    .type(type)
                    .severity(severity)
                    .timestamp(LocalDateTime.now())
                    .build();

    worldEventRepository.save(event);

    List<WorldEvent> events =
            worldEventRepository.findAllByOrderByTimestampDesc();

    if (events.size() > 10) {

        worldEventRepository.deleteAll(
                events.subList(
                        10,
                        events.size()
                )
        );
    }

    messagingTemplate.convertAndSend(
            "/topic/events",
            event
    );

    log.info(
            "WORLD EVENT CREATED: {}",
            title
    );
}
}