package com.idle.imfine.service.comment.impl;

import com.idle.imfine.data.dto.comment.request.RequestContentRegistraitionDto;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.entity.Heart;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.comment.Comment;
import com.idle.imfine.data.repository.comment.CommentRepository;
import com.idle.imfine.data.repository.heart.HeartRepository;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.comment.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final Common common;
    private final HeartRepository heartRepository;

    @Override
    @Transactional
    public void save(RequestContentRegistraitionDto requestContentRegistraitionDto, String uid) {
        User user = common.getUserByUid(uid);
        commentRepository.save(Comment.builder()
                        .content(requestContentRegistraitionDto.getContent())
                        .writer(user)
                        .paperId(requestContentRegistraitionDto.getPaperId())
                .build());
    }

    @Override
    @Transactional
    public void delete(long commentId, String uid) {
        User user = common.getUserByUid(uid);
        Comment comment = commentRepository.getById(commentId);
        if (comment.getWriter().getId() == user.getId()){
            commentRepository.delete(comment);
        }
        /// 에러처리
    }

    @Override
    @Transactional
    public void postCommentLike(RequestHeartDto requestHeartDto, String uid) {
        User user = common.getUserByUid(uid);

        Comment comment = commentRepository.getById(requestHeartDto.getContentId());
        //에러처리 똑바로
        if (!heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 3, requestHeartDto.getContentId())) {
//            throw new RuntimeException("");
            heartRepository.save(Heart.builder()
                    .senderId(user.getId())
                    .contentsCodeId(3)
                    .contentsId(requestHeartDto.getContentId())
                    .build());
            comment.setLikeCount(comment.getLikeCount() + 1);
        }


    }

    @Override
    @Transactional
    public void deleteCommentLike(RequestHeartDto requestHeartDto, String uid) {
        User user = common.getUserByUid(uid);

        Comment comment = commentRepository.getById(requestHeartDto.getContentId());
        //에러처리 똑바로
        if (heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), requestHeartDto.getContentCodeId(),
            requestHeartDto.getContentId())) {
            heartRepository.deleteBySenderIdAndContentsCodeIdAndContentsId(user.getId(),
                requestHeartDto.getContentCodeId(), requestHeartDto.getContentId());
            comment.setLikeCount(comment.getLikeCount() - 1);
        }

    }
}
