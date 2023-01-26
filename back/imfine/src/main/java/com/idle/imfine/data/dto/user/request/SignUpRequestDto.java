package com.idle.imfine.data.dto.user.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpRequestDto {

    private String uid;
    private String password;
    private String rePassword;
    private String name;
    private String email;
    private boolean open;
    private List<String> medicalIdList;

}
