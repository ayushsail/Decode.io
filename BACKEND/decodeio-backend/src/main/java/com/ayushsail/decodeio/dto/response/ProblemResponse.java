package com.ayushsail.decodeio.dto.response;

import java.time.Instant;

import com.ayushsail.decodeio.entity.Problem;
import com.ayushsail.decodeio.entity.ProblemDifficulty;
import com.ayushsail.decodeio.entity.ProblemStatus;

public record ProblemResponse(
    Long id,
    String slug,
    String title,
    String description,
    ProblemDifficulty difficulty,
    String starterCode,
    String constraintsText,
    ProblemStatus status,
    Instant createdAt,
    Instant updatedAt
) {

    public static ProblemResponse from(Problem problem) {
        return new ProblemResponse(
            problem.getId(),
            problem.getSlug(),
            problem.getTitle(),
            problem.getDescription(),
            problem.getDifficulty(),
            problem.getStarterCode(),
            problem.getConstraintsText(),
            problem.getStatus(),
            problem.getCreatedAt(),
            problem.getUpdatedAt()
        );
    }
}