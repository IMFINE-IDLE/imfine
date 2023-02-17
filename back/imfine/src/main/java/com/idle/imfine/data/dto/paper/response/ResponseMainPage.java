package com.idle.imfine.data.dto.paper.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMainPage {
    private boolean hasNext;
    List<ResponsePaperDtoOnlyMainPage> list;
}
