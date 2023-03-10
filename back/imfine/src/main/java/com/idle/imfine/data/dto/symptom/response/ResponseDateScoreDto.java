package com.idle.imfine.data.dto.symptom.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseDateScoreDto {
    private LocalDate date;
    List<ResponseSymptomScoreDto> symptoms;
}
