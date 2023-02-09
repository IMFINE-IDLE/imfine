package com.idle.imfine.data.dto.user.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SearchUserListResponseDto {
    private long id;
    private String uid;
    private String name;
    private int relation;
    private boolean hasNext;
}
