package com.idle.imfine.service.paper.impl;


import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.repository.diary.DiaryRepository;
import com.idle.imfine.data.repository.paper.PaperRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.service.paper.PaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PaperServiceImpl implements PaperService {
    private final PaperRepository paperRepository;
    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;

    @Override
    @Transactional
    public CommonResponseMessage save(RequestPaperPostDto requestPaperPostDto, String uid) {
        User user = userRepository.getByUid(uid);
        Diary diary = diaryRepository.getById(requestPaperPostDto.getDiaryId());

        if (diary.getWriter().getId() != user.getId()){
            return CommonResponseMessage.builder()
                    .success(false)
                    .status(-1)
                    .message("잘못된 유저 접근입니다.")
                    .build();
        }

        paperRepository.save(Paper.builder()
                .diary(diary)
                .content(requestPaperPostDto.getContents())
                .open(requestPaperPostDto.isOpen())
                .build());

        return CommonResponseMessage.builder()
                .success(true)
                .status(200)
                .message("성공적으로 등록되었습니다.")
                .build();
    }
}
