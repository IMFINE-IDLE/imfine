package com.idle.imfine.service.bamboo.impl;

import com.idle.imfine.data.dto.bamboo.response.ResponseBamboo;
import com.idle.imfine.data.dto.bamboo.response.ResponseBambooDetailDto;
import com.idle.imfine.data.dto.leaf.response.ResponseLeafDto;
import com.idle.imfine.data.entity.Heart;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.bamboo.Bamboo;
import com.idle.imfine.data.entity.leaf.Leaf;
import com.idle.imfine.data.repository.bamboo.BambooRepository;
import com.idle.imfine.data.repository.leaf.LeafRepository;
import com.idle.imfine.data.repository.heart.HeartRepository;
import com.idle.imfine.data.repository.user.UserRepository;
import com.idle.imfine.errors.code.BambooErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.bamboo.BambooService;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Transactional
@Service
public class BambooServiceImpl implements BambooService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BambooServiceImpl.class);
    private final BambooRepository bambooRepository;
    private final UserRepository userRepository;
    private final HeartRepository heartRepository;
    private final LeafRepository leafRepository;

    @Override
    public void save(String content, String uid) {

        User user = userRepository.getByUid(uid);

        Bamboo bamboo = Bamboo.builder()
                .content(content)
                .writer(user)
                .likeCount(0)
                .declarationCount(0)
                .leafCount(0)
                .deleteAt(LocalDateTime.now().plusWeeks(1))
                .build();
        Bamboo savedBamboo = bambooRepository.save(bamboo);
        System.out.println(savedBamboo.getId());
    }

    @Override
    public List<ResponseBamboo> showList(String filter, Pageable pageable) {

        LocalDateTime start = LocalDateTime.now().minusDays(1);
        LocalDateTime end = LocalDateTime.now();

        List<ResponseBamboo> responseBambooList = new ArrayList<>();
        Page<Bamboo> all = null;

        if (filter.equals("popular")) {
            all = bambooRepository.findByCreatedAtBetweenOrderByLikeCountDesc(start, end, pageable);
        } else if (filter.equals("oldest")) {
            all = bambooRepository.findByCreatedAtBetweenOrderByCreatedAtAsc(start, end, pageable);
        } else {
            all = bambooRepository.findByCreatedAtBetweenOrderByCreatedAtDesc(start, end, pageable);
        }

        for(Bamboo b : all) {
            Duration duration = Duration.between(b.getCreatedAt(), end);
            ResponseBamboo responseBamboo = ResponseBamboo.builder()
                    .bambooId(b.getId())
                    .content(b.getContent())
                    .remainTime(24 - duration.toHours())
                    .likeCount(b.getLikeCount())
                    .leafCount(b.getLeafCount())
                    .build();
            responseBambooList.add(responseBamboo);
        }

        return responseBambooList;
    }

    @Override
    public List<ResponseBamboo> showMyList(String filter, String uid, Pageable pageable) {

        User user = userRepository.getByUid(uid);
        List<ResponseBamboo> responseBambooList = new ArrayList<>();

        LocalDateTime start = LocalDateTime.now().minusDays(1);
        LocalDateTime end = LocalDateTime.now();

        if(filter.equals("write")) {
            Page<Bamboo> all = bambooRepository.findByWriter_IdAndCreatedAtBetween(user.getId(), start, end, pageable);
//            Page<Bamboo> all = bambooRepository.findByWriterAndCreatedAtBetween(user.getId(), start, end, pageable);

            for(Bamboo b : all) {
                Duration duration = Duration.between(b.getCreatedAt(), end);

                ResponseBamboo responseBamboo = ResponseBamboo.builder()
                        .bambooId(b.getId())
                        .content(b.getContent())
                        .remainTime(24 - duration.toHours())
                        .likeCount(b.getLikeCount())
                        .leafCount(b.getLeafCount())
                        .build();
                responseBambooList.add(responseBamboo);
            }
        } else if(filter.equals("comment")) {
            Set<Long> bambooSet = new HashSet<>();
            Page<Leaf> all = leafRepository.getByWriter_IdAndCreatedAtBetween(user.getId(), start, end, pageable);

            for(Leaf b : all) {
                if (bambooSet.contains(b.getBamboo().getId())) {
                    continue;
                }
                bambooSet.add(b.getBamboo().getId());
                Duration duration = Duration.between(b.getCreatedAt(), end);
                ResponseBamboo responseBamboo = ResponseBamboo.builder()
                    .bambooId(b.getBamboo().getId())
                    .content(b.getBamboo().getContent())
                    .remainTime(24 - duration.toHours())
                    .likeCount(b.getBamboo().getLikeCount())
                    .leafCount(b.getBamboo().getLeafCount())
                    .build();
                responseBambooList.add(responseBamboo);
            }
        } else if(filter.equals("like")) {
            Page<Bamboo> all = bambooRepository.findByHeart(user.getId(), start, end, pageable);
            for(Bamboo b : all) {
                Duration duration = Duration.between(b.getCreatedAt(), end);

                ResponseBamboo responseBamboo = ResponseBamboo.builder()
                        .bambooId(b.getId())
                        .content(b.getContent())
                        .remainTime(24 - duration.toHours())
                        .likeCount(b.getLikeCount())
                        .leafCount(b.getLeafCount())
                        .build();
                responseBambooList.add(responseBamboo);
            }
        }

        return responseBambooList;
    }

    @Override
    public ResponseBambooDetailDto showBambooDetail(long bambooId, String uid) {

        Bamboo bamboo = bambooRepository.getById(bambooId);
        LocalDateTime endShowTime = bamboo.getCreatedAt().plusDays(1);
        if (LocalDateTime.now().isBefore(endShowTime)) {
            LOGGER.info("24시간 지난 밤부-----------------------------------------------------");
            throw new ErrorException(BambooErrorCode.BAMBOO_NOT_FOUND);
        }

        LOGGER.info("대나무 상세조회");
        List<ResponseLeafDto> responseLeafDtoList = new ArrayList<>();
        List<Leaf> leafList = leafRepository.getByBamboo_Id(bambooId);
        for (Leaf l : leafList) {
            ResponseLeafDto responseLeafDto = ResponseLeafDto.builder()
                .leafId(l.getId())
                .content(l.getContent())
                .likeCount(l.getLikeCount())
                .declarationCount(l.getDeclarationCount())
                .createDate(l.getCreatedAt())
                .build();
            responseLeafDtoList.add(responseLeafDto);
        }

        ResponseBambooDetailDto responseBambooDetailDto = ResponseBambooDetailDto.builder()
            .bambooId(bambooId)
            .content(bamboo.getContent())
            .createdDate(bamboo.getCreatedAt())
            .likeCount(bamboo.getLikeCount())
            .leafCount(bamboo.getLeafCount())
            .leaf(responseLeafDtoList)
            .build();

        return responseBambooDetailDto;
    }

    @Override
    @Transactional
    public void likeBamboo(long bambooId, String uid) {

        User user = userRepository.getByUid(uid);
        Bamboo bamboo = bambooRepository.getById(bambooId);

        LocalDateTime endShowTime = bamboo.getCreatedAt().plusDays(1);
        if (LocalDateTime.now().isBefore(endShowTime)) {
            throw new ErrorException(BambooErrorCode.BAMBOO_NOT_FOUND);
        }

        if(!heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 4, bambooId)) {
            Heart heart = Heart.builder()
                    .senderId(user.getId())
                    .contentsCodeId(4)
                    .contentsId(bambooId)
                    .build();

            heartRepository.save(heart);
            bamboo.setLikeCount(bamboo.getLikeCount() + 1);
            bambooRepository.save(bamboo);
        }
    }

    @Override
    public void deleteLikeBamboo(long bambooId, String uid) {
        User user = userRepository.getByUid(uid);
        Bamboo bamboo = bambooRepository.getById(bambooId);

        LocalDateTime endShowTime = bamboo.getCreatedAt().plusDays(1);
        if (LocalDateTime.now().isBefore(endShowTime)) {
            throw new ErrorException(BambooErrorCode.BAMBOO_NOT_FOUND);
        }

        if(heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 4, bambooId)) {
            heartRepository.deleteBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 4, bambooId);
            bamboo.setLikeCount(bamboo.getLikeCount() - 1);
            bambooRepository.save(bamboo);
        }
    }

    @Override
//    @Scheduled(cron="* /5 * * * *")
    public void deleteBamboo() {
        LOGGER.info("Delete 수행");
        List<Bamboo> bamboos = bambooRepository.findByDeleteAtBefore(LocalDateTime.now());
        leafRepository.deleteLeavesBy(bamboos);
        bambooRepository.deleteByDeleteAtBefore(LocalDateTime.now());
    }
}
