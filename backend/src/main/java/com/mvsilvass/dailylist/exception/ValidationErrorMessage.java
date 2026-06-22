package com.mvsilvass.dailylist.excepiton;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ValidationErrorMessage {
    private HttpStatus status;
    private String message;
    private Map<String, List<String>> errors;
}
