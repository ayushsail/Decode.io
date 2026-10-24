package com.ayushsail.decodeio.exception;

import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import com.ayushsail.decodeio.dto.response.ApiErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidation(
            MethodArgumentNotValidException ex) {

        Map<String, String> details = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        error -> error.getField(),
                        error -> error.getDefaultMessage() == null
                                ? "Invalid value"
                                : error.getDefaultMessage(),
                        (first, second) -> first
                ));

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "VALIDATION_ERROR",
                "Request validation failed.",
                details
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidBody(
            HttpMessageNotReadableException ex) {

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "INVALID_REQUEST_BODY",
                "The request body is invalid or contains an unsupported value.",
                Map.of()
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiErrorResponse> handleDataConflict(
            DataIntegrityViolationException ex) {

        return buildResponse(
                HttpStatus.CONFLICT,
                "DATA_CONFLICT",
                "The request conflicts with existing data or database constraints.",
                Map.of()
        );
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiErrorResponse> handleResponseStatus(
            ResponseStatusException ex) {

        HttpStatusCode status = ex.getStatusCode();

        return ResponseEntity.status(status).body(
                new ApiErrorResponse(
                        Instant.now(),
                        status.value(),
                        "REQUEST_FAILED",
                        ex.getReason() == null
                                ? "The request could not be completed."
                                : ex.getReason(),
                        Map.of()
                )
        );
    }

    private ResponseEntity<ApiErrorResponse> buildResponse(
            HttpStatus status,
            String error,
            String message,
            Map<String, String> details) {

        ApiErrorResponse response = new ApiErrorResponse(
                Instant.now(),
                status.value(),
                error,
                message,
                details
        );

        return ResponseEntity.status(status).body(response);
    }
}