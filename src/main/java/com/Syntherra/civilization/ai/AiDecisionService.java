package com.Syntherra.civilization.ai;

import com.Syntherra.civilization.entity.Civilization;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.ai.chat.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiDecisionService {

    private final ChatClient chatClient;

    public String generateDecision(
            Civilization civ,
            List<Civilization> allCivilizations
    ) {

        StringBuilder worldContext =
                new StringBuilder();

        for (Civilization other : allCivilizations) {

            if (!other.getId().equals(civ.getId())) {

                worldContext.append(
                        """
                        
                        Civilization:
                        Name: %s
                        Economy: %d
                        Military: %d
                        Food: %d
                        Aggression: %d
                        Ideology: %s
                        """
                        .formatted(
                                other.getName(),
                                other.getEconomy(),
                                other.getMilitary(),
                                other.getFood(),
                                other.getAggression(),
                                other.getIdeology()
                        )
                );
            }
        }

        String prompt =
                """
                You are the supreme leader of a civilization.

                YOUR CIVILIZATION:

                Name: %s
                Economy: %d
                Military: %d
                Food: %d
                Happiness: %d
                Aggression: %d
                Ideology: %s

                OTHER CIVILIZATIONS:
                %s

                Choose ONE strategic action:

                - DECLARE_WAR
                - FORM_ALLIANCE
                - TRADE_RESOURCES
                - BUILD_MILITARY
                - IMPROVE_ECONOMY
                - SPREAD_PROPAGANDA

                IMPORTANT:
                If choosing WAR or ALLIANCE,
                mention target civilization name.

                Explain briefly WHY.

                Keep response under 40 words.
                """
                .formatted(
                        civ.getName(),
                        civ.getEconomy(),
                        civ.getMilitary(),
                        civ.getFood(),
                        civ.getHappiness(),
                        civ.getAggression(),
                        civ.getIdeology(),
                        worldContext.toString()
                );

        try {

            String response =
                    chatClient.call(prompt);

            log.info(
                    "AI Decision For {}: {}",
                    civ.getName(),
                    response
            );

            return response;

        } catch (Exception e) {

            log.error(
                    "AI decision failed",
                    e
            );

            return "IMPROVE_ECONOMY";
        }
    }
}
