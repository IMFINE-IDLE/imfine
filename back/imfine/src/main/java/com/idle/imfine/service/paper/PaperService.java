package com.idle.imfine.service.paper;

import com.idle.imfine.common.CommonResponseMessage;
import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;
import org.springframework.web.bind.annotation.RequestBody;

public interface PaperService {
    CommonResponseMessage save(RequestPaperPostDto requestPaperPostDto, String uid);
}
