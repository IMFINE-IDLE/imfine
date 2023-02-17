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
        LOGGER.info("[createCondition] 유저 조회 완료");
        LocalDate date = common.convertDateType(requestDto.getDate());

        if (conditionRepository.existsByUserAndDate(user, date)) {
            LOGGER.info("[createCondition] 이미 컨디션을 설정했습니다.");
            throw new ErrorException(ConditionErrorCode.CONDITION_ALREADY_EXIST);
        }

        Condition condition = Condition.builder()
                .user(user)
                .condition(requestDto.getCondition())
                .date(date)
                .build();

        conditionRepository.save(condition);
        LOGGER.info("[createCondition] 컨디션을 저장했습니다.");
    }

    @Override
    public void modifyCondition(String uid, ConditionRequestDto requestDto) {
        User user = common.getUserByUid(uid);
        LOGGER.info("[modifyCondition] 유저 조회 완료.");
        LocalDate date = common.convertDateType(requestDto.getDate());

        Condition condition = conditionRepository.findByUserAndDate(user, date)
                .orElseThrow(() -> new ErrorException(ConditionErrorCode.CONDITION_NOT_FOUND));

        condition.setCondition(requestDto.getCondition());
        conditionRepository.save(condition);
        LOGGER.info("[modifyCondition] 컨디션 수정 완료.");
    }

    @Override
    public ConditionResponseDto getConditionByDay(String uid, String day) {
        User user = common.getUserByUid(uid);
        LOGGER.info("[getConditionByDay] 유저 조회 완료.");
        LocalDate date = common.convertDateType(day);

        Condition condition = conditionRepository.findByUserAndDate(user, date)
                .orElse(null);

        LOGGER.info("[getConditionByDay] 컨디션 조회 완료.");

        return ConditionResponseDto.builder()
                .condition(condition != null ? condition.getCondition() : -1)
                .build();
    }

    @Override
    public Map<String, String> getAllCondtionByMonth(String uid, String month) {
        User user = common.getUserByUid(uid);
        LOGGER.info("[getAllCondtionByMonth] 유저 조회 완료.");

        LocalDate startDate = common.convertDateType(month + "-01");
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

        Map<String, String> responseDto = new HashMap<>();
        List<Condition> conditions = conditionRepository.findAllByUserAndDateBetween(user, startDate, endDate);

        for (Condition condition : conditions) {
            String day = String.valueOf(condition.getDate().getDayOfMonth());
            String con = String.valueOf(condition.getCondition());
            responseDto.put(day, con);
        }
        LOGGER.info("[getAllCondtionByMonth] {} ~ {} 컨디션 목록 조회 완료.", startDate, endDate);

        return responseDto;
    }
}
