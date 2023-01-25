package com.idle.imfine.common;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class CommonResponseMessage {

    private boolean success;
    private int status;
    private String message;

}
