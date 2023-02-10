package com.idle.imfine.data.dto.image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseModifyImageDto {

    private long id;
    private String image;
}
