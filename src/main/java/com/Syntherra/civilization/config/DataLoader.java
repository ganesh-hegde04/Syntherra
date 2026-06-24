package com.Syntherra.civilization.config;

import com.Syntherra.civilization.entity.Civilization;
import com.Syntherra.civilization.repository.CivilizationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final CivilizationRepository civilizationRepository;

    @Override
    public void run(String... args) {

        if (civilizationRepository.count() == 0) {

            civilizationRepository.save(
                    Civilization.builder()
                            .name("Eastern Republic")
                            .economy(80)
                            .military(60)
                            .food(70)
                            .oil(50)
                            .happiness(75)
                            .population(1000)
                            .ideology("Democratic")
                            .aggression(30)
                            .build()
            );

            civilizationRepository.save(
                    Civilization.builder()
                            .name("Iron Dominion")
                            .economy(60)
                            .military(90)
                            .food(50)
                            .oil(80)
                            .happiness(40)
                            .population(1200)
                            .ideology("Authoritarian")
                            .aggression(85)
                            .build()
            );

            civilizationRepository.save(
                    Civilization.builder()
                            .name("Solaris Union")
                            .economy(90)
                            .military(40)
                            .food(75)
                            .oil(35)
                            .happiness(90)
                            .population(1100)
                            .ideology("Technocracy")
                            .aggression(20)
                            .build()
            );

            civilizationRepository.save(
                    Civilization.builder()
                            .name("Crimson Empire")
                            .economy(55)
                            .military(95)
                            .food(60)
                            .oil(70)
                            .happiness(50)
                            .population(1300)
                            .ideology("Expansionist")
                            .aggression(95)
                            .build()
            );

            civilizationRepository.save(
                    Civilization.builder()
                            .name("Northern Coalition")
                            .economy(85)
                            .military(50)
                            .food(95)
                            .oil(40)
                            .happiness(80)
                            .population(1000)
                            .ideology("Trade Federation")
                            .aggression(15)
                            .build()
            );

            civilizationRepository.save(
                    Civilization.builder()
                            .name("Desert Caliphate")
                            .economy(70)
                            .military(70)
                            .food(45)
                            .oil(95)
                            .happiness(65)
                            .population(900)
                            .ideology("Resource State")
                            .aggression(55)
                            .build()
            );

            log.info("Loaded 6 civilizations");
        }
    }
}