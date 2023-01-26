package com.idle.imfine.data.dto.user.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModifyUserMedicalListRequestDto {

    private List<String> medicalList;

}
