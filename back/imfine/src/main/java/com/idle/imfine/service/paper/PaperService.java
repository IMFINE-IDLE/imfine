package com.idle.imfine.service.paper;

import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPutDto;

public interface PaperService {
    void save(RequestPaperPostDto requestPaperPostDto, String uid);
    void delete(long paperId, String uid);

    void modifyPaper(RequestPaperPutDto requestPaperPutDto, String uid);
}
