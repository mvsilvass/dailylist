package com.mvsilvass.dailylist.dto.request;

import java.util.Date;

public record TaskPositionRequest(
    Long id,
    int priority,
    Date targetDate
) {}