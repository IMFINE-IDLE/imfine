package com.idle.imfine.service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Sentiment {

    POSITIVE(0, "positive"),
    NEGATIVE(1, "negative"),
    NEUTRAL(2, "neutral"),
    MIXED(3, "mixed");

    private final int value;
    private final String name;

}
