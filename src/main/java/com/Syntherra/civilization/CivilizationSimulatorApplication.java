package com.Syntherra.civilization;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CivilizationSimulatorApplication {

    public static void main(String[] args) {
        SpringApplication.run(CivilizationSimulatorApplication.class, args);
    }
}