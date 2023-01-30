package com.idle.imfine.service.paper;

import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;

public interface PaperService {
    void save(RequestPaperPostDto requestPaperPostDto, String uid);
}
