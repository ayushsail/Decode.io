package com.ayushsail.decodeio.dto.request;

import com.ayushsail.decodeio.entity.ProblemDifficulty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateProblemRequest(

    @NotBlank
    @Size(max = 120)
    @Pattern(
        regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$",
        message = "Slug must contain lowercase letters, numbers, and single hyphens."
    )
    String slug,

    @NotBlank
    @Size(max = 200)
    String title,

    @NotBlank
    String description,

    @NotNull
    ProblemDifficulty difficulty,

    String starterCode,

    String constraintsText

) {}