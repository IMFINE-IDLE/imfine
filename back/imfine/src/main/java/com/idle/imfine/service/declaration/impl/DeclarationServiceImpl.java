package com.idle.imfine.service.declaration.impl;

import com.idle.imfine.data.dto.declaration.request.RequestDeclarationDto;
import com.idle.imfine.data.entity.Declaration;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.bamboo.Bamboo;
import com.idle.imfine.data.entity.comment.Comment;
import com.idle.imfine.data.entity.leaf.Leaf;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.repository.bamboo.BambooRepository;
import com.idle.imfine.data.repository.comment.CommentRepository;
import com.idle.imfine.data.repository.declaration.DeclarationRepository;
import com.idle.imfine.data.repository.diary.DiaryRepository;
import com.idle.imfine.data.repository.leaf.LeafRepository;
import com.idle.imfine.data.repository.paper.PaperRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.errors.code.BambooErrorCode;
import com.idle.imfine.errors.code.CommentErrorCode;
import com.idle.imfine.errors.code.DeclarationErrorCode;
import com.idle.imfine.errors.code.DiaryErrorCode;
import com.idle.imfine.errors.code.PaperErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.declaration.DeclarationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class DeclarationServiceImpl implements DeclarationService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DeclarationServiceImpl.class);
    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;
    private final PaperRepository paperRepository;
    private final CommentRepository commentRepository;
    private final BambooRepository bambooRepository;
    private final LeafRepository leafRepository;
    private final DeclarationRepository declarationRepository;

    public void saveDiaryReport(RequestDeclarationDto requestDeclaration) {
        User user = userRepository.getByUid(requestDeclaration.getSenderId());
        Diary diary = diaryRepository.findById(requestDeclaration.getContentsId()).orElseThrow(() -> new ErrorException(DiaryErrorCode.DIARY_NOT_FOUND));

        if (declarationRepository.existsByContentsCodeIdAndContentsIdAndSenderIdAndType(1,
                requestDeclaration.getContentsId(), user.getId(), requestDeclaration.getType())) {
            throw new ErrorException(DeclarationErrorCode.REPORT_CONFLICT);
        }

        Declaration declaration = Declaration.builder()
                .contentsCodeId(1)
                .contentsId(requestDeclaration.getContentsId())
                .senderId(user.getId())
                .receiverId(diary.getWriter().getId())
                .type(requestDeclaration.getType())
                .build();
        diary.setDeclarationCount(diary.getDeclarationCount() + 1);
        declarationRepository.save(declaration);
        LOGGER.info("일기장 신고 등록 {}", declaration);
    }

    public void savePaperReport(RequestDeclarationDto requestDeclaration) {
        User user = userRepository.getByUid(requestDeclaration.getSenderId());
        Paper paper = paperRepository.findById(requestDeclaration.getContentsId()).orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));

        if (declarationRepository.existsByContentsCodeIdAndContentsIdAndSenderIdAndType(2,
                requestDeclaration.getContentsId(), user.getId(), requestDeclaration.getType())) {
            throw new ErrorException(DeclarationErrorCode.REPORT_CONFLICT);
        }

        Declaration declaration = Declaration.builder()
                .contentsCodeId(2)
                .contentsId(requestDeclaration.getContentsId())
                .senderId(user.getId())
                .receiverId(paper.getDiary().getWriter().getId())
                .type(requestDeclaration.getType())
                .build();

        paper.setDeclarationCount(paper.getDeclarationCount() + 1);
        declarationRepository.save(declaration);
        LOGGER.info("일기 신고 등록 {}", declaration);
    }

    public void saveCommentReport(RequestDeclarationDto requestDeclaration) {
        User user = userRepository.getByUid(requestDeclaration.getSenderId());
        Comment comment = commentRepository.findById(requestDeclaration.getContentsId()).orElseThrow(() -> new ErrorException(CommentErrorCode.COMMENT_NOT_FOUND));

        if (declarationRepository.existsByContentsCodeIdAndContentsIdAndSenderIdAndType(3,
                requestDeclaration.getContentsId(), user.getId(), requestDeclaration.getType())) {
            throw new ErrorException(DeclarationErrorCode.REPORT_CONFLICT);
        }

        Declaration declaration = Declaration.builder()
                .contentsCodeId(3)
                .contentsId(requestDeclaration.getContentsId())
                .senderId(user.getId())
                .receiverId(comment.getWriter().getId())
                .type(requestDeclaration.getType())
                .build();

        comment.setDeclarationCount(comment.getDeclarationCount() + 1);
        declarationRepository.save(declaration);
        LOGGER.info("댓글 신고 등록 {}", declaration);
    }

    public void saveBambooReport(RequestDeclarationDto requestDeclaration) {
        User user = userRepository.getByUid(requestDeclaration.getSenderId());
        Bamboo bamboo = bambooRepository.findById(requestDeclaration.getContentsId()).orElseThrow(() -> new ErrorException(BambooErrorCode.BAMBOO_NOT_FOUND));

        if (declarationRepository.existsByContentsCodeIdAndContentsIdAndSenderIdAndType(4,
                requestDeclaration.getContentsId(), user.getId(), requestDeclaration.getType())) {
            throw new ErrorException(DeclarationErrorCode.REPORT_CONFLICT);
        }

        Declaration declaration = Declaration.builder()
                .contentsCodeId(4)
                .contentsId(requestDeclaration.getContentsId())
                .senderId(user.getId())
                .receiverId(bamboo.getWriter().getId())
                .type(requestDeclaration.getType())
                .build();

        bamboo.setDeclarationCount(bamboo.getDeclarationCount() + 1);
        declarationRepository.save(declaration);
        LOGGER.info("대나무 신고 등록 {}", declaration);
    }

    public void saveLeafReport(RequestDeclarationDto requestDeclaration) {
        User user = userRepository.getByUid(requestDeclaration.getSenderId());
        Leaf leaf = leafRepository.getById(requestDeclaration.getContentsId());

        if (declarationRepository.existsByContentsCodeIdAndContentsIdAndSenderIdAndType(5,
                requestDeclaration.getContentsId(), user.getId(), requestDeclaration.getType())) {
            throw new ErrorException(DeclarationErrorCode.REPORT_CONFLICT);
        }

        Declaration declaration = Declaration.builder()
                .contentsCodeId(5)
                .contentsId(requestDeclaration.getContentsId())
                .senderId(user.getId())
                .receiverId(leaf.getWriter().getId())
                .type(requestDeclaration.getType())
                .build();

        leaf.setDeclarationCount(leaf.getDeclarationCount() + 1);
        declarationRepository.save(declaration);
        LOGGER.info("대나무잎 신고 등록 {}", declaration);
    }
}
