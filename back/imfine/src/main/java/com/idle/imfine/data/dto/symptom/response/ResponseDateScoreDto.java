package com.idle.imfine.data.dto.symptom.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDateScoreDto {
    private String date;
    private int score;
}
