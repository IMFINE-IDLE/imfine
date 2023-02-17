package com.idle.imfine.service.search.impl;

import static com.idle.imfine.service.diary.impl.DiaryServiceImpl.getResponseDiaryList;

import com.idle.imfine.data.dto.diary.response.ResponseDiaryListDto;
import com.idle.imfine.data.dto.paper.response.ResponseMainPage;
import com.idle.imfine.data.dto.paper.response.ResponsePaperDtoOnlyMainPage;
import com.idle.imfine.data.dto.paper.response.ResponsePaperSymptomRecordDtoOnlyMainPage;
import com.idle.imfine.data.dto.search.request.RequestSearchDto;
import com.idle.imfine.data.dto.search.response.ResponseMySearchList;
import com.idle.imfine.data.dto.user.response.SearchUserListResponseDto;
import com.idle.imfine.data.entity.Condition;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.Search;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.paper.PaperHasSymptom;
import com.idle.imfine.data.entity.symptom.Symptom;
import com.idle.imfine.data.repository.diary.DiaryRepository;
import com.idle.imfine.data.repository.diary.SubscribeRepository;
import com.idle.imfine.data.repository.image.ImageRepository;
import com.idle.imfine.data.repository.paper.PaperHasSymptomRepository;
import com.idle.imfine.data.repository.paper.PaperRepository;
import com.idle.imfine.data.repository.search.SearchRepository;
import com.idle.imfine.data.repository.symptom.SymptomRepository;
import com.idle.imfine.data.repository.user.ConditionRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.service.Common;
import com.idle.imfine.service.search.SearchService;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class SearchServiceImpl implements SearchService {

    private final Logger LOGGER = LoggerFactory.getLogger(SearchService.class);
    private final DiaryRepository diaryRepository;
    private final SubscribeRepository subscribeRepository;
    private final UserRepository userRepository;
    private final PaperRepository paperRepository;
    private final Common common;
    private final ConditionRepository conditionRepository;
    private final PaperHasSymptomRepository paperHasSymptomRepository;
    private final ImageRepository imageRepository;
    private final SymptomRepository symptomRepository;
    private final SearchRepository searchRepository;
    @Override
    public void save(RequestSearchDto requestSearchDto) {
        LOGGER.info("검색기록 저장 {}", requestSearchDto.getQuery());
        User user = common.getUserByUid(requestSearchDto.getSearcherId());

        Search search = Search.builder()
                .searcherId(user.getId())
                .query(requestSearchDto.getQuery())
                .build();

        searchRepository.save(search);
    }
    @Override
    public List<ResponseMySearchList> showMySearhList(String uid) {
        User user = common.getUserByUid(uid);
        List<Search> searches = searchRepository.findBySearcherIdOrderByCreatedAtDesc(user.getId());
        List<ResponseMySearchList> searchList = new ArrayList<>();
        for (Search s : searches) {
            ResponseMySearchList responseMySearchList = ResponseMySearchList.builder()
                    .searchId(s.getId())
                    .query(s.getQuery())
                    .build();
            searchList.add(responseMySearchList);
        }
        return searchList;
    }

    @Override
    public void deleteMySearch(long id, String uid) {
        LOGGER.info("내 검색 기록 삭제");
        User user = common.getUserByUid(uid);
        searchRepository.deleteByIdAndAndSearcherId(id, user.getId());
    }
    @Override
    public List<ResponseDiaryListDto> showDiarySearchList(String query, String uid, Pageable pageable) {
        User user = common.getUserByUid(uid);
        Slice<Diary> diaries = diaryRepository.findByTitleContainingIgnoreCaseAndOpenTrueOrderByCreatedAtDesc(query, pageable);
        Set<Long> subscribeDiaryIds = subscribeRepository.getDiaryIdsByDiaries(diaries.getContent(), user.getId());

        return getResponseDiaryList(user, diaries, subscribeDiaryIds);
    }

    @Override
    public List<SearchUserListResponseDto> showUserSearchList(String query, String uid, Pageable pageable) {
        User user = common.getUserByUid(uid);
        Slice<User> users = userRepository.findByNameContainingIgnoreCase(query, pageable);
        List<SearchUserListResponseDto> userList = new ArrayList<>();
        for (User u : users) {
            int relation = common.getFollowRelation(user, u);
            int condition = common.getTodayUserCondition(u);

            SearchUserListResponseDto responseDto = SearchUserListResponseDto.builder()
                    .id(u.getId())
                    .uid(u.getUid())
                    .name(u.getName())
                    .relation(relation)
                    .condition(condition)
                    .hasNext(users.hasNext())
                    .open(u.isOpen())
                    .build();
            userList.add(responseDto);
        }
        return userList;
    }

    @Override
    public ResponseMainPage showPaperSearchList(String query, String uid, Pageable pageable) {
        User user = common.getUserByUid(uid);
        Slice<Paper> papers = paperRepository.findByContentContainingIgnoreCaseAndOpenTrueOrderByCreatedAtDesc(query, pageable);
        List<Paper> paperList = papers.getContent();
        Set<Long> myHeartPapers = paperRepository.findHeartPaperByUserIdAAndDiaryIn(user.getId(),
                paperList);
        List<Condition> papersCondition = conditionRepository.findPaperConditionByPapersList(
                paperList);

        Map<Long, List<PaperHasSymptom>> map = paperHasSymptomRepository.findPaperHasSymptomByPaperInMap(
                        paperList).stream()
                .collect(Collectors.groupingBy(
                        o -> ((Long) o[0]),
                        Collectors.mapping(o -> (PaperHasSymptom) o[1], Collectors.toList())
                ));
        Set<Long> imageHasPaper = imageRepository.existsByPaperIds(paperList);
        List<Symptom> symptoms = symptomRepository.getSymptomByPapers(paperList);

        Map<Integer, Symptom> symptomIdByName = symptoms.stream().collect(Collectors.toMap(Symptom::getId, Function.identity()));


        return ResponseMainPage.builder()
                .hasNext(papers.hasNext())
                .list(papers.stream().map(
                        paper -> {
                            Diary diary = paper.getDiary();
                            return ResponsePaperDtoOnlyMainPage.builder()
                                    .diaryId(diary.getId())
                                    .title(diary.getTitle())
                                    .content(paper.getContent())
                                    .paperId(paper.getId())
                                    .medicalName(diary.getMedicalCode().getName())
                                    .uid(diary.getWriter().getUid())
                                    .commentCount(paper.getCommentCount())
                                    .likeCount(paper.getLikeCount())
                                    .name(paper.getDiary().getWriter().getName())
                                    .myHeart(myHeartPapers.contains(paper.getId()))
                                    .date(paper.getDate())
                                    .createdAt(common.convertDateAllType(paper.getCreatedAt()))
                                    .open(paper.isOpen())
                                    .condition(common.getDateUserCondition(paper.getDate(), diary.getWriter()))
                                    .image(imageHasPaper.contains(paper.getId()))
                                    .hasNext(papers.hasNext())
                                    .symptomList(
                                            map.containsKey(paper.getId()) ? map.get(paper.getId()).stream().map(
                                                    paperHasSymptom ->
                                                            ResponsePaperSymptomRecordDtoOnlyMainPage.builder()
                                                                    .symptomId(paperHasSymptom.getSymptomId())
                                                                    .symptomName(symptomIdByName.get(paperHasSymptom.getSymptomId()).getName())
                                                                    .score(paperHasSymptom.getScore())
                                                                    .build()

                                            ).collect(Collectors.toList()) :
                                                    new ArrayList<>())
                                    .build();
                        }
                ).collect(Collectors.toList()))
                .build();
    }
}
