package com.idle.imfine.data.dto.diary.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class RequestDiaryPostDto {
    private int medicalId;
    private int userId;
    private boolean open;
    private String title;
    private String description;
    private String image;
    private List<Integer> symptom;

    public RequestDiaryPostDto() {}

    public RequestDiaryPostDto(int medicalId, boolean open, String title, String description,
        String image, List<Integer> symptom) {
        this.medicalId = medicalId;
        this.open = open;
        this.title = title;
        this.description = description;
        this.image = image;
        this.symptom = symptom;
    }

    public void setUserId(int userId){
        this.userId = userId;
    }
}
