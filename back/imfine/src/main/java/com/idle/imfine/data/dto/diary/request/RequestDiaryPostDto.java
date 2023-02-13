package com.idle.imfine.data.dto.diary.request;

import com.idle.imfine.data.entity.Diary;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class RequestDiaryPostDto {
    private int medicalId;
    private long userId;
    private boolean open;
    private String title;
    private String description;
    private String image;
    private List<Integer> symptom;

    public void setUserId(int userId){
        this.userId = userId;
    }
}
