package com.Syntherra.civilization.repository;

import com.Syntherra.civilization.entity.WorldEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorldEventRepository
        extends JpaRepository<WorldEvent, Long> {

    List<WorldEvent> findAllByOrderByTimestampDesc();

}