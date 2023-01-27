package com.idle.imfine.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class CommonResponseMessage {

    private boolean success;
    private int status;
    private String message;

}
