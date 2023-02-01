package com.idle.imfine.data.dto.paper.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestSymptomPaperDto {
    private int symptomId;
    private int score;
}
