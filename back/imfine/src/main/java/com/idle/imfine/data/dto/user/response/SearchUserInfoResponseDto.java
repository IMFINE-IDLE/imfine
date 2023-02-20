package com.idle.imfine.data.dto.user.response;

import java.util.List;

import com.idle.imfine.data.dto.medical.response.ResponseMedicalListDto;
import com.idle.imfine.data.entity.medical.MedicalCode;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SearchUserInfoResponseDto {

    private String name;
    private boolean open;
    private boolean play;
    private Integer followingCount;
    private Integer followerCount;
    private List<ResponseMedicalListDto> medicalList;
    private int condition;
    private int relation;

}
