package com.idle.imfine.data.dto.user.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FindPasswordRequestDto {

    private String uid;
    private String password;

}
