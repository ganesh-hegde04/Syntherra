package com.Syntherra.civilization.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Civilization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int economy;

    private int military;

    private int food;

    private int oil;

    private int happiness;

    private int population;

    private String ideology;

    private int aggression;
}