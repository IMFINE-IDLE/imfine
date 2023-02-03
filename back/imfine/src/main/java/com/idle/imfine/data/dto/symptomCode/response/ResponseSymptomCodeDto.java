package com.idle.imfine.data.dto.symptomCode.response;

import javax.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class ResponseSymptomCodeDto {
    private Integer id;
    private String name;
    private String image;
}
