package com.idle.imfine.common.result;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Result {
    private boolean success;
    private int status;
    private String message;
}
