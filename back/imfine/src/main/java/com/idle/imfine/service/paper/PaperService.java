package com.idle.imfine.service.paper;

import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
import com.idle.imfine.data.dto.notification.response.ResponseNotificationPost;
import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPutDto;
import com.idle.imfine.data.dto.paper.response.ResponseMainPage;
import com.idle.imfine.data.dto.paper.response.ResponseModifyPaperDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDetailDto;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDto;
import java.io.IOException;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface PaperService {
    long save(RequestPaperPostDto requestPaperPostDto, String uid) throws IOException;
    void delete(long paperId, String uid);

    List<String> modifyPaper(RequestPaperPutDto requestPaperPutDto, String uid) throws IOException;

    ResponseNotificationPost postPaperLike(RequestHeartDto requestLikeDto, String uid);

    void deletePaperLike(RequestHeartDto build, String uid);

    ResponsePaperDetailDto getPaperDetail(long paperId, String uid);

    ResponseMainPage getPaperList(String uid, Pageable pageable);

    List<ResponsePaperDto> getAllPaperByDate(String uid, String date);

    ResponseModifyPaperDto getModifyPaper(String uid, long paperId);
}
