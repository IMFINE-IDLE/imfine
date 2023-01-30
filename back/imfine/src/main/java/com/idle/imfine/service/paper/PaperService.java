package com.idle.imfine.service.paper;

import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;

public interface PaperService {
    CommonResponseMessage save(RequestPaperPostDto requestPaperPostDto, String uid);
}
