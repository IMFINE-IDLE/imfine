package com.idle.imfine.service.bamboo.impl;

import com.idle.imfine.data.dto.bamboo.request.RequestBambooDto;
import com.idle.imfine.data.dto.bamboo.response.ResponseBamboo;
import com.idle.imfine.data.dto.bamboo.response.ResponseBambooDetailDto;
import com.idle.imfine.data.dto.heart.request.RequestHeartDto;
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
import com.idle.imfine.service.notification.NotificationService;
import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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
    private final NotificationService notificationService;

    @Override
    public void save(RequestBambooDto requestBamboo) {

        User user = userRepository.getByUid(requestBamboo.getWriterId());

        Bamboo bamboo = Bamboo.builder()
                .content(requestBamboo.getContent())
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
    public List<ResponseBamboo> showList(String filter, String uid, Pageable pageable) {

        LocalDateTime start = LocalDateTime.now().minusDays(1);
        LocalDateTime end = LocalDateTime.now();

        User user = userRepository.getByUid(uid);
        List<ResponseBamboo> responseBambooList = new ArrayList<>();
        Slice<Bamboo> all = null;

        if (filter.equals("popular")) {
            all = bambooRepository.findByCreatedAtBetweenOrderByLikeCountDesc(start, end, pageable);
        } else if (filter.equals("oldest")) {
            all = bambooRepository.findByCreatedAtBetweenOrderByCreatedAtAsc(start, end, pageable);
        } else {
            all = bambooRepository.findByCreatedAtBetweenOrderByCreatedAtDesc(start, end, pageable);
        }

        List<Bamboo> heartBamboos = bambooRepository.findByHeartList(user.getId(), start, end);

        for(Bamboo b : all) {
            Duration duration = Duration.between(b.getCreatedAt(), end);

            ResponseBamboo responseBamboo = ResponseBamboo.builder()
                    .bambooId(b.getId())
                    .content(b.getContent())
                    .remainTime(24 - duration.toHours())
                    .likeCount(b.getLikeCount())
                    .leafCount(b.getLeafCount())
                    .isHeart(heartBamboos.stream().anyMatch(bamboo -> b.getId() == bamboo.getId()))
                    .hasNext(all.hasNext())
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

        Slice<Bamboo> all = null;

        if(filter.equals("write")) {
            all = bambooRepository.findByWriter_IdAndCreatedAtBetween(user.getId(), start, end, pageable);
        } else if(filter.equals("comment")) {
//            List<Leaf> leaves = leafRepository.getByWriter_IdAndCreatedAtBetween(user.getId(), start, end);
//            all = bambooRepository.findByLeaves(leaves, start, end, pageable);
            all = bambooRepository.findByLeaves(user.getId(), start, end, pageable);
        } else if(filter.equals("like")) {
            all = bambooRepository.findByHeart(user.getId(), start, end, pageable);
        }

        List<Bamboo> heartBamboos = bambooRepository.findByHeartList(user.getId(), start, end);
        for(Bamboo b : all) {
            Duration duration = Duration.between(b.getCreatedAt(), end);

            ResponseBamboo responseBamboo = ResponseBamboo.builder()
                    .bambooId(b.getId())
                    .content(b.getContent())
                    .remainTime(24 - duration.toHours())
                    .likeCount(b.getLikeCount())
                    .leafCount(b.getLeafCount())
                    .isHeart(heartBamboos.stream().anyMatch(bamboo -> b.getId() == bamboo.getId()))
                    .hasNext(all.hasNext())
                    .build();
            responseBambooList.add(responseBamboo);
        }
        return responseBambooList;
    }

    @Override
    public ResponseBambooDetailDto showBambooDetail(long bambooId, String uid) {

        Bamboo bamboo = bambooRepository.getById(bambooId);
        User user = userRepository.getByUid(uid);
        LocalDateTime endShowTime = bamboo.getCreatedAt().plusDays(1);

        if (LocalDateTime.now().isAfter(endShowTime)) {
            LOGGER.info("24시간 지난 밤부");
            throw new ErrorException(BambooErrorCode.BAMBOO_NOT_FOUND);
        }

        LOGGER.info("대나무 상세조회");
        List<ResponseLeafDto> responseLeafDtoList = new ArrayList<>();
        List<Leaf> leafList = leafRepository.getByBamboo_Id(bambooId);
        List<Leaf> heartLeafList = leafRepository.findByHeartList(user.getId());
        for (Leaf l : leafList) {
            ResponseLeafDto responseLeafDto = ResponseLeafDto.builder()
                    .leafId(l.getId())
                    .content(l.getContent())
                    .likeCount(l.getLikeCount())
                    .declarationCount(l.getDeclarationCount())
                    .isHeart(heartLeafList.stream().anyMatch(leaf -> l.getId() == leaf.getId()))
                    .createDate(l.getCreatedAt())
                    .build();
            responseLeafDtoList.add(responseLeafDto);
        }
        boolean isHeart = heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 4, bambooId);
        ResponseBambooDetailDto responseBambooDetailDto = ResponseBambooDetailDto.builder()
                .bambooId(bambooId)
                .content(bamboo.getContent())
                .createdDate(bamboo.getCreatedAt())
                .likeCount(bamboo.getLikeCount())
                .leafCount(bamboo.getLeafCount())
                .isHeart(isHeart)
                .leaf(responseLeafDtoList)
                .build();

        return responseBambooDetailDto;
    }

    @Override
    @Transactional
    public void likeBamboo(RequestHeartDto requestHeart, String uid) {

        User user = userRepository.getByUid(uid);
        Bamboo bamboo = bambooRepository.getById(requestHeart.getContentId());

        LocalDateTime endShowTime = bamboo.getCreatedAt().plusDays(1);
        if (LocalDateTime.now().isAfter(endShowTime)) {
            throw new ErrorException(BambooErrorCode.BAMBOO_NOT_FOUND);
        }

        if(!heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 4,
                bamboo.getId())) {
            Heart heart = Heart.builder()
                    .senderId(user.getId())
                    .contentsCodeId(4)
                    .contentsId(bamboo.getId())
                    .build();

            heartRepository.save(heart);
            bamboo.setLikeCount(bamboo.getLikeCount() + 1);
            bambooRepository.save(bamboo);

            Long userId = user.getId();
            Long otherId = bamboo.getWriter().getId();
            if (!userId.equals(otherId)) {
                notificationService.send(user.getId(), bamboo.getWriter().getId(), 4, bamboo.getId(), 34);
            }
        }
    }

    @Override
    public void deleteLikeBamboo(long bambooId, String uid) {
        User user = userRepository.getByUid(uid);
        Bamboo bamboo = bambooRepository.getById(bambooId);

        LocalDateTime endShowTime = bamboo.getCreatedAt().plusDays(1);
        if (LocalDateTime.now().isAfter(endShowTime)) {
            throw new ErrorException(BambooErrorCode.BAMBOO_NOT_FOUND);
        }

        if(heartRepository.existsBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 4, bambooId)) {
            heartRepository.deleteBySenderIdAndContentsCodeIdAndContentsId(user.getId(), 4, bambooId);
            bamboo.setLikeCount(bamboo.getLikeCount() - 1);
            bambooRepository.save(bamboo);
        }
    }

    @Override
    @Scheduled(cron="0 0 0/1 * * *")
    public void deleteBamboo() {
        LOGGER.info("Delete 수행 {}", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(LocalDateTime.now()));
        List<Bamboo> bamboos = bambooRepository.findByDeleteAtBefore(LocalDateTime.now());
        leafRepository.deleteLeavesBy(bamboos);
        bambooRepository.deleteByDeleteAtBefore(LocalDateTime.now());
    }
}
