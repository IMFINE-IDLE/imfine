package com.idle.imfine.data.dto.diary.request;

import java.util.List;
import java.util.stream.Stream;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class RequestDiaryFilterDto {
    private String tab;
    private List<Integer> medicalId;
    private List<Integer> symptomId;
}
