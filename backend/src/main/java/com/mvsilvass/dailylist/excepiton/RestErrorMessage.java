package com.mvsilvass.dailylist.excepiton;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RestErrorMessage {
    private HttpStatus status;
    private Instant timestamp;
    private String error;
    private String message;
}
