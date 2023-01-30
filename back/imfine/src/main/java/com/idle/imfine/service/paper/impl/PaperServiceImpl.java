package com.idle.imfine.service.paper.impl;


import com.idle.imfine.data.dto.paper.request.RequestPaperPostDto;
import com.idle.imfine.data.dto.paper.request.RequestPaperPutDto;
import com.idle.imfine.data.entity.Diary;
import com.idle.imfine.data.entity.User;
import com.idle.imfine.data.entity.image.Image;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.entity.paper.PaperHasSymptom;
import com.idle.imfine.data.repository.diary.DiaryRepository;
import com.idle.imfine.data.repository.image.ImageRepository;
import com.idle.imfine.data.repository.paper.PaperHasSymptomRepository;
import com.idle.imfine.data.repository.paper.PaperRepository;
import com.idle.imfine.service.paper.PaperService;
import java.util.List;
import java.util.ListResourceBundle;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PaperServiceImpl implements PaperService {
    private final PaperRepository paperRepository;
    private final DiaryRepository diaryRepository;
    private final PaperHasSymptomRepository paperHasSymptomRepository;
    private final ImageRepository imageRepository;
    private final UserDetailsService userDetailsService;
    @Override
    @Transactional
    public void save(RequestPaperPostDto requestPaperPostDto, String uid) {
        User user = (User) userDetailsService.loadUserByUsername(uid);

        ///// 에러처리 똑바로 하기
        Diary diary = diaryRepository.findById(requestPaperPostDto.getDiaryId())
                .orElseThrow(RuntimeException::new);

        Paper savedPaper = paperRepository.save(Paper.builder()
                .diary(diary)
                .content(requestPaperPostDto.getContents())
                .open(requestPaperPostDto.isOpen())
                .date(requestPaperPostDto.getDate())
                .build());
        Stream<Image> saveImage = requestPaperPostDto.getImages().stream().map(
                path ->  Image.builder()
                        .paperId(savedPaper.getId())
                        .path(path)
                        .build()
        );
        imageRepository.saveAll(saveImage.collect(Collectors.toList()));

        Stream<PaperHasSymptom> savePaperSymptom = requestPaperPostDto.getSymptoms().stream().map(
                symptomRecord -> PaperHasSymptom.builder()
                        .symptomId(symptomRecord.getSymptomId())
                        .score(symptomRecord.getScore())
                        .paper(savedPaper)
                        .build()
        );

        paperHasSymptomRepository.saveAll(savePaperSymptom.collect(Collectors.toList()));
    }
    @Transactional
    @Override
    public void delete(long paperId, String uid) {
        User user = (User) userDetailsService.loadUserByUsername(uid);
        paperRepository.deleteById(paperId);
    }
    @Override
    public void modifyPaper(RequestPaperPutDto requestPaperPutDto, String uid) {
        User user = (User) userDetailsService.loadUserByUsername(uid);

        Paper paper = paperRepository.getById(requestPaperPutDto.getPaperId());
        paper.setContent(requestPaperPutDto.getContents());
        paper.setOpen(requestPaperPutDto.isOpen());
        List<PaperHasSymptom> paperHasSymptomList = paper.getPaperHasSymptoms();

        for (PaperHasSymptom paperHasSymptom : paperHasSymptomList) {

        }
    }
}
