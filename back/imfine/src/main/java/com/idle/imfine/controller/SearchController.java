package com.idle.imfine.controller;

import com.idle.imfine.common.annotation.LoginUser;
import com.idle.imfine.common.response.ResponseService;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.data.dto.diary.response.ResponseDiaryListDto;
import com.idle.imfine.data.dto.paper.response.ResponseMainPage;
import com.idle.imfine.data.dto.user.response.SearchUserListResponseDto;
import com.idle.imfine.service.search.SearchService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SearchController.class);
    private final ResponseService responseService;
    private final SearchService searchService;

    @PostMapping
    public ResponseEntity<Result> postSearch() {

        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }
    @GetMapping("/list")
    public ResponseEntity<Result> getSearchResultList(@RequestParam("where") String where, @RequestParam("query") String query,
            @LoginUser String uid, Pageable pageable) {
        LOGGER.info("검색 리스트 {} {}", where, query);

        if (where.equals("diary")) {
            List<ResponseDiaryListDto> responseDiaryListDtos = searchService.showDiarySearchList(query, uid, pageable);
            return ResponseEntity.ok()
                    .body(responseService.getListResult(responseDiaryListDtos));
        } else if (where.equals("paper")) {
            ResponseMainPage responseDto = searchService.showPaperSearchList(query, uid, pageable);
            return ResponseEntity.ok()
                    .body(responseService.getSingleResult(responseDto));
        } else if (where.equals("user")) {
            List<SearchUserListResponseDto> searchUserListResponseDtos = searchService.showUserSearchList(query, uid, pageable);
            return ResponseEntity.ok()
                    .body(responseService.getListResult(searchUserListResponseDtos));
        }

        return ResponseEntity.ok()
                .body(responseService.getSuccessResult());
    }
}
