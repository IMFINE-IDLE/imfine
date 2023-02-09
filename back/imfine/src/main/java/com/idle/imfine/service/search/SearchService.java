package com.idle.imfine.service.search;

import com.idle.imfine.data.dto.diary.response.ResponseDiaryListDto;
import com.idle.imfine.data.dto.paper.response.ResponseMainPage;
import com.idle.imfine.data.dto.user.response.SearchUserListResponseDto;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface SearchService {
    void showMySearchList();
    List<ResponseDiaryListDto> showDiarySearchList(String query, String uid, Pageable pageable);
    List<SearchUserListResponseDto> showUserSearchList(String query, String uid, Pageable pageable);
    ResponseMainPage showPaperSearchList(String query, String uid, Pageable pageable);
}
