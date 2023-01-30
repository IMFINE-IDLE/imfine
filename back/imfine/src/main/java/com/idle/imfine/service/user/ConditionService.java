package com.idle.imfine.service.user;

import com.idle.imfine.data.dto.user.request.ConditionRequestDto;
import com.idle.imfine.data.dto.user.response.ConditionResponseDto;

import java.time.LocalDate;
import java.util.Map;

public interface ConditionService {

    public void createCondition(String uid, ConditionRequestDto requestDto);

    public void modifyCondition(String uid, ConditionRequestDto requestDto);

    public ConditionResponseDto getConditionByDay(String uid, String day);

    public Map<LocalDate, Integer> getAllCondtionByMonth(String uid, String month);

}
