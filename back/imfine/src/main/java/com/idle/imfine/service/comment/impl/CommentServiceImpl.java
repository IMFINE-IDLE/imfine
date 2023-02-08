package com.idle.imfine.service.comment.impl;

import com.idle.imfine.data.dto.comment.request.RequestContentRegistraitionDto;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.entity.Heart;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.comment.Comment;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.repository.comment.CommentRepository;
import com.idle.imfine.data.repository.heart.HeartRepository;
import com.idle.imfine.data.repository.paper.PaperRepository;
import com.idle.imfine.errors.code.CommentErrorCode;
import com.idle.imfine.errors.code.HeartErrorCode;
import com.idle.imfine.errors.code.PaperErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.comment.CommentService;
import com.idle.imfine.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PaperRepository paperRepository;
    private final Common common;
    private final HeartRepository heartRepository;
    private final NotificationService notificationService;

    @Override
    @Transactional
    public void save(RequestContentRegistraitionDto requestContentRegistraitionDto, String uid) {
        User user = common.getUserByUid(uid);
        Paper paper = paperRepository.findById(requestContentRegistraitionDto.getPaperId())
                .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));

        commentRepository.save(Comment.builder()
                        .content(requestContentRegistraitionDto.getContent())
                        .writer(user)
                        .paperId(requestContentRegistraitionDto.getPaperId())
                .build());
        paper.setCommentCount(paper.getCommentCount() + 1);
        paperRepository.save(paper);
        notificationService.send(user.getId(), paper.getDiary().getWriter().getId(), 2,
                paper.getId(), 2);
    }

    @Override
    @Transactional
    public void delete(long commentId, String uid) {
        User user = common.getUserByUid(uid);
        Comment comment = commentRepository.getById(commentId);
        Paper paper = paperRepository.findById(comment.getPaperId())
                .orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));

        if (comment.getWriter().getId() != user.getId()){
            throw new ErrorException(CommentErrorCode.COMMENT_ACCESS_DENIED);
        }

        commentRepository.delete(comment);
        paper.setCommentCount(paper.getCommentCount() - 1);
        paperRepository.save(paper);
    }

    @Override
    @Transactional
    public void postCommentLike(RequestHeartDto requestHeartDto, String uid) {
        User user = common.getUserByUid(uid);

        Comment comment = commentRepository.getById(requestHeartDto.getContentId());
        //에러처리 똑바로
        if (heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 3, requestHeartDto.getContentId())) {
            throw new ErrorException(HeartErrorCode.HEART_DELETE_CONFLICT);
        }
        heartRepository.save(Heart.builder()
                .senderId(user.getId())
                .contentsCodeId(3)
                .contentsId(requestHeartDto.getContentId())
                .build());
        comment.setLikeCount(comment.getLikeCount() + 1);
        commentRepository.save(comment);
        notificationService.send(user.getId(), comment.getWriter().getId(), 3, comment.getId(),
                3);
    }

    @Override
    @Transactional
    public void deleteCommentLike(RequestHeartDto requestHeartDto, String uid) {
        User user = common.getUserByUid(uid);

        Comment comment = commentRepository.getById(requestHeartDto.getContentId());
        //에러처리 똑바로
        if (!heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), requestHeartDto.getContentCodeId(),
            requestHeartDto.getContentId())) {
            throw new ErrorException(HeartErrorCode.HEART_NOT_FOUND);
        }
        heartRepository.deleteBySenderIdAndContentsCodeIdAndContentsId(user.getId(),
            requestHeartDto.getContentCodeId(), requestHeartDto.getContentId());
        comment.setLikeCount(comment.getLikeCount() - 1);

    }
}
