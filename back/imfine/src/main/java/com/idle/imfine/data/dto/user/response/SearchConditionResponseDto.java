package com.idle.imfine.data.dto.user.response;

import com.idle.imfine.common.CommonResponseMessage;
import java.util.List;
import java.util.Objects;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class SearchConditionResponseDto extends CommonResponseMessage {

    private List<Objects> conditions;

}
