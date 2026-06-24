package com.Syntherra.civilization.repository;

import com.Syntherra.civilization.entity.Civilization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CivilizationRepository extends JpaRepository<Civilization, Long> {
}