package com.ayushsail.decodeio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ayushsail.decodeio.entity.Problem;
import com.ayushsail.decodeio.entity.ProblemDifficulty;
import com.ayushsail.decodeio.entity.ProblemStatus;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

    Optional<Problem> findBySlug(String slug);

    List<Problem> findByStatus(ProblemStatus status);

    List<Problem> findByDifficultyAndStatus(
            ProblemDifficulty difficulty,
            ProblemStatus status
    );
}