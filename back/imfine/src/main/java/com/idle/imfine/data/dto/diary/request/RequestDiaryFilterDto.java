package com.idle.imfine.data.dto.diary.request;

import java.util.List;
import java.util.stream.Stream;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestDiaryFilterDto {
    private String tab;
    private List<Integer> medicalId;
    private List<Integer> symptomId;
}
