package com.idle.imfine.data.dto.bamboo.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseBambooListDto {
    private List<ResponseBamboo> bamboos;
}
