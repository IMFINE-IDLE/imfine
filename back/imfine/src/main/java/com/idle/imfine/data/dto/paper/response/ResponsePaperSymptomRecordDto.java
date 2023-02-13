package com.idle.imfine.data.dto.paper.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponsePaperSymptomRecordDto {
    private int id;
    private String name;
    private int score;
}
