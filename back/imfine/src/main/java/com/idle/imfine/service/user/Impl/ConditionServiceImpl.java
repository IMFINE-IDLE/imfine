package com.idle.imfine.service.user.Impl;

import com.idle.imfine.data.dto.user.request.ConditionRequestDto;
import com.idle.imfine.data.dto.user.response.ConditionResponseDto;
import com.idle.imfine.data.entity.Condition;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.repository.user.ConditionRepository;
import com.idle.imfine.errors.code.ConditionErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.user.ConditionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ConditionServiceImpl implements ConditionService {

    private final Logger LOGGER = LoggerFactory.getLogger(ConditionServiceImpl.class);
    private final Common common;
    private final ConditionRepository conditionRepository;

    @Override
    public void createCondition(String uid, ConditionRequestDto requestDto) {
        User user = common.getUserByUid(uid);
        LocalDate date = common.convertDateType(requestDto.getDate());

        if (conditionRepository.existsByUserAndDate(user, date)) {
            throw new ErrorException(ConditionErrorCode.CONDITION_ALREADY_EXIST);
        }

        Condition condition = Condition.builder()
                .user(user)
                .condition(requestDto.getCondition())
                .date(date)
                .build();

        conditionRepository.save(condition);
    }

    @Override
    public void modifyCondition(String uid, ConditionRequestDto requestDto) {
        User user = common.getUserByUid(uid);
        LocalDate date = common.convertDateType(requestDto.getDate());

        Condition condition = conditionRepository.findByUserAndDate(user, date)
                .orElseThrow(() -> new ErrorException(ConditionErrorCode.CONDITION_NOT_FOUND));

        condition.setCondition(requestDto.getCondition());
        conditionRepository.save(condition);
    }

    @Override
    public ConditionResponseDto getConditionByDay(String uid, String day) {
        User user = common.getUserByUid(uid);
        LocalDate date = common.convertDateType(day);

        Condition condition = conditionRepository.findByUserAndDate(user, date)
                .orElse(null);

        return ConditionResponseDto.builder()
                .condition(condition != null ? condition.getCondition() : -1)
                .build();
    }

    @Override
    public Map<String, Integer> getAllCondtionByMonth(String uid, String month) {
        User user = common.getUserByUid(uid);
        LocalDate startDate = common.convertDateType(month + "-01");
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

        Map<String, Integer> responseDto = new HashMap<>();

        List<Condition> conditions = conditionRepository.findAllByUserAndDateBetween(user, startDate, endDate);

        for (Condition condition : conditions) {
            String day = String.valueOf(condition.getDate().getDayOfMonth());
            responseDto.put(day, condition.getCondition());
        }

        return responseDto;
    }
}
