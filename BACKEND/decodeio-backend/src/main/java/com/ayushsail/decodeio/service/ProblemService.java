package com.ayushsail.decodeio.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ayushsail.decodeio.entity.Problem;
import com.ayushsail.decodeio.entity.ProblemDifficulty;
import com.ayushsail.decodeio.entity.ProblemStatus;
import com.ayushsail.decodeio.repository.ProblemRepository;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;

    public ProblemService(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    @Transactional
    public Problem createDraftProblem(
            String slug,
            String title,
            String description,
            ProblemDifficulty difficulty,
            String starterCode,
            String constraintsText) {

        if (problemRepository.findBySlug(slug).isPresent()) {
            throw new IllegalArgumentException(
                    "A problem with this slug already exists.");
        }

        Problem problem = new Problem();

        problem.setSlug(slug);
        problem.setTitle(title);
        problem.setDescription(description);
        problem.setDifficulty(difficulty);
        problem.setStarterCode(
                starterCode == null ? "" : starterCode);
        problem.setConstraintsText(constraintsText);
        problem.setStatus(ProblemStatus.DRAFT);

        return problemRepository.save(problem);
    }

    @Transactional(readOnly = true)
    public List<Problem> getPublishedProblems() {
        return problemRepository.findByStatus(
                ProblemStatus.PUBLISHED);
    }

    @Transactional(readOnly = true)
    public List<Problem> getPublishedProblemsByDifficulty(
            ProblemDifficulty difficulty) {

        return problemRepository.findByDifficultyAndStatus(
                difficulty,
                ProblemStatus.PUBLISHED);
    }

    @Transactional(readOnly = true)
    public Optional<Problem> getPublishedProblemBySlug(
            String slug) {

        return problemRepository.findBySlug(slug)
                .filter(problem ->
                        problem.getStatus() == ProblemStatus.PUBLISHED);
    }
}