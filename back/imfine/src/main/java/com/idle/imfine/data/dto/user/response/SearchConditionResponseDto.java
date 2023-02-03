package com.idle.imfine.data.dto.user.response;

import java.util.List;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SearchConditionResponseDto {

    private List<Objects> conditions;

}
