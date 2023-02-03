package com.idle.imfine.data.dto.diary.request;


import java.util.List;
import java.util.PrimitiveIterator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestDiaryModifyDto {
    private long diaryId;
    private String title;
    private String description;
    private String image;
    private boolean open;
    private boolean active;
}
