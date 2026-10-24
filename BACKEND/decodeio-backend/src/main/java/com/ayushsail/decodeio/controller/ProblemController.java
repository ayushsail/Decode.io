package com.ayushsail.decodeio.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.ayushsail.decodeio.dto.request.CreateProblemRequest;
import com.ayushsail.decodeio.dto.response.ProblemResponse;
import com.ayushsail.decodeio.entity.Problem;
import com.ayushsail.decodeio.entity.ProblemDifficulty;
import com.ayushsail.decodeio.service.ProblemService;

@RestController
@RequestMapping("/api/v1/problems")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @PostMapping
    public ResponseEntity<ProblemResponse> createProblem(
            @Valid @RequestBody CreateProblemRequest request) {

        Problem problem;

        try {
            problem = problemService.createDraftProblem(
                request.slug(),
                request.title(),
                request.description(),
                request.difficulty(),
                request.starterCode(),
                request.constraintsText()
            );
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                e.getMessage()
            );
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ProblemResponse.from(problem));
    }

    @GetMapping
    public List<ProblemResponse> getProblems(
            @RequestParam(required = false)
            ProblemDifficulty difficulty) {

        List<Problem> problems = (difficulty == null)
                ? problemService.getPublishedProblems()
                : problemService.getPublishedProblemsByDifficulty(difficulty);

        return problems.stream()
                .map(ProblemResponse::from)
                .toList();
    }

    @GetMapping("/{slug}")
    public ProblemResponse getProblemBySlug(
            @PathVariable String slug) {

        return problemService.getPublishedProblemBySlug(slug)
                .map(ProblemResponse::from)
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Published problem not found"
                ));
    }
}